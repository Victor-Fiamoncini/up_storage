import React, { useEffect, useState } from 'react'
import filesize from 'filesize'
import { v4 as uuid } from 'uuid'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'

import api from '../../../services/api'

export default function Home() {
	const [uploadedFiles, setUploadedFiles] = useState([])

	function updateFile(id, data) {
		setUploadedFiles(uploadedFiles =>
			uploadedFiles.map(file => (file.id === id ? { ...file, ...data } : file))
		)
	}

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
		const formData = new FormData()
		formData.append('photo', fileToUpload.file, fileToUpload.name)

		try {
			const { data } = await api.post('/posts', formData, {
				onUploadProgress: e => {
					const progress = Number(Math.round((e.loaded * 100) / e.total))

					updateFile(fileToUpload.id, { progress })
				},
			})

			updateFile(fileToUpload.id, {
				id: data._id,
				url: data.url,
				uploaded: true,
			})
		} catch (err) {
			updateFile(fileToUpload.id, { error: true })
		}
	}

	async function handleDelete(id) {
		await api.delete(`/posts/${id}`)

		setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
	}

	useEffect(() => {
		async function fetchPosts() {
			const response = await api.get('/posts')

			setUploadedFiles(
				response.data.map(file => ({
					id: file._id,
					name: file.name,
					readbleSize: filesize(file.size),
					preview: file.url,
					uploaded: true,
					url: file.url,
				}))
			)
		}

		fetchPosts()

		return () => {
			uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
		}
	}, [])

	return (
		<Container>
			<Content>
				<Dropzone handleUpload={handleUpload} />
				{!!uploadedFiles.length && (
					<FileList files={uploadedFiles} handleDelete={handleDelete} />
				)}
			</Content>
		</Container>
	)
}
