
const SearchBanner = ({ title, description }: { title: string, description: string }) => {

    return (
        <div className='w-full mb-8'>
            <p className="text-center font-bold text-gray-800 text-[32px] mb-6">{title}</p>
            <p className="text-left text-gray-500 text-[16px] mx-auto w-[55%]">{description}</p>
        </div>
    );
};

export default SearchBanner;