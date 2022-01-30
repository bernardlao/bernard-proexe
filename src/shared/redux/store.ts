import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducers from './reducer'

const middlewares = compose(composeWithDevTools(applyMiddleware(thunk, logger)))

export default createStore(rootReducers, middlewares)
