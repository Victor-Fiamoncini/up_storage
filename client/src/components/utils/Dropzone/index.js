import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Container, Message } from './styles'

export default function Dropzone() {
	const onDrop = useCallback(acceptedFiles => {
		console.log(acceptedFiles)
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

	return (
		<Container {...getRootProps()}>
			<input {...getInputProps()} />
		</Container>
	)
}
