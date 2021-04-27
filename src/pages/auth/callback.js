import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import App from '../../components/App'
import Auth from '../../components/Auth'

const InstallFlow = props => {
	console.log(props, 7)
  return (
		<Auth>
			<App/>
		</Auth>
  )
}
export default withRouter(InstallFlow)
