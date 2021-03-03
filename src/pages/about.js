import App from '../components/App'
import MobileDetect from 'mobile-detect'
import SpectrogramsComponent from '../components/spectrograms'

const About = ({ data, ipAddress, userAgent }) => {
	const md = new MobileDetect(userAgent)
	const isMobile = md.mobile()
  return (
    <App>
			{
				isMobile 
					? 
						<MobileSpectrograms
						/>
					: 
						<SpectrogramsComponent 
						/>
			}
    </App>
  )
}
export default About
