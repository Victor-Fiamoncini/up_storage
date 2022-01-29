import Connection from '@/src/infra/databases/postgres/Connection'

const makeSut = () => {
	const sut = Connection.instance

	return { sut }
}

describe('Postgres connection', () => {
	it('should connect successfully', () => {
		const { sut } = makeSut()

		expect(sut.raw('SELECT 1 + 1 AS result')).toBeTruthy()
	})
})
