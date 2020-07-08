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

		case PostTypes.STORE:
			return {
				...state,
			}

		case PostTypes.DELETE:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== payload),
			}

		case PostTypes.FETCH_ERROR:
		case PostTypes.STORE_ERROR:
		case PostTypes.DELETE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			}

		case PostTypes.PUSH_POSTS:
			return {
				...state,
				posts: [...state.posts, ...payload],
			}

		case PostTypes.UPDATE_SINGLE_POST:
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
			return state
	}
}
