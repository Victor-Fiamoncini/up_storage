import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import light from './styles/themes/light'
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'

import Dropzone from './components/utils/Dropzone'
import FileList from './components/layout/FileList'

export default function App() {
	const [uploadedFiles, setUploadedFiles] = useState([])

	function handleUpload(files) {
		console.log(files)
	}

	return (
		<ThemeProvider theme={light}>
			<Container>
				<Content>
					<Dropzone handleUpload={handleUpload} />
					<FileList />
				</Content>
			</Container>
			<GlobalStyle />
		</ThemeProvider>
	)
}
