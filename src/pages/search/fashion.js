import SearchPageTemplate from '../../components/SearchPageTemplate.js';
import { initializeFashionData } from '../../utils/searchPageInitializers.js';

const FashionSearch = () => {
	return (
		<SearchPageTemplate
			itemType="fashion"
			title="Fashion"
			initializeData={initializeFashionData}
			buttonColors={{ 
				bg: 'bg-fashion', 
				hover: 'hover:bg-fashion-dark' 
			}}
		/>
	);
};

export default FashionSearch;
