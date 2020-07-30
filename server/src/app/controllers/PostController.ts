import { Request, Response } from 'express'

import CreatePostService from '@services/CreatePostService'

class PostController {
	async findAll(req: Request, res: Response) {
		return res.send('findAll')
	}

	async create(req: Request, res: Response) {
		const { filename, originalname, size } = req.file

		const post = await new CreatePostService().run({
			name: originalname,
			size,
			hashName: filename,
			url: '',
		})

		return res.status(201).json(post)
	}

	async delete(req: Request, res: Response) {
		return res.send('delete')
	}
}

export default new PostController()
