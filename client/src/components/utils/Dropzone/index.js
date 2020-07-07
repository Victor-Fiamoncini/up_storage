import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Container, Message } from './styles'

export default function Dropzone() {
	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles, typeof acceptedFiles)
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: ['image/jpeg', 'image/pjpeg', 'image/png'],
		minSize: 0,
		maxSize: 4000,
	})

	function handleMessageChange(isDragActive, isDragReject) {
		if (!isDragActive) {
			return <Message>Arraste arquivos aqui...</Message>
		}

		if (isDragReject) {
			return <Message type="danger">Arquivo não suportado</Message>
		}

		if (isDragActive && !isDragReject) {
			return <Message type="success">Solte os arquivos aqui</Message>
		}
	}

	return (
		<Container
			{...getRootProps()}
			isDragActive={isDragActive}
			isDragReject={isDragReject}
		>
			<input {...getInputProps()} />
			{handleMessageChange(isDragActive, isDragReject)}
		</Container>
	)
}
