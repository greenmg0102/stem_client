import { NavLink } from 'react-router-dom';

const AboutCard = ({ title, url }: { title: string, url: string }) => {

    return (
        <div className="mb-5 mx-1 flex items-center justify-center cursor-pointer transition-all hover:shadow-2xl">
            <div className="max-w-[15rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="py-7 px-6">
                    <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                        <img src="/assets/images/profile-28.jpeg" alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light text-center">How to Start a Blog in 5 Easy Steps.</h5>
                    <p className="text-white-dark">Vestibulum vestibulum tortor ut eros tincidunt, ut rutrum elit volutpat.</p>

                    <div className="relative flex justify-between mt-6 pt-4  before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
                        <NavLink to={url} className="mt-2 w-full rounded-[4px] bg-gray-900 text-gray-100 text-center py-2 transition-all cursor-pointer">
                            {title}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCard;