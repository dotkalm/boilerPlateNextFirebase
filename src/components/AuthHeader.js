import React from 'react'
import { Button } from './style'

const AuthHeader = ({ logout }) => {
	return(
		<div>
			<Button onClick={logout}>Log OUT</Button>
		</div>
	)
}

export default AuthHeader
