import styled from 'styled-components'

export const Container = styled.ul`
	display: block;

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15px 0 0;
		color: ${props => props.theme.colors.text};
	}
`

export const FileInfo = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;

		span {
			font-size: 12px;
			color: #999;
			margin: 5px 0 0;

			button {
				border: 0;
				margin: 0;
				background: transparent;
				color: ${props => props.theme.colors.danger};
				cursor: pointer;
			}
		}
	}
`

export const Preview = styled.img`
	width: 36px;
	height: 36px;
	margin: 0 5px 0 0;
	border-radius: 4px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`
