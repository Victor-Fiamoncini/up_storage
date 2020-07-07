import { Post } from '../models'

class PostController {
	async index(req, res) {
		const posts = await Post.find().sort('-createdAt')

		return res.status(200).json(posts)
	}

	async store(req, res) {
		const { filename, originalname, size } = req.file

		const post = await Post.create({
			name: originalname,
			size,
			hash_name: filename,
			url: '',
		})

		return res.status(201).json(post)
	}

	async destroy(req, res) {
		const { id } = req.params

		const post = await Post.findById(id)

		await post.remove()
		return res.status(200).json(post)
	}
}

export default new PostController()
