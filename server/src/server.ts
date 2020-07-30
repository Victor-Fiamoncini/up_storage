import app from '@src/App'

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running at ${PORT} ☕️`))
