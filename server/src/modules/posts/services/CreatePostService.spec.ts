import CreatePostService from '@modules/posts/services/CreatePostService'
import FakePostRepository from '@modules/posts/repositories/fakes/FakePostRepository'

let postRepository: FakePostRepository
let createPostService: CreatePostService

describe('CreatePost', () => {
	beforeEach(() => {
		postRepository = new FakePostRepository()
		createPostService = new CreatePostService(postRepository)
	})

	it('should create a new post', async () => {
		const post = await createPostService.run({
			name: 'file.png',
			hash_name: 'file.png',
			size: 2 * 1024 * 1024,
		})

		expect(post.name).toBe('file.png')
		expect(post.hash_name).toBe('file.png')
		expect(post.size).toEqual(2 * 1024 * 1024)
	})
})
