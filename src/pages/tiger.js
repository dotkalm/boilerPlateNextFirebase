import App from '../components/App'
import Auth from '../components/Auth'
import Tiger from '../components/Tiger' 

const Home = ({ ipAddress, userAgent }) => {
  return (
		<Auth>
			<App>
				<Tiger/>
			</App>
		</Auth>
  )
}

export default Home

