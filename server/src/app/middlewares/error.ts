import Youch from 'youch'
import { NextFunction, Request, Response } from 'express'

export default async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (process.env.NODE_ENV !== 'production') {
		const errors = await new Youch(err, req).toHTML()

		return res.status(500).send(errors)
	}

	return res.status(500).json({ error: 'Internal server error' })
}
