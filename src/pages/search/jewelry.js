import SearchPageTemplate from '../../components/SearchPageTemplate.js';
import { initializeJewelryData } from '../../utils/searchPageInitializers.js';

const JewelrySearch = () => {
  return (
    <SearchPageTemplate
      itemType="jewelry"
      title="Jewelry"
      initializeData={initializeJewelryData}
      filterProps={{
        itemTypeFilter: false
      }}
      buttonColors={{ 
        bg: 'bg-jewelry', 
        hover: 'hover:bg-jewelry-dark' 
      }}
    />
  );
};

export default JewelrySearch;
