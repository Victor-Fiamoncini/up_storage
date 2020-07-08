import React, { useEffect, useState } from 'react'
import filesize from 'filesize'
import { v4 as uuid } from 'uuid'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'

import api from '../../../services/api'

export default function Home() {
	const [uploadedFiles, setUploadedFiles] = useState([])

	function handleUpload(filesToUpload) {
		const files = filesToUpload.map(file => ({
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

		setUploadedFiles(uploadedFiles => uploadedFiles.concat(files))

		files.forEach(handleProcessUploadRequest)
	}

	async function handleProcessUploadRequest(fileToUpload) {
		const data = new FormData()
		data.append('photo', fileToUpload.file, fileToUpload.name)

		const fileUploaded = await api.post('/posts', data, {
			onUploadProgress: e => {
				const progress = Number(Math.round((e.loaded * 100) / e.total))

				setUploadedFiles(uploadedFiles =>
					uploadedFiles.map(file => {
						return file.id === fileToUpload.id ? { ...file, progress } : file
					})
				)
			},
		})
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
