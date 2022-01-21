import PostTypes from '@/src/store/ducks/post/types'

const initialState = {
	posts: [],
	loading: false,
	error: false,
}

const postReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case PostTypes.FETCH_ALL_LOADING:
		case PostTypes.STORE_LOADING:
		case PostTypes.DELETE_LOADING: {
			return {
				...state,
				loading: true,
			}
		}

		case PostTypes.FETCH_ALL: {
			return {
				...state,
				posts: payload,
				loading: false,
			}
		}

		case PostTypes.STORE: {
			return {
				...state,
				posts: state.posts.map(post => {
					return post.id === payload.id ? { ...post, ...payload.data } : post
				}),
			}
		}

		case PostTypes.DELETE: {
			return {
				...state,
				posts: state.posts.filter(post => post.id !== payload),
			}
		}

		case PostTypes.PUSH_POSTS: {
			return {
				...state,
				posts: [...state.posts, ...payload],
			}
		}

		case PostTypes.FETCH_ALL_ERROR:
		case PostTypes.STORE_ERROR:
		case PostTypes.DELETE_ERROR: {
			return {
				...state,
				loading: false,
				error: true,
			}
		}

		default: {
			return state
		}
	}
}

export default postReducer
