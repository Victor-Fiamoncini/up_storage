import Repository from './Repository'

export default class MongoRepository extends Repository {
	async find() {
		try {
			return await this.model.find()
		} catch (err) {
			throw new Error('Error to fetch data')
		}
	}

	async findById(id) {
		try {
			return await this.model.findById(id)
		} catch (err) {
			throw new Error('Error to fetch data by ID')
		}
	}

	async store(dto) {
		try {
			return await new this.model(dto).save()
		} catch (err) {
			throw new Error('Error to store data')
		}
	}

	async destroy(dto) {
		try {
			await dto.remove()
		} catch (err) {
			throw new Error('Error to destroy data')
		}
	}
}
