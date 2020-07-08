import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './ducks'

const middlewares = [thunk]
const devtoolsExtension =
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
	reducers,
	compose(
		applyMiddleware(...middlewares),
		process.env.NODE_ENV === 'development' ? devtoolsExtension : ''
	)
)
