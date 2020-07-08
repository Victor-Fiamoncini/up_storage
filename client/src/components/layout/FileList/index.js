import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'

import { deletePost } from '../../../store/ducks/post/actions'

export default function FileList() {
	const dispatch = useDispatch()

	const { colors } = useContext(ThemeContext)
	const { posts } = useSelector(state => state.post)

	function handleDelete(id) {
		dispatch(deletePost(id))
	}

	return (
		<Container>
			{posts.map(file => (
				<li key={file.id}>
					<FileInfo>
						<Preview src={file.preview} />
						<div>
							<strong>{file.name}</strong>
							<span>
								{file.size}{' '}
								{file.uploaded && (
									<button onClick={() => handleDelete(file.id)}>Excluir</button>
								)}
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
