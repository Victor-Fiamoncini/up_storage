import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import filesize from 'filesize'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'

export default function Home() {
	const [uploadedFiles, setUploadedFiles] = useState([])

	function handleUpload(fileToUpload) {
		const [file] = fileToUpload.map(file => ({
			file,
			id: uuid(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null,
		}))

		setUploadedFiles(uploadedFiles => [...uploadedFiles, file])
	}

	return (
		<Container>
			<Content>
				<Dropzone handleUpload={handleUpload} />
				{!!uploadedFiles.length && <FileList files={uploadedFiles} />}
			</Content>
		</Container>
	)
}
