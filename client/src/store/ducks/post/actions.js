import PostTypes from './types'

export const fetchPosts = () => ({ type: PostTypes.ASYNC_FETCH })

export const storePost = files => ({
	type: PostTypes.ASYNC_STORE,
	payload: { files },
})
