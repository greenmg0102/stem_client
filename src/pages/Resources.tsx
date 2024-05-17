import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import SearchModule from '../components/UIs/SearchModule/SearchModule';
import { setPageTitle } from '../store/themeConfigSlice';

const Resources = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Resources'));
    });
    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Resources"}
                    description={"This page will help you connect with local Resources in your area. You can refine your search below by typing in relevant search terms or selecting keywords from the available filters."}
                />
                <SearchModule />
            </div>
        </div>
    );
};

export default Resources;
