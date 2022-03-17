import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Dashboard from './view';

const initialState = (window as any)._initialState || {};

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/dashboard' element={<Dashboard {...initialState} />} />
			</Routes>
		</BrowserRouter>
	)
};

ReactDOM.hydrate(<App />, document.getElementById('app'));