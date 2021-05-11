import * as graphql from 'graphql'
import { base64, unbase64 } from '../../../shared/utils/base64'
const {
	GraphQLBoolean,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLID,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLList,
	GraphQLInputObjectType,
} = graphql
const resolveMaybeThunk = thingOrThunk => {
	return typeof thingOrThunk === 'function' 
		? thingOrThunk()
		: thingOrThunk
}
export const forwardConnectionArgs = {
  after: {
    type: GraphQLString,
  },
  first: {
    type: GraphQLInt,
  },
}

export const backwardConnectionArgs = {
  before: {
    type: GraphQLString,
  },
  last: {
    type: GraphQLInt,
  },
}
const PREFIX = 'arrayconnection:'
export const connectionArgs = {
  ...forwardConnectionArgs,
  ...backwardConnectionArgs,
}
const pageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating forwards, are there more items?',
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating backwards, are there more items?',
    },
    startCursor: {
      type: GraphQLString,
      description: 'When paginating backwards, the cursor to continue.',
    },
    endCursor: {
      type: GraphQLString,
      description: 'When paginating forwards, the cursor to continue.',
    },
  }),
})
export const connectionDefinitions = config => {
	const { nodeType } = config
	const name = config.name ?? nodeType.name
	const edgeFields = config.edgeFields ?? {}
	const connectionFields = config.connectionFields ?? {}
	const resolveNode = config.resolveNode
	const resolveCursor = config.resolveCursor
	const edgeType = new GraphQLObjectType({
		name: name + 'Edge',
		description: 'An edge in a connection.',
		fields: () => ({
			node: {
				type: nodeType,
				resolve: resolveNode,
				description: 'The item at the end of the edge',
			},
			cursor: {
				type: new GraphQLNonNull(GraphQLString),
				resolve: resolveCursor,
				description: 'A cursor for use in pagination',
			},
			...resolveMaybeThunk(edgeFields),
		})
	})

	const connectionType = new GraphQLObjectType({
		name: name + 'Connection',
		description: 'A connection to a list of items.',
		fields: () => ({
			pageInfo: {
				type: new GraphQLNonNull(pageInfoType),
				description: 'Information to aid in pagination.',
			},
			edges: {
				type: new GraphQLList(edgeType),
				description: 'A list of edges.',
			},
			...resolveMaybeThunk(connectionFields),
		})
	})

	return { edgeType, connectionType }
}
export const connectionFromArraySlice = (arraySlice, args, meta) => {
  const { after, before, first, last } = args
  const { sliceStart, arrayLength } = meta
  const sliceEnd = sliceStart + arraySlice.length
  const beforeOffset = getOffsetWithDefault(before, arrayLength)
  const afterOffset = getOffsetWithDefault(after, -1)

  let startOffset = Math.max(sliceStart - 1, afterOffset, -1) + 1
  let endOffset = Math.min(sliceEnd, beforeOffset, arrayLength)
  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative integer')
    }

    endOffset = Math.min(endOffset, startOffset + first)
  }
  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error('Argument "last" must be a non-negative integer')
    }

    startOffset = Math.max(startOffset, endOffset - last)
  }

  const slice = arraySlice.slice(
    Math.max(startOffset - sliceStart, 0),
    arraySlice.length - (sliceEnd - endOffset),
  )

  const edges = slice.map((value, index) => ({
    cursor: offsetToCursor(startOffset + index),
    node: value,
  }))

  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]
  const lowerBound = after != null ? afterOffset + 1 : 0
  const upperBound = before != null ? beforeOffset : arrayLength
  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage: typeof last === 'number' ? startOffset > lowerBound : false,
      hasNextPage: typeof first === 'number' ? endOffset < upperBound : false,
    },
  }
}
export const connectionFromArray = (data, args) => {
  return connectionFromArraySlice(data, args, {
    sliceStart: 0,
    arrayLength: data.length,
  })
}
export const getOffsetWithDefault = (cursor, defaultOffset) =>{
  if (typeof cursor !== 'string') {
    return defaultOffset
  }
  const offset = cursorToOffset(cursor);
  return isNaN(offset) ? defaultOffset : offset;
}
export const offsetToCursor = offset => {
  return base64(PREFIX + offset)
}

export const cursorToOffset = cursor => {
  return parseInt(unbase64(cursor).substring(PREFIX.length), 10)
}
