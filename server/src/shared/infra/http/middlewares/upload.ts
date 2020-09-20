import multer from 'multer'
import multerConfig from '@config/upload'

export default {
	single: (requestField: string) => multer(multerConfig).single(requestField),
}
