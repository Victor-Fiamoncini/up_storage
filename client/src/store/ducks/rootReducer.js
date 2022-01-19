import { combineReducers } from 'redux'

import postReducer from '@/src/store/ducks/post/reducer'

export default combineReducers({
	post: postReducer,
})
