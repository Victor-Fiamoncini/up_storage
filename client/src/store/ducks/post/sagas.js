import PostTypes from './types'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import filesize from 'filesize'

import api from '../../../services/api'

export function* asyncFetchPosts() {
	yield put({ type: PostTypes.LOADING })

	try {
		const response = yield call(api.get, '/posts')

		const serializedPosts = response.data.map(file => ({
			id: file._id,
			name: file.name,
			readbleSize: filesize(file.size),
			preview: file.url,
			uploaded: true,
			url: file.url,
		}))

		yield put({ type: PostTypes.FETCH, payload: serializedPosts })
	} catch (err) {
		yield put({ type: PostTypes.FETCH_ERROR })
	}
}

export function* asyncStorePost({ payload }) {
	const { file } = payload

	const data = new FormData()
	data.append('photo', file.file, file.name)

	try {
		const response = yield call(api.post, '/posts', data, {
			onUploadProgress: function* (e) {
				const progress = Number(Math.round((e.loaded * 100) / e.total))

				yield put({
					type: PostTypes.UPDATE_SINGLE,
					payload: {
						id: file.id,
						data: { progress },
					},
				})
			},
		})

		yield put({
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
	} catch (err) {
		yield put({
			type: PostTypes.UPDATE_SINGLE,
			payload: {
				id: file.id,
				data: { error: true },
			},
		})
	}
}

export default function* root() {
	yield all([
		takeEvery(PostTypes.ASYNC_FETCH, asyncFetchPosts),
		takeEvery(PostTypes.ASYNC_STORE, asyncStorePost),
	])
}
