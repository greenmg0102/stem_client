import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import SearchModule from '../components/UIs/SearchModule/SearchModule';
import { setPageTitle } from '../store/themeConfigSlice';



const Opportunity = () => {

    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(setPageTitle('Opportunity'));
    });

    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Opportunity"}
                    description={""}
                />
                <SearchModule />
            </div>
        </div>
    );
};

export default Opportunity;
