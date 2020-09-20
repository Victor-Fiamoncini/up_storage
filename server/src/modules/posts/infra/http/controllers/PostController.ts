import { Request, Response } from 'express'
import { container } from 'tsyringe'

import Post from '@modules/posts/infra/mongoose/models/Post'
import CreatePostService from '@modules/posts/services/CreatePostService'

class PostController {
	public async index(req: Request, res: Response) {
		const posts = await Post.find().sort('-createdAt')

		return res.status(200).json(posts)
	}

	public async store(req: Request, res: Response) {
		const { filename, originalname, size } = req.file

		const createPostService = container.resolve(CreatePostService)

		const post = await createPostService.run({
			name: originalname,
			hash_name: filename,
			size,
		})

		return res.status(201).json(post)
	}

	public async destroy(req: Request, res: Response) {
		const { id } = req.params

		const post = await Post.findById(id)

		if (!post) {
			return res.status(404).json({ error: 'Post not found' })
		}

		await post.remove()

		return res.status(200).json(post)
	}
}

export default new PostController()
