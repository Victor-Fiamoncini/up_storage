import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'
import Spinner from '../../layout/Spinner'

import { fetchPosts } from '../../../store/ducks/post/actions'

export default function Home() {
	const dispatch = useDispatch()
	const { posts, loading } = useSelector(state => state.post)

	useEffect(() => {
		dispatch(fetchPosts())

		return () => {
			posts.forEach(file => URL.revokeObjectURL(file.preview))
		}
	}, [])

	return (
		<Container>
			<Content>
				<Dropzone />
				{!posts.length > 0 && loading && <Spinner loading={loading} />}
				{!!posts.length && !loading && <FileList />}
			</Content>
		</Container>
	)
}
