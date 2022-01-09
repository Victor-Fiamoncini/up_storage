import { v4 } from 'uuid'
import filesize from 'filesize'

import PostTypes from './types'
import api from '../../../services/api'

export const fetchAllPosts = () => async dispatch => {
	dispatch({ type: PostTypes.FETCH_ALL_LOADING })

	try {
		const response = await api.get('/posts')

		const serializedPosts = response.data.map(post => ({
			id: post.id,
			name: post.name,
			readbleSize: filesize(post.size),
			preview: post.url,
			uploaded: true,
			url: post.url,
		}))

		dispatch({ type: PostTypes.FETCH_ALL, payload: serializedPosts })
	} catch {
		dispatch({ type: PostTypes.FETCH_ALL_ERROR })
	}
}

export const storePosts = posts => async dispatch => {
	const serializedPostsToStore = posts.map(post => ({
		file: post,
		id: v4(),
		name: post.name,
		readableSize: filesize(post.size),
		preview: URL.createObjectURL(post),
		progress: 0,
		uploaded: false,
		error: false,
		url: null,
	}))

	dispatch({ type: PostTypes.PUSH_POSTS, payload: serializedPostsToStore })

	serializedPostsToStore.forEach(async post => {
		const postData = new FormData()

		postData.append('photo', post.file, post.name)

		try {
			const response = await api.post('/posts', postData, {
				onUploadProgress: ({ loaded, total }) => {
					const progress = Number(Math.round((loaded * 100) / total))

					dispatch({
						type: PostTypes.STORE,
						payload: {
							id: post.id,
							data: { progress },
						},
					})
				},
			})

			dispatch({
				type: PostTypes.STORE,
				payload: {
					id: post.id,
					data: {
						id: response.data.id,
						url: response.data.url,
						uploaded: true,
					},
				},
			})
		} catch {
			dispatch({ type: PostTypes.STORE_ERROR })
			dispatch({
				type: PostTypes.STORE,
				payload: {
					id: post.id,
					data: { error: true },
				},
			})
		}
	})
}

export const deletePost = id => async dispatch => {
	try {
		await api.delete(`/posts/${id}`)

		dispatch({ type: PostTypes.DELETE, payload: id })
	} catch {
		dispatch({ type: PostTypes.DELETE_ERROR })
	}
}
