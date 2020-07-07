import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'

export default function FileList({ files }) {
	const { colors } = useContext(ThemeContext)

	return (
		<Container>
			{files.map(file => (
				<li key={file.id}>
					<FileInfo>
						<Preview src={file.preview} />
						<div>
							<strong>{file.name}</strong>
							<span>
								{file.size} <button onClick={() => {}}>Excluir</button>
							</span>
						</div>
					</FileInfo>
					<div>
						{!file.upload && !file.error && (
							<CircularProgressbar
								strokeWidth={10}
								percentage={file.progress}
								styles={{
									root: { width: 24 },
									path: { stroke: colors.primary },
								}}
							/>
						)}
						{file.url && (
							<a href={file.url} target="_blank" rel="noopener noreferrer">
								<MdLink style={{ marginRight: 8 }} size={24} color="#222" />
							</a>
						)}
						{file.uploaded && (
							<MdCheckCircle size={24} color={colors.success} />
						)}
						{file.error && <MdError size={24} color={colors.danger} />}
					</div>
				</li>
			))}
		</Container>
	)
}

FileList.propTypes = {
	files: PropTypes.array.isRequired,
}
