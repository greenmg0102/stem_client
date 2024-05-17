import { NavLink } from 'react-router-dom';
import HomeCard from './HomeCard'

const Organizations = () => {

    return (
        <div className='w-full'>
            <div className="mb-5 flex items-center justify-around flex-wrap">
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
            </div>
            <div className='flex justify-center'>
                <NavLink to="/organizations" className='px-12 py-4 text-[18px] cursor-pointer text-gray-100 font-bold rounded-full bg-gray-900 transition-all hover:shadow-2xl'>
                    Explore all Organizations
                </NavLink>
            </div>
        </div>
    );
};

export default Organizations;
