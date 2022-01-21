import React from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@/src/contexts/ThemeContext'
import Routes from '@/src/routes'
import store from '@/src/store'
import GlobalStyle from '@/src/styles/global'

const App = () => (
	<Provider store={store}>
		<ThemeProvider>
			<Routes />
			<GlobalStyle />
		</ThemeProvider>
	</Provider>
)

export default App
