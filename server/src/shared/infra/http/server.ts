import './bootstrap'
import app from './App'

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running at ${PORT} ☕️`))
