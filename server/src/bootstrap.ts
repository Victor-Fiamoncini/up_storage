import { config } from 'dotenv'
import { resolve } from 'path'

const envFile = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'

config({ path: resolve(__dirname, '..', envFile) })
