import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const homepageController = (req, res) => {
	try {
		res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
	} catch (err) {
		console.error('Homepage err: ', err)
		res.status(500).json({success:'Error loading homepage'})
	}
}

export default homepageController