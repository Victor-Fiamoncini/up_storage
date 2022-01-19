import React from 'react'
import PropTypes from 'prop-types'
import { BeatLoader } from 'react-spinners'
import { useTheme } from 'styled-components'

import { Container } from '@/src/components/layout/Spinner/styles'

const Spinner = ({ loading }) => {
	const { colors } = useTheme()

	return (
		<Container>
			<BeatLoader size={36} color={colors.primary} loading={loading} />
		</Container>
	)
}

Spinner.propTypes = {
	loading: PropTypes.bool,
}

export default Spinner
