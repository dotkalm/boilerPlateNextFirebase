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
			<button onClick={handleClick} name='t'>
				tw
			</button>
			<button onClick={handleClick} name='g'>
				goo
			</button>
			<br/>
			<div className="form">
				<input type='text' key="email" className='select' 
					name="email" placeholder='email' value={user.email} 
					onChange={onChange} rows="1"/>
				<input type='password' key="password" className='select' 
					name="password" placeholder='password' value={user.password} 
					onChange={onChange} rows="1"/>
				<button onClick={submit} disabled={!isDisabled}>
					login
				</button>
			</div>
		</div>
	)
} 
export default SignInComponent
