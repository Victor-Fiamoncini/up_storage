const { MongoClient } = require('mongodb')

const env = require('../../../main/config/env')

class Connection {
	static get instance() {
		if (!Connection._instance) {
			Connection._instance = new Connection()
		}

		return Connection._instance
	}

	async connect() {
		const url = `mongodb://${env.mongo.host}:${env.mongo.port}/${env.mongo.name}`

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

			return this.client.db().collection(collectionName)
		} catch {
			return null
		}
	}
}

module.exports = Connection
