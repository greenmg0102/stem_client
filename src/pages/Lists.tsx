import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import { setPageTitle } from '../store/themeConfigSlice';

const Lists = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Lists'));
    });
    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Explore public lists "}
                    description={"Lists are collections of data curated by users and admins, from curations of helpful resources, to favorite local businesses, and more."}
                />
            </div>
        </div>
    );
};

export default Lists;
