const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const Youch = require('youch')

const env = require('./config/env')
const FetchPostsRouterFactory = require('./factories/FetchPostsRouterFactory')

const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/posts', async (req, res) => {
	const fetchPostsRouter = await FetchPostsRouterFactory.make()

	if (!fetchPostsRouter) {
		const youch = new Youch('Internal server error', req)

		youch.toHTML().then(html => {
			res.writeHead(500, { 'content-type': 'text/html' })
			res.write(html)
			res.end()
		})
	}

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

app.listen(env.app.port, () =>
	console.log(`Server running at ${env.app.port} ☕️`)
)
