import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AboutBanner from './About/Banner'
import Supercharging from './About/Supercharging'

import { setPageTitle } from '../store/themeConfigSlice';

const About = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('About'));
    });
    
    return (
        <div className="pt-5 pt-12 pb-12">
            <AboutBanner />

            <div className='flex justify-center items-center flex-col'>
                <div className='w-3/5'>
                    <Supercharging />
                </div>
            </div>
        </div>
    );
};

export default About;
