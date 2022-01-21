import styled from 'styled-components'

const Container = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		width: 100%;
		max-width: 400px;
		margin: 30px;
		background: ${props => props.theme.colors.background};
		border-radius: 4px;
		padding: 20px;
		box-shadow: 6px 8px 20px rgba(0, 0, 0, 0.2);
	}
`

export default Container
