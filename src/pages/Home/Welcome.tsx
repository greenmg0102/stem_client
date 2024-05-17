import { NavLink } from 'react-router-dom';

const Welcome = () => {

    return (
        <div className="mb-5 flex items-center justify-center">
            <div className="max-w-[700px] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="p-8">
                    <p className="text-[40px] leading-[50px] text-gray-800 font-bold">Welcome to Tech Compass PGH</p>
                    <p className="text-[18px] leading-7 text-gray-600 mt-6 mb-12">
                        Find your future with Tech Compass PGH! Tech Compass PGH is designed to centralize the startup resources of Pittsburgh's tech community in one easy to navigate location.
                    </p>
                    <div className="flex justify-around flex-wrap items-center">
                        <NavLink to="/resources" className="px-8 py-3 my-2 hover:shadow-lg text-gray-100 rounded-[6px] bg-blue-600 text-[18px] cursor-pointer transition-all">
                            Explore Resources
                        </NavLink>
                        <NavLink to="/about" className="px-8 py-3 my-2 hover:shadow-lg font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            Learn More
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
