import App from '../components/App'
import Auth from '../components/Auth'
import UploadForm from '../components/UploadForm' 

const Home = ({ ipAddress, userAgent }) => {
  return (
		<Auth>
			<App>
				<UploadForm/>
			</App>
		</Auth>
  )
}

export default Home

