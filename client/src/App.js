import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import light from './styles/themes/light'
import GlobalStyle from './styles/global'

import store from '@/src/store'
import Routes from './routes'

const App = () => (
	<Provider store={store}>
		<ThemeProvider theme={light}>
			<Routes />
			<GlobalStyle />
		</ThemeProvider>
	</Provider>
)

export default App
