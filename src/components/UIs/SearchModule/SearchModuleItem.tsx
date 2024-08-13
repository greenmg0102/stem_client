
import SearchModuleItemList from './SearchModuleItemList'
import SearchModuleISchoolList from './SearchModuleISchoolList'

const SearchModuleItem = ({ isUnique, item, viewType }: any) => {

    return (
        <div
            style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        >
            {viewType === "list" && !isUnique ? <SearchModuleItemList item={item} /> : null}
            {viewType === "list" && isUnique ? <SearchModuleISchoolList item={item} /> : null}
        </div>
    );
};

export default SearchModuleItem;