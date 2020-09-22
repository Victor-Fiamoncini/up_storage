import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

class FakeHashProvider implements IHashProvider {
	public async encrypt(sample: string) {
		return sample
	}

	public async compare(sample: string, encrypted: string) {
		return sample === encrypted
	}
}

export default FakeHashProvider
