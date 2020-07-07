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

		await Post.findByIdAndDelete(id)

		return res.status(200).json({ success: 'post deleted successfully' })
	}
}

export default new PostController()
