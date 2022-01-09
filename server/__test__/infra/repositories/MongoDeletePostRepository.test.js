import { ObjectId } from 'mongodb'
import { ObjectID } from 'bson'

import MongoDeletePostRepository from '@/src/infra/repositories/MongoDeletePostRepository'

const param = new ObjectID().toString()

const makeSut = () => {
	const postModelSpy = {
		findOneAndDelete: jest.fn().mockResolvedValueOnce(),
	}
	const sut = new MongoDeletePostRepository(postModelSpy)

	return { sut }
}

describe('MongoDeletePostRepository', () => {
	let db = []

	beforeEach(() => {
		db = [
			{
				id: param,
			},
		]
	})

	it('should call deleteById with correct param', async () => {
		const { sut } = makeSut()

		await sut.deleteById(param)

		expect(sut.postModel.findOneAndDelete).toHaveBeenCalledWith({
			_id: new ObjectId(param),
		})
	})

	it('should return void after success deletion', async () => {
		const { sut } = makeSut()
		const postToDelete = { id: param }
		sut.postModel.findOneAndDelete = jest.fn().mockImplementationOnce(() => {
			const indexToDelete = db.findIndex(post => post.id === postToDelete.id)

			db.splice(indexToDelete, 1)
		})

		const voidReturn = await sut.deleteById(param)

		expect(voidReturn).toBe(undefined)
		expect(db).toEqual([])
	})
})
