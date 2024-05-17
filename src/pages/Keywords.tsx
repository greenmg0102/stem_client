import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import { setPageTitle } from '../store/themeConfigSlice';

const keywords = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('keywords'));
    });
    
    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Keyword Directory"}
                    description={"Search for different Keywords by name, type, or for what you're looking for in the ecosystem. Click on any of the Keywords and it will take you to its Profile Page where you can view all Resources, Organizations, Businesses, etc., associated with that Keyword."}
                />
            </div>
        </div>
    );
};

export default keywords;
