import React, { useState, useEffect } from 'react'
import { login, emailLogin } from '../actions/auth'

const SignInComponent = props => {
	const [ user, setUser ] = useState({
		email: '',
		password: '',
	})

	const handleClick = e => login(e.target.name)

	const onChange = e => {
		const { name, value } = e.target
		const newUserValue = { ...user, [name] : value } 
		console.log(newUserValue)
		setUser(newUserValue)
	}

	const submit = () => {
		const { email, password } = user
		console.log(email, password)
		emailLogin(email, password)
	}
	const isDisabled = user.email !== '' || user.password !== ''

	return(
		<div>
			<button onClick={handleClick} name='g'>
				goog
			</button>
		</div>
	)
} 
export default SignInComponent
