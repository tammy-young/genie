import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
	const [data, setData] = useState(null);

	const fetchData = async () => {
		try {
			const cookies = document.cookie;
			const response = await axios.get('/api/search/', { cookies });
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	fetchData();

	return (
		<div>
			<h1>Genie</h1>
			{data && <p>Data from API: {JSON.stringify(data)}</p>}
		</div>
	);

}

export default App;
