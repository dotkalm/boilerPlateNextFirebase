import React, { useState, useEffect } from 'react'
import { Button, TigerStyle } from './style'
import { useRouter } from 'next/router'
import statesSet from '../shared/statesSet'
import { geocoderQuery } from '../actions/geocoder'
import MapTools from './mapTool'

const Tiger = props => {
	const [ quantity, setQuantity ] = useState({
		previous: 10,
		current: 10,
	})
	const [ query, setQuery ] = useState({
		previous: '',
		current: '',
	})
	const [ cursor, setCursor ] = useState(0)
	const [ submitStatus, setSubmitStatus ] = useState('waiting')
	const [ predictions, setPredictions ] = useState([])
	const [ logs, setLogs ] = useState([])
	const apiCallDependencyArray = [ quantity, cursor, query, submitStatus, predictions, logs ]
	useEffect(() => {
		const queryArray = query.current.split(' ')
		const requestGeocode = () => {
			const { previous, current } = apiCallDependencyArray[2]
			setSubmitStatus('fetching')
			const s = query.current
			const q = quantity.current
			const stringArray = s.split(' ')
			const copyString = [ ...stringArray ] 
			const zip = parseInt(copyString.pop())
			let addressString = s 
			const geoParams = {
				type: 'address',
				params: {
					address: addressString,
					quantity: q,
				}
			}
			geocoderQuery(geoParams).then(results => {
				if(Array.isArray(results.predictions)){
					setPredictions(results.predictions)
				}
				setQuantity({
					previous: quantity.current,
					current: quantity.current
				})
				setQuery({
					previous: query.current,
					current: query.current
				})
				setLogs([ {
					searchString: query.current,
					executionMs: results.executionMs,
				}, ...logs ])
				setSubmitStatus('waiting')
			})
		}
		if(submitStatus === 'loading'){
			console.log('request')
			requestGeocode()
		}
	}, apiCallDependencyArray)
	const onChange = event => {
		const { name, value } = event.target
		if(name === "querystring"){
			if(submitStatus === 'waiting'){
				const cursorPosition = event.target.selectionStart 
				setCursor(cursorPosition)
				setQuery({
					previous: query.current,
					current: value,
				})
			}
		}
		if(name === "quantity"){
			if(value <= 10 && value > 0){
				setQuantity({
					previous: quantity.current,
					current: value
				})
			}
		}
	}
	const handleFocus = event => {
		event.target.selectionStart = cursor		
	}
 	const	handleKeyPress = event => {
		if(event.key === 'Enter'){
			console.log('enter press here!')
			setSubmitStatus('loading')
		}
	}
 	const	handlePress = event => {
		setSubmitStatus('loading')
	}
	const mapResults = predictions.map((element, index) => {
		const { 
			city,
			rating,
			st,
			stno,
			street,
			styp,
			zip,
		} = element 
		return(
			<div
				key={`predictions${index}`} 
				style={{
					paddingTop: '.5em'
				}}
			>
				<span
					key={`inner${index}`} 
					style={{
						flex: 9,
					}}
				>
					{stno} {street} {styp} {city}, {st} {zip} 
				</span>
			</div>
		)
	})
	const mapHistory = logs.map((element, index) => {
		const { searchString, executionMs } = element 
		return(
			<div
				key={`logs${index}`} 
				style={{  }}
			>
				<span
					key={`logsinner${index}`} 
				>
					{searchString} {executionMs}ms
				</span>
			</div>
		)
	})
	return(
		<TigerStyle
			onKeyPress={handleKeyPress}
		>
			<div className='content'>
				<input 
					type='text'
					key="string"
					className='address' 
					name="querystring" 
					placeholder='enter address' 
					onChange={onChange} 
					value={query.current}
					onFocus={handleFocus}
					rows="1"
				/>
				<div> maxResults: 
				<input type='number' 
					key="number" 
					className='quantity' 
					name="quantity"
					placeholder='quantity' 
					onChange={onChange} 
					value={quantity.current}
					rows="1"
				/>
				<button
					onClick={handlePress}
				>
					search
				</button>
			</div>
			</div>
			<div className='all'>
				<div className="history">
					history:
					<br/>
					{mapHistory}
				</div>
			</div>
			{submitStatus === 'loading' 
				? 
					'...loading' 
				:
					<div id='predictionContainer'>
						{mapResults}
					</div>
			}
			<MapTools/>
		</TigerStyle>
	)
}
export default Tiger



