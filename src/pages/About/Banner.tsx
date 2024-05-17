
const AboutBanner = () => {

    return (
        <div className="mb-5 flex items-center justify-center">
            <div className="max-w-[900px] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="p-8">
                    <p className="text-[40px] leading-[50px] text-gray-800 font-bold">About TechCompassPGH</p>
                    <p className="text-[18px] leading-7 text-gray-600 mt-6 font-bold">
                        The mission of Tech Compass PGH is to ensure that all Pittsburghers can find what they need to thrive.
                    </p>
                    <p className="text-[15px] leading-5 text-gray-500 mt-6 mb-2">
                        This portal will connect new learners, seasoned technologists and entrepreneurs of all backgrounds to the various resources and trainings they need to succeed in our local tech economy. Tech Compass PGH is the most comprehensive catalog of skills-training opportunities in our region. Click the RESOURCES TAB to get moving in the right direction for you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutBanner;
