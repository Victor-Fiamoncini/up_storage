class PostController {
	async store(req, res) {
		return res.send('hello')
	}
}

export default new PostController()
