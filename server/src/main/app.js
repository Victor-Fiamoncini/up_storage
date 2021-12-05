import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import env from '@/src/main/config/env'
import Connection from '@/src/infra/databases/mongo/Connection'
import routes from '@/src/main/routes'

Connection.instance.connect()

const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(routes)

app.listen(env.app.port, () =>
	console.log(`Server running at ${env.app.port} ☕️`)
)
