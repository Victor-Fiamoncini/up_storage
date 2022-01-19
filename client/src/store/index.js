import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from '@/src/store/ducks/rootReducer'

const middlewares = [thunk]

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
