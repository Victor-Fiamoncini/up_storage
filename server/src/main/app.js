const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { resolve } = require('path')
const { config } = require('dotenv')
const makeFetchPostsRouter = require('./factories/FetchPostsRouterFactory')

config({ path: resolve(__dirname, '..', '..', '.env') })

const { PORT } = process.env
const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/posts', async (req, res) => {
	const fetchPostsRouter = await makeFetchPostsRouter()

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

app.listen(PORT, () => console.log(`Server running at ${PORT} ☕️`))
