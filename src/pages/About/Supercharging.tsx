import AboutCard from './AboutCard'

const Supercharging = () => {

    return (
        <div className='w-full'>

            <p className='text-[34px] font-bold mt-24'>Supercharging the Ecosystem</p>
            <p className='my-4 mb-12 text-[20px]'>There are dozens of ways this site can support your business. Here's three of them:</p>

            <div className="mb-5 flex items-center justify-around flex-wrap">
                <AboutCard
                    title={"Explore Resources"}
                    url={'/resources'}
                />
                <AboutCard
                    title={"Connect with Organizations"}
                    url={'/organizations'}
                />
                <AboutCard
                    title={"Meet the Community"}
                    url={'https://meta.ecomap.tech/users'}
                />
            </div>
        </div>
    );
};

export default Supercharging;
