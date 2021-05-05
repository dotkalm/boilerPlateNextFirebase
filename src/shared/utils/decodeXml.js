import parser from 'fast-xml-parser'
import he from 'he'

const decodeXml = xmlData => {
	try{
		const options = {
			attributeNamePrefix : "",
			attrNodeName: "", 
			textNodeName : "edge",
			ignoreAttributes : false,
			ignoreNameSpace : false,
			allowBooleanAttributes : false,
			parseNodeValue : true,
			parseAttributeValue : true,
			trimValues:  false,
			cdataTagName: false, 
			cdataPositionChar: "\\c",
			format: true,
			parseTrueNumberOnly: false,
			arrayMode: false, 
			attrValueProcessor: (val, attrName) => {
				const r = he.decode(val, {isAttributeValue: true})
				console.log(r)
				return r
			},
			tagValueProcessor : a => {
				return a
			},
			stopNodes: ["parse-me-as-string"]
		} 
		return parser.parse(xmlData, options, true)
	}catch(err){
		console.log(err)
		return err
	}
}
export default decodeXml
