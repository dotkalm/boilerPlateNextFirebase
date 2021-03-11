import React from 'react'
import Spinner from 'react-spinner-material'
import { Wrapper } from './style'


const Loader = ({ radius, color, stroke }) => (
	<Wrapper>
		<Spinner radius={radius} color={color} stroke={stroke} />
	</Wrapper>
)

Loader.defaultProps = {
	radius: '1.1em',
	color: 'inherit',
	stroke: 2
}

export default Loader
