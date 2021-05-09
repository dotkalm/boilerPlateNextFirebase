import {
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'

import { base64, unbase64 } from '../../../shared/utils/base64'

export const nodeDefinitions = (idFetcher, typeResolver) => {
  const nodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    description: 'An object with an ID',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the object.',
      },
    })
  })

  const nodeField = {
    description: 'Fetches an object given its ID',
    type: nodeInterface,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The ID of an object',
      }
    }
  }

  const nodesField = {
    description: 'Fetches objects given their IDs',
    type: new GraphQLNonNull(new GraphQLList(nodeInterface)),
    args: {
      ids: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLID)),
        ),
        description: 'The IDs of objects',
      }
    }
  }

  return { nodeInterface, nodeField, nodesField }
}

export const toGlobalId = (type, id) => {
  return base64([type, id].join(':'))
}

export const fromGlobalId = globalId => {
	const unbasedGlobalId = unbase64(globalId)
	const delimiterPos = unbasedGlobalId.indexOf(':')
	return {
		type: unbasedGlobalId.substring(0, delimiterPos),
		id: unbasedGlobalId.substring(delimiterPos + 1),
	}
}
export const globalIdField = (typeName, idFetcher) => {
  return {
    description: 'The ID of an object',
    type: new GraphQLNonNull(GraphQLID),
    resolve: (obj, args, ctx, info) => {
			let theTypeName
			if(typeName){
				theTypeName = info.parentType.name
			}
      return toGlobalId(
        theTypeName,
        idFetcher ? idFetcher(obj, ctx, info) : obj.id,
      ),
		}
  }
}
