import { NextFunction, Request, Response } from 'express'

export default (fn: Function) => async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		return Promise.resolve(fn(req, res, next))
	} catch (err) {
		return next(err)
	}
}
