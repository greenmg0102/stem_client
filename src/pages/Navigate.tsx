import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';

const Navigate = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Navigate'));
    });
    return (
        <div>
            <div className="pt-5">
                Navigate part
            </div>
        </div>
    );
};

export default Navigate;
