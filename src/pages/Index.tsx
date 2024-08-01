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
        <div className="relative pt-5 pt-40 pb-12 relative">
            <Welcome />
        </div>
    );
};

export default Index;
