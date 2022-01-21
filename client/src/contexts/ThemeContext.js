import React from 'react'

import PropTypes from 'prop-types'
import { ThemeProvider as Theme } from 'styled-components'

import light from '@/src/styles/themes/light'

export const ThemeProvider = ({ children }) => <Theme theme={light}>{children}</Theme>

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
