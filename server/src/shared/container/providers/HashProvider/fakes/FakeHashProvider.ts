import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

class FakeHashProvider implements IHashProvider {
	public async encrypt(payload: string) {
		return payload
	}

	public async compare(payload: string, encrypted: string) {
		return payload === encrypted
	}
}

export default FakeHashProvider
