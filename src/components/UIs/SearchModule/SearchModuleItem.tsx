
import SearchModuleItemList from './SearchModuleItemList'
import SearchModuleISchoolList from './SearchModuleISchoolList'

const SearchModuleItem = ({ isUnique, item, viewType }: any) => {

    return (
        <div>
            {viewType === "list" && !isUnique ? <SearchModuleItemList item={item} /> : null}
            {viewType === "list" && isUnique ? <SearchModuleISchoolList item={item} /> : null}
        </div>
    );
};

export default SearchModuleItem;