import multer from 'multer'
import multerConfig from '../../config/multer'

export default {
	single: (requestField: string) => multer(multerConfig).single(requestField),
}
