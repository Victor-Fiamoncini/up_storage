import Youch from 'youch'

export default async (err, req, res, next) => {
	if (process.env.NODE_ENV !== 'production') {
		const errors = await new Youch(err, req).toHTML()

		return res.status(err.status || 500).send(errors)
	}

	return res.status(500).json({ error: 'Internal server error' })
}
