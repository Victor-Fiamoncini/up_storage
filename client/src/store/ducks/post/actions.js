import PostTypes from './types'

export const fetchPosts = () => ({ type: PostTypes.ASYNC_FETCH })

export const storePost = file => ({
	type: PostTypes.ASYNC_STORE,
	payload: { file },
})
