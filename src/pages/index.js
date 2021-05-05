import React from 'react'
import App from '../components/App'

const Home = props => {
	console.log(props)
  return (
		<main>
			<App>
				<span>
						BOILERPLATE
				</span>
			</App>
		</main>
  )
}

export default Home

export const getStaticProps = async () => {
	const env = process.env.NODE_ENV
  return {
    props: {
      env
    },
  }
}

