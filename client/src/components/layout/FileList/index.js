import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useSprings } from 'react-spring'
import { ThemeContext } from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'

import { deletePost } from '../../../store/ducks/post/actions'

export default function FileList() {
	const dispatch = useDispatch()

	const { colors } = useContext(ThemeContext)
	const { posts } = useSelector(state => state.post)

	const springs = useSprings(
		posts.length,
		posts.map(() => ({
			from: { opacity: 0 },
			to: { opacity: 1 },
			leave: { opacity: 0 },
		}))
	)

	function handleDelete(id) {
		dispatch(deletePost(id))
	}

	return (
		<Container>
			{springs.map((animation, i) => (
				<animated.li key={i} style={animation}>
					<FileInfo>
						<Preview src={posts[i].preview} />
						<div>
							<strong>{posts[i].name}</strong>
							<span>
								{posts[i].size}{' '}
								{posts[i].uploaded && (
									<button onClick={() => handleDelete(posts[i].id)}>
										Excluir
									</button>
								)}
							</span>
						</div>
					</FileInfo>
					<div>
						{!posts[i].uploaded && !posts[i].error && (
							<CircularProgressbar
								styles={{
									root: { width: 24 },
									path: { stroke: colors.primary },
								}}
								strokeWidth={10}
								value={posts[i].progress}
							/>
						)}
						{posts[i].url && (
							<a href={posts[i].url} target="_blank" rel="noopener noreferrer">
								<MdLink
									style={{ marginRight: 8 }}
									size={24}
									color={colors.text}
								/>
							</a>
						)}
						{posts[i].uploaded && (
							<MdCheckCircle size={24} color={colors.success} />
						)}
						{posts[i].error && <MdError size={24} color={colors.danger} />}
					</div>
				</animated.li>
			))}
		</Container>
	)
}
