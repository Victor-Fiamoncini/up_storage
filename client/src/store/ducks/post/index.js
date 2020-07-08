import initialState from './state'
import PostTypes from './types'

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case PostTypes.FETCH:
			return {
				...state,
				posts: payload,
				loading: false,
			}

		case PostTypes.FETCH_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			}

		case PostTypes.UPDATE_SINGLE:
			return {
				...state,
				posts: state.posts.map(file =>
					file.id === payload.id ? { ...file, ...payload.data } : file
				),
			}

		case PostTypes.LOADING:
			return {
				...state,
				loading: true,
			}

		default:
			return initialState
	}
}
