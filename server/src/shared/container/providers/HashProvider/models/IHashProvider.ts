interface IHashProvider {
	encrypt(payload: string): Promise<string>

	compare(payload: string, encrypted: string): Promise<boolean>
}

export default IHashProvider
