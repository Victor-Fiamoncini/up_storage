import Post from '../models/Post'
import PostRepository from '../repositories/PostRepository'

class PostController {
	async index(req, res) {
		const posts = await new PostRepository(Post).find()

		if (!posts.length > 0) {
			return res.status(404).json({ error: 'Posts not found' })
		}

		return res.status(200).json(posts)
	}

	async store(req, res) {
		const { filename, originalname, size } = req.file

		const post = await new PostRepository(Post).store({
			name: originalname,
			size,
			hash_name: filename,
			url: '',
		})

		return res.status(201).json(post)
	}

	async destroy(req, res) {
		const postRepository = new PostRepository(Post)

		const post = await postRepository.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ error: 'Post not found' })
		}

		await postRepository.destroy(post)

		return res.status(200).json({ success: 'Post deleted successfully' })
	}
}

export default new PostController()
