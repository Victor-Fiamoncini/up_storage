import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import light from './styles/themes/light'
import GlobalStyle from './styles/global'

import store from './store'
import Home from './components/pages/Home'

const App = () => (
	<Provider store={store}>
		<ThemeProvider theme={light}>
			<Home />
			<GlobalStyle />
		</ThemeProvider>
	</Provider>
)

export default App
