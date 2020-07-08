import { v4 } from 'uuid'
import filesize from 'filesize'

import PostTypes from './types'
import api from '../../../services/api'

export const fetchPosts = () => async dispatch => {
	dispatch({ type: PostTypes.LOADING })

	try {
		const response = await api.get('/posts')

		const serializedPosts = response.data.map(file => ({
			id: file._id,
			name: file.name,
			readbleSize: filesize(file.size),
			preview: file.url,
			uploaded: true,
			url: file.url,
		}))

		dispatch({ type: PostTypes.FETCH, payload: serializedPosts })
	} catch (err) {
		dispatch({ type: PostTypes.FETCH_ERROR })
	}
}

export const storePosts = files => async dispatch => {
	const serializedFiles = files.map(file => ({
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

	dispatch({ type: PostTypes.CONCAT, payload: serializedFiles })

	serializedFiles.forEach(async file => {
		const data = new FormData()
		data.append('photo', file.file, file.name)

		try {
			const response = await api.post('/posts', data, {
				onUploadProgress: ({ loaded, total }) => {
					const progress = Number(Math.round((loaded * 100) / total))

					console.log(progress)

					dispatch({
						type: PostTypes.UPDATE_SINGLE,
						payload: {
							id: file.id,
							data: { progress },
						},
					})
				},
			})

			dispatch({
				type: PostTypes.UPDATE_SINGLE,
				payload: {
					id: file.id,
					data: {
						id: response.data._id,
						url: response.data.url,
						uploaded: true,
					},
				},
			})
			dispatch({ type: PostTypes.STORE })
		} catch (err) {
			dispatch({
				type: PostTypes.UPDATE_SINGLE,
				payload: {
					id: file.id,
					data: { error: true },
				},
			})
		}
	})
}
