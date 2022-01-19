import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Content } from '@/src/components/pages/Home/styles'

import Dropzone from '@/src/components/utils/Dropzone'
import FileList from '@/src/components/layout/FileList'
import Spinner from '@/src/components/layout/Spinner'

import { fetchAllPosts } from '@/src/store/ducks/post/actions'

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
				{!posts.length && loading ? <Spinner loading={loading} /> : <FileList />}
			</Content>
		</Container>
	)
}

export default Home
