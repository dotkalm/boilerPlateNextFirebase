SELECT * FROM place WHERE statefp = '06' and mtfcc = 'G4020';

export const PlaceType = new GraphQLObjectType({
	name: 'Place',
	description: 'place from us census',
	fields: () => ({
		gid      : {type: GraphQLInt }, 
		statefp  : {type: GraphQLString }, 
		placefp  : {type: GraphQLString }, 
		placens  : {type: GraphQLString }, 
		plcidfp  : {type: GraphQLString }, 
		name     : {type: GraphQLString }, 
		namelsad : {type: GraphQLString }, 
		lsad     : {type: GraphQLString }, 
		classfp  : {type: GraphQLString }, 
		cpi      : {type: GraphQLString }, 
		pcicbsa  : {type: GraphQLString }, 
		pcinecta : {type: GraphQLString }, 
		mtfcc    : {type: GraphQLString }, 
		funcstat : {type: GraphQLString }, 
		aland    : {type: GraphQLInt }, 
		awater   : {type: GraphQLInt }, 
		intptlat : {type: GraphQLString }, 
		intptlon : {type: GraphQLString }, 
		shape    : { type: GraphQLString },
	})
})
