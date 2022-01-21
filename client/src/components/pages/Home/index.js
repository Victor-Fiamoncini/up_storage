import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Spinner from '@/src/components/layout/Spinner'
import Dropzone from '@/src/components/pages/Home/Dropzone'
import FileList from '@/src/components/pages/Home/FileList'
import Container from '@/src/components/pages/Home/styles'
import { fetchAllPosts } from '@/src/store/ducks/post/actions'

const Home = () => {
	const dispatch = useDispatch()
	const { posts, loading } = useSelector(state => state.post)

	useEffect(() => {
		dispatch(fetchAllPosts())

		return () => {
			posts.forEach(post => URL.revokeObjectURL(post.preview))
		}
	}, [dispatch])

	return (
		<Container>
			<div>
				<Dropzone />
				{!posts.length && loading ? <Spinner loading={loading} /> : <FileList />}
			</div>
		</Container>
	)
}

export default Home
