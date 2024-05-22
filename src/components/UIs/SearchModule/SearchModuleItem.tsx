import { useNavigate } from 'react-router-dom';
import SearchModuleItemList from './SearchModuleItemList'
import SearchModuleItemCard from './SearchModuleItemCard'

const SearchModuleItem = ({ item, viewType }: any) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/integration-search-id/${item._id}`)} >

            {viewType === "list" ? <SearchModuleItemList item={item} /> : null}
            {viewType === "card" ? <SearchModuleItemCard item={item} /> : null}

        </div>
    );
};

export default SearchModuleItem;