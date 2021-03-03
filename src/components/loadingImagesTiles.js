import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
import Link from 'next/link'
const SquareDiv = styled.div`
`
const LoadingImagesTiles = ({column, rows, animate, image, radius}) => {
	const [ bgColor, setBgColor ] = useState('')
	return rows.map((row, index) => {
		let backgroundColor = ''
		let backgroundColorInverse = ''
		const { r , g , b } = row
		backgroundColor = `rgb(${r},${g},${b})`
		backgroundColorInverse = `rgb(${Math.abs(255-r)},${Math.abs(255-g)},${Math.abs(255-b)})`
		return(
			<div
				className={animate ? 'backwards' : 'animate'}
				key={`column${column}row${index}`} 
				style={{
						flex: 1,
						position: 'relative',
						background:backgroundColor,
						borderColor: backgroundColorInverse,
						borderRadius: `18%`,
						borderWidth: 'thick',
				}}
			>
				<Link 
					href={{
						pathname:	`/view/${image.uid}`,
					}}
				>
					<a>
						<div
							style={{
								height: '100%',
								width: '100%',
							}}
						>
						</div>
					</a>
				</Link>
			</div>
		)
	})	
}

export default LoadingImagesTiles
