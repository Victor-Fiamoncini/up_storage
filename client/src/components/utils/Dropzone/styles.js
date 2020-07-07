import styled, { css } from 'styled-components'

const dropActive = css`
	border-color: ${props => props.theme.colors.success};
`

const dropReject = css`
	border-color: ${props => props.theme.colors.danger};
`

export const Container = styled.div.attrs({ className: 'dropzone' })`
	border: 1px dashed #ddd;
	border-radius: 4px;
	transition: height 0.2s ease;

	${props => props.isDragActive && dropActive};
	${props => props.isDragReject && dropReject};

	cursor: pointer;
`

export const Message = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 0;
	color: ${props => props.theme.colors[props.type || 'text']};
`
