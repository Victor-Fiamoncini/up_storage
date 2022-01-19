import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useSprings } from 'react-spring'
import { useTheme } from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from '@/src/components/pages/Home/FileList/styles'

import { deletePost } from '@/src/store/ducks/post/actions'

const FileList = () => {
	const dispatch = useDispatch()
	const { posts } = useSelector(state => state.post)

	const { colors } = useTheme()

	const transitionProps = () => ({ from: { opacity: 0 }, to: { opacity: 1 }, leave: { opacity: 0 } })

	const springs = useSprings(posts.length, posts.map(transitionProps))

	return (
		<Container>
			{springs.map((animation, i) => {
				const post = posts[i]

				return (
					<animated.li key={i} style={animation}>
						<FileInfo>
							<Preview src={post.preview} />
							<div>
								<strong>{post.name}</strong>
								<span>
									{post.size} {post.uploaded && <button onClick={() => dispatch(deletePost(post.id))}>Excluir</button>}
								</span>
							</div>
						</FileInfo>
						<div>
							{!post.uploaded && !post.error && (
								<CircularProgressbar
									styles={{
										root: { width: 24 },
										path: { stroke: colors.primary },
									}}
									strokeWidth={10}
									value={post.progress}
								/>
							)}
							{post.url && (
								<a href={post.url} target="_blank" rel="noopener noreferrer">
									<MdLink style={{ marginRight: 8 }} size={24} color={colors.text} />
								</a>
							)}
							{post.uploaded && <MdCheckCircle size={24} color={colors.success} />}
							{post.error && <MdError size={24} color={colors.danger} />}
						</div>
					</animated.li>
				)
			})}
		</Container>
	)
}

export default FileList
