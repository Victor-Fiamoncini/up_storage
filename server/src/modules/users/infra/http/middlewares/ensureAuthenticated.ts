import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface TokenPayload {
	iat: number
	exp: number
	sub: string
}

export default (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new AppError('Authorization not provided', 401)
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		throw new AppError('Invalid authorization', 401)
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		throw new AppError('Invalid authorization', 401)
	}

	try {
		const decoded = verify(token, authConfig.jwt.secret)

		const { sub } = decoded as TokenPayload

		req.user = {
			id: sub,
		}

		return next()
	} catch {
		throw new AppError('Invalid authorization', 401)
	}
}
