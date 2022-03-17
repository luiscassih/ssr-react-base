import React, { useState } from 'react';
export interface DashboardProps {
	counter: number
};
export default (props: DashboardProps) => {
	const [counter, setCounter] = useState(props.counter || 0);
	return (
		<div className='Dashboard'>
			Example
			<button onClick={() => setCounter(counter + 1)}>{counter}</button>
		</div>
	);
};