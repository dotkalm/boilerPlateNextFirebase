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

 2295 | 06      | 70000   | 02411825 | 0670000 | Santa Monica | Santa Monica city | 25   | C1      |     | Y       | N        | G4110 | A        | 21782142 | 22696935 | +34.0109107 | -118.4982446 |
	

postgres=> SELECT placefp, mtfcc FROM place WHERE name = 'Santa Monica';
 placefp | mtfcc
---------+-------
 70000   | G4110
 65756   | G4210
(2 rows)

postgres=> SELECT zip FROM zip_lookup_base WHERE city = 'Santa Monica';
postgres=> SELECT * FROM addr WHERE zip = '90402';
SELECT * FROM edges WHERE tlid = '142853860';


SELECT DISTINCT tlid FROM addr WHERE zip = '20164';

OUN', 'cmar': 'N'}, {'addressLine1': '(EVEN Range 46906 - 46912) SENECA RIDGE DR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1389', 'carrierRoute': 'C028', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(ODD Range 46901 - 46915) SENECA RIDGE DR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1386', 'carrierRoute': 'C028', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(EVEN Range 46914 - 46998) SENECA RIDGE DR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1390', 'carrierRoute': 'C028', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(ODD Range 46917 - 46999) SENECA RIDGE DR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1387', 'carrierRoute': 'C028', 'countyName': 'LOUDOUN', 'cmar': 'N'}] 16 /Users/joelholmberg/webapps/addressStandardizer/scripts/json/Seneca Ridge Dr_Sterling_VA_20164.json
>>> get_ranges('Darus Ct', 'Sterling', 'VA', '20164')
73
[{'addressLine1': '(EVEN Range 2 - 98) DARUS CT', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1111', 'carrierRoute': 'C017', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(ODD Range 1 - 99) DARUS CT', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1112', 'carrierRoute': 'C017', 'countyName': 'LOUDOUN', 'cmar': 'N'}] 2 /Users/joelholmberg/webapps/addressStandardizer/scripts/json/Darus Ct_Sterling_VA_20164.json
>>> get_ranges('Regis Cir', 'Sterling', 'VA', '20164')
74
[{'addressLine1': '(Range 1 - 12) REGIS CIR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1342', 'carrierRoute': 'C017', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(Range 13 - 28) REGIS CIR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1341', 'carrierRoute': 'C017', 'countyName': 'LOUDOUN', 'cmar': 'N'}, {'addressLine1': '(Range 29 - 99) REGIS CIR', 'city': 'STERLING', 'state': 'VA', 'zip5': '20164', 'zip4': '1374', 'carrierRoute': 'C017', 'countyName': 'LOUDOUN', 'cmar': 'N'}] 3 /Users/joelholmberg/webapps/addressStandardizer/scripts/json/Regis Cir_Sterling_VA_20164.json
>>
>>>
KeyboardInterrupt
>>>
KeyboardInterrupt
>>>

get roads in zips .. find edge.. query usps

