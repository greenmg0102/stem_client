import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';

const Guides = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Guides'));
    });
    return (
        <div>
            <div className="pt-5">
                Guides part
            </div>
        </div>
    );
};

export default Guides;
