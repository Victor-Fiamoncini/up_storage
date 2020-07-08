import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import filesize from 'filesize'
import { v4 } from 'uuid'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'
import Spinner from '../../layout/Spinner'

import { fetchPosts, storePost } from '../../../store/ducks/post/actions'

export default function Home() {
	const dispatch = useDispatch()
	const { posts, loading } = useSelector(state => state.post)

	function handleUpload(filesToUpload) {
		const files = filesToUpload.map(file => ({
			file,
			id: v4(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null,
		}))

		files.forEach(file => dispatch(storePost(file)))
	}

	async function handleDelete(id) {
		// await api.delete(`/posts/${id}`)
		// setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
	}

	useEffect(() => {
		dispatch(fetchPosts())

		return () => {
			posts.forEach(file => URL.revokeObjectURL(file.preview))
		}
	}, [])

	return (
		<Container>
			<Content>
				<Dropzone handleUpload={handleUpload} />
				{!posts.length > 0 || loading ? (
					<Spinner loading={loading} />
				) : (
					<FileList files={posts} handleDelete={handleDelete} />
				)}
			</Content>
		</Container>
	)
}
