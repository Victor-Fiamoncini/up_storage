import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import Env from '@/src/main/config/Env'
import Connection from '@/src/infra/databases/mongo/Connection'
import routes from '@/src/main/routes'

Connection.instance.connect()

const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(`/${Env.app.fileUrlPrefix}`, express.static(Env.app.tempPath))
app.use(routes)

app.listen(Env.app.port, () => {
	console.log(`Server running at ${Env.app.port} ☕️`)
})
