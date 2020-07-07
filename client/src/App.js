import React from 'react'
import { ThemeProvider } from 'styled-components'

import light from './styles/themes/light'
import GlobalStyle from './styles/global'

import Home from './components/pages/Home'

export default function App() {
	return (
		<ThemeProvider theme={light}>
			<Home />
			<GlobalStyle />
		</ThemeProvider>
	)
}
