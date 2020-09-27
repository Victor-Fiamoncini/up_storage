import { compare, hash } from 'bcrypt'

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

class BCryptHashProvider implements IHashProvider {
	public async encrypt(payload: string) {
		return hash(payload, 8)
	}

	public async compare(payload: string, encrypted: string) {
		return compare(payload, encrypted)
	}
}

export default BCryptHashProvider
