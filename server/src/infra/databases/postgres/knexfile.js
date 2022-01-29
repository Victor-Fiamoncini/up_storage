import Env from '@/src/main/config/Env'

export default {
	development: {
		client: 'postgresql',
		connection: {
			database: Env.postgres.name,
			user: Env.postgres.user,
			password: Env.postgres.password,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: './migrations',
		},
	},
}
