import React from 'react'
import App from '../components/App'

const Home = props => {
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

export const getStaticProps = async context => {
	const env = process.env.NODE_ENV
  return {
    props: {
      env
    },
  }
}

