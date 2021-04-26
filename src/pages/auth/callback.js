import React, { useEffect, useState } from 'react'
import App from '../../components/App'
import Auth from '../../components/Auth'

const InstallFlow = props => {
  return (
		<Auth>
			<App/>
		</Auth>
  )
}
export default InstallFlow
