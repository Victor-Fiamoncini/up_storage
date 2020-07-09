import { createGlobalStyle, css } from 'styled-components'
import 'react-circular-progressbar/dist/styles.css'

const appBackground = css`
	background: linear-gradient(
		to bottom right,
		${props => props.theme.colors.primary},
		${props => props.theme.colors.tertiary}
	);
`

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	body,
	html,
	#root {
		height: 100%;
	}

	body {
		${appBackground}
 		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		font-size: 1rem;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		&::-webkit-scrollbar {
			width: 10px;
		}
		&::-webkit-scrollbar-track {
			background: #f5f5f5;
		}
		&::-webkit-scrollbar-thumb {
			background: ${props => props.theme.colors.primary};
		}
	}
`
