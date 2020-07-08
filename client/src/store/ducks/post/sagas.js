import PostTypes from './types'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import api from '../../../services/api'

export function* asyncFetchPosts() {
	yield put({ type: PostTypes.LOADING })

	try {
		const response = yield call(api.get, '/posts')

		yield put({ type: PostTypes.FETCH, payload: response.data })
	} catch (err) {
		yield put({ type: PostTypes.FETCH_ERROR })
	}
}

export default function* root() {
	yield all([takeEvery(PostTypes.ASYNC_FETCH, asyncFetchPosts)])
}
