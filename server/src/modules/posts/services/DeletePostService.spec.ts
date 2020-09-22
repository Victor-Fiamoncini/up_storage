import DeletePostService from '@modules/posts/services/DeletePostService'
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostRepository'

let postRepository: FakePostRepository
let deletePostService: DeletePostService

describe('DeletePost', () => {
	beforeEach(() => {
		postRepository = new FakePostRepository()
		deletePostService = new DeletePostService(postRepository)
	})

	it('should delete a post', async () => {
		const post = await postRepository.create({
			name: 'name.jpg',
			hash_name: 'hash_name.jpg',
			size: 0,
		})

		await deletePostService.run({ id: post._id })

		expect(await postRepository.findAll()).toEqual([])
	})
})
