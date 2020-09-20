import { NextFunction, Request, Response } from 'express'

import AppError from '@shared/errors/AppError'

export default async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.message)

	if (err instanceof AppError) {
		return res.status(err.status).json({ error: err.message })
	}

	return res.status(400).json({ error: 'Internal server error' })
}
