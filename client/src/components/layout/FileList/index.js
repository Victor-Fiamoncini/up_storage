import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles'

export default function FileList() {
	const { colors } = useContext(ThemeContext)

	return (
		<Container>
			<li>
				<FileInfo>
					<Preview src="http://localhost:3333/files/48cf641da63003fb9f76f4571cc97275-mars.jpg" />
					<div>
						<strong>Profile.png</strong>
						<span>
							64kb <button onClick={() => {}}>Excluir</button>
						</span>
					</div>
				</FileInfo>
				<div>
					<CircularProgressbar
						strokeWidth={10}
						percentage={60}
						styles={{
							root: { width: 24 },
							path: { stroke: colors.primary },
						}}
					/>
					<a
						href="http://localhost:3333/files/48cf641da63003fb9f76f4571cc97275-mars.jpg"
						target="_blank"
						rel="noopener noreferrer"
					>
						<MdLink style={{ marginRight: 8 }} size={24} color="#222" />
					</a>

					<MdCheckCircle size={24} color={colors.success} />
					<MdError size={24} color={colors.danger} />
				</div>
			</li>
		</Container>
	)
}
