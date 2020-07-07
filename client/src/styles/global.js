/* eslint-disable indent */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline-color: ${props => props.theme.colors.primary};
		box-sizing: border-box;
	}

	body,
	html,
	#root {
		height: 100%;
	}

	body {
 		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		font-size: 1rem;
		background: linear-gradient(to bottom right, ${props =>
			props.theme.colors.primary}, ${props => props.theme.colors.secundary});
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}
`
