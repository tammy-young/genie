import SearchPageTemplate from '../../components/SearchPageTemplate.js';
import { initializeInteriorData } from '../../utils/searchPageInitializers.js';

const InteriorSearch = () => {
	return (
		<SearchPageTemplate
			itemType="interior"
			title="Interior"
			initializeData={initializeInteriorData}
			buttonColors={{ 
				bg: 'bg-interior', 
				hover: 'hover:bg-interior-dark' 
			}}
		/>
	);
};

export default InteriorSearch;
