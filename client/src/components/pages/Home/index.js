import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Content } from './styles'

import Dropzone from '../../utils/Dropzone'
import FileList from '../../layout/FileList'
import Spinner from '../../layout/Spinner'

import { fetchAllPosts } from '../../../store/ducks/post/actions'

const Home = () => {
	const dispatch = useDispatch()
	const { posts, loading } = useSelector(state => state.post)

	useEffect(() => {
		dispatch(fetchAllPosts())

		return () => {
			posts.forEach(post => URL.revokeObjectURL(post.preview))
		}
	}, [])

	return (
		<Container>
			<Content>
				<Dropzone />
				{!posts.length && loading ? (
					<Spinner loading={loading} />
				) : (
					<FileList />
				)}
			</Content>
		</Container>
	)
}

export default Home
