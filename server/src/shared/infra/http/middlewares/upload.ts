import multer from 'multer'
import multerConfig from '../../../../app/config/multer'

export default {
	single: (requestField: string) => multer(multerConfig).single(requestField),
}
