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
								{file.size}{' '}
								{file.uploaded && <button onClick={() => {}}>Excluir</button>}
							</span>
						</div>
					</FileInfo>
					<div>
						{!file.uploaded && !file.error && (
							<CircularProgressbar
								styles={{
									root: { width: 24 },
									path: { stroke: colors.primary },
								}}
								strokeWidth={10}
								value={file.progress}
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
