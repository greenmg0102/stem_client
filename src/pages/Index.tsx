import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import Welcome from './Home/Welcome'
import Resource from './Home/Resource'
import Organizations from './Home/Organizations'
import UsersList from './Home/UsersList'
import Lists from './Home/Lists'

const Index = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });

    return (
        <div className="pt-5 pt-12 pb-12">
            <div>
                <Welcome />
            </div>
        </div>
    );
};

export default Index;
