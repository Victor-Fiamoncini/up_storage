import React from 'react'
import { ThemeProvider } from 'styled-components'

import light from './styles/themes/light'
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'

import Dropzone from './components/utils/Dropzone'

function App() {
	return (
		<ThemeProvider theme={light}>
			<Container>
				<Content>
					<Dropzone />
				</Content>
			</Container>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default App
