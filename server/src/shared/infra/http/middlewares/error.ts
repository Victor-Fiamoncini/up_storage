import { Request, Response, NextFunction } from 'express'

import AppError from '@shared/errors/AppError'

export default async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err.message)

	if (err instanceof AppError) {
		return res
			.status(err.status)
			.json({ status: 'error', message: err.message })
	}

	return res
		.status(400)
		.json({ status: 'error', message: 'Internal server error' })
}
