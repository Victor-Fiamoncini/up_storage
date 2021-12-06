import { MongoClient } from 'mongodb'

import Env from '@/src/main/config/Env'

class Connection {
	static get instance() {
		if (!Connection._instance) {
			Connection._instance = new Connection()
		}

		return Connection._instance
	}

	async connect() {
		const { user, password, host, port, name } = Env.mongo
		const url = `mongodb://${user}:${password}@${host}:${port}/${name}`

		this.client = await MongoClient.connect(url, { authSource: 'admin' })
		this.database = this.client.db(name)
	}

	async disconnect() {
		await this.client.close()

		this.client = null
		this.database = null
	}

	async getCollection(collectionName = '') {
		try {
			if (
				!this.client ||
				!this.client.isConnected ||
				!this.client.isConnected()
			) {
				await this.connect()
			}

			return this.database.collection(collectionName)
		} catch {
			return null
		}
	}
}

export default Connection
