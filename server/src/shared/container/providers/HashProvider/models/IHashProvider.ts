interface IHashProvider {
	encrypt(sample: string): Promise<string>

	compare(sample: string, encrypted: string): Promise<boolean>
}

export default IHashProvider
