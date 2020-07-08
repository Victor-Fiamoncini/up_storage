import { all, call, put, takeEvery } from 'redux-saga/effects'
import { v4 } from 'uuid'
import filesize from 'filesize'

import PostTypes from './types'
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

export function* asyncStorePosts({ payload }) {
	const { files } = payload

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

	yield put({ type: PostTypes.CONCAT, payload: serializedFiles })

	yield all(serializedFiles.map(file => call(handlePostStore, file)))
}

function* handlePostStore(file) {
	const data = new FormData()
	data.append('photo', file.file, file.name)

	try {
		const response = yield call(api.post, '/posts', data, {
			onUploadProgress: event => all(call(handleUpdateProgress, event, file)),
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
		yield put({ type: PostTypes.STORE })
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

function* handleUpdateProgress({ loaded, total }, file) {
	const progress = Number(Math.round((loaded * 100) / total))

	console.log(progress)

	yield put({
		type: PostTypes.UPDATE_SINGLE,
		payload: {
			id: file.id,
			data: { progress },
		},
	})
}

export default function* root() {
	yield all([
		takeEvery(PostTypes.ASYNC_FETCH, asyncFetchPosts),
		takeEvery(PostTypes.ASYNC_STORE, asyncStorePosts),
	])
}
