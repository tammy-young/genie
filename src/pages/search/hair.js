import SearchPageTemplate from '../../components/SearchPageTemplate.js';
import { initializeHairData } from '../../utils/searchPageInitializers.js';

const STARDESIGN_HAIR_BRAND = [{ brandId: 555, name: "StarDesign Hair" }];

const HairSearch = () => {
  return (
    <SearchPageTemplate
      itemType="hair"
      title="Hair"
      initializeData={initializeHairData}
      defaultBrands={STARDESIGN_HAIR_BRAND}
      filterProps={{
        itemTypeFilter: false,
        brandFilter: false,
        colourFilter: false
      }}
      buttonColors={{ 
        bg: 'bg-hair', 
        hover: 'hover:bg-hair-dark',
        textColor: 'text-black'
      }}
    />
  );
};

export default HairSearch;
