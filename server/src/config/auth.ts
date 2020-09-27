import '@config/env'

export default {
	jwt: {
		secret: process.env.JWT_SECRET || '',
		expiresIn: '24h',
	},
}
