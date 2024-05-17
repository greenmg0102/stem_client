import { NavLink } from 'react-router-dom';
import HomeCard from './HomeCard'

const UsersList = () => {

    return (
        <div className='w-full'>

            <p className='text-[34px] font-bold text-center mt-24'>Highlighted Users</p>
            <p className='text-center my-4 mb-12 text-[20px]'>These are some of our favorite Users</p>

            <div className="mb-5 flex items-center justify-around flex-wrap">
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />
            </div>
            <div className='flex justify-center'>
                <NavLink to="/users-list" className='px-12 py-4 text-[18px] cursor-pointer text-gray-100 font-bold rounded-full bg-gray-900 transition-all hover:shadow-2xl'>
                    Explore all Users
                </NavLink>
            </div>
        </div>
    );
};

export default UsersList;
