import app from '@shared/infra/http/App'

const { NODE_ENV, PORT } = process.env

app.listen(PORT, () =>
	console.log(`Server running at: ${PORT}, environment: ${NODE_ENV} ☕️`)
)
