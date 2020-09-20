import { Request, Response } from 'express'
import Post from '../../mongoose/models/Post'

class PostController {
	async index(req: Request, res: Response) {
		const posts = await Post.find().sort('-createdAt')

		return res.status(200).json(posts)
	}

	async store(req: Request, res: Response) {
		const { filename, originalname, size } = req.file

		const post = await Post.create({
			name: originalname,
			size,
			hash_name: filename,
			url: '',
		})

		return res.status(201).json(post)
	}

	async destroy(req: Request, res: Response) {
		const { id } = req.params

		const post = await Post.findById(id)

		if (!post) {
			return res.status(200).json({ error: 'Post not found' })
		}

		await post.remove()

		return res.status(200).json(post)
	}
}

export default new PostController()
