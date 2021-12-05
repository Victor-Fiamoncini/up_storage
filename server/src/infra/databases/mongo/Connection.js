import { MongoClient } from 'mongodb'

import env from '@/src/main/config/env'

class Connection {
	static get instance() {
		if (!Connection._instance) {
			Connection._instance = new Connection()
		}

		return Connection._instance
	}

	async connect() {
		const { mongo } = env
		const url = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.name}`

		this.client = await MongoClient.connect(url)
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

			return this.client.db(env.mongo.name).collection(collectionName)
		} catch {
			return null
		}
	}
}

export default Connection
