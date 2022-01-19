import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/src/contexts/ThemeContext'

import GlobalStyle from '@/src/styles/global'

import store from '@/src/store'
import Routes from '@/src/routes'

const App = () => (
	<Provider store={store}>
		<ThemeProvider>
			<Routes />
			<GlobalStyle />
		</ThemeProvider>
	</Provider>
)

export default App
