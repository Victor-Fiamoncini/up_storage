import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

import { Container, Message } from './styles'

export default function Dropzone({ handleUpload }) {
	const onDropAccepted = useCallback(handleUpload, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
	} = useDropzone({
		onDropAccepted,
		accept: ['image/jpeg', 'image/pjpeg', 'image/png'],
		multiple: true,
		minSize: 0,
		maxSize: 4 * 1024 * 1014,
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

Dropzone.propTypes = {
	handleUpload: PropTypes.func.isRequired,
}
