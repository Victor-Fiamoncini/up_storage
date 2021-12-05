const { MongoClient } = require('mongodb')

class Connection {
	constructor() {
		throw new Error()
	}

	static get instance() {
		if (!Connection._instance) {
			Connection._instance = new Connection()
		}

		return Connection._instance
	}

	async connect() {
		this.client = await MongoClient.connect('')
	}

	async getCollection(collectionName = '') {
		if (!this.client.isConnected && !this.client.isConnected()) {
			await this.connect()
		}

		return this.client.db().collection(collectionName)
	}
}

module.exports = Connection
