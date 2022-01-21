import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'

import { Container, Message } from '@/src/components/pages/Home/Dropzone/styles'
import { storePosts } from '@/src/store/ducks/post/actions'

const Dropzone = () => {
	const dispatch = useDispatch()

	const onDropAccepted = useCallback(
		files => {
			dispatch(storePosts(files))
		},
		[dispatch]
	)

	const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
		onDropAccepted,
		accept: ['image/jpeg', 'image/pjpeg', 'image/png'],
		multiple: true,
		minSize: 0,
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
		<Container {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
			<input {...getInputProps()} />
			{handleMessageChange(isDragActive, isDragReject)}
		</Container>
	)
}

export default Dropzone
