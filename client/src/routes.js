import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '@/src/components/pages/Home'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact to="/" component={Home} />
		</Switch>
	</BrowserRouter>
)

export default Routes
