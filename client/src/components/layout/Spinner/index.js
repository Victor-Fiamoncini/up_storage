import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { BeatLoader } from 'react-spinners'
import { ThemeContext } from 'styled-components'

import { Container } from './styles'

export default function Spinner({ loading }) {
	const { colors } = useContext(ThemeContext)

	return (
		<Container>
			<BeatLoader size={32} color={colors.primary} loading={loading} />
		</Container>
	)
}

Spinner.propTypes = {
	loading: PropTypes.bool,
}
