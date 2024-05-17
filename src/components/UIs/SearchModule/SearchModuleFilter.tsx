import { useState } from "react";
import AnimateHeight from 'react-animate-height';

const SearchModuleFilter = () => {

    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    return (
        <div className='w-full mb-5'>
            <div className="border border-[#d3d3d3] dark:border-[#3b3f5c] rounded font-semibold">
                <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
                    <button
                        type="button"
                        className={`px-4 py-3 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] !text-primary`}
                        onClick={() => togglePara('1')}
                    >
                        Type of Resource
                        <div className={`${active === '1' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                    <div>
                        <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                            <div className="space-y-2 px-4 py-3  text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Repositories (12)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark"> connect (21)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Search terms (8)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Available filters (4)</span>
                                </label>
                            </div>
                        </AnimateHeight>
                    </div>
                </div>
                <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
                    <button
                        type="button"
                        className={`px-4 py-3 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                        onClick={() => togglePara('2')}
                    >
                        Type of Resource
                        <div className={`${active === '2' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                    <div>
                        <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                            <div className="space-y-2 px-4 py-3  text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Search terms (8)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Available filters (4)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Search terms (8)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Available filters (4)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Search terms (8)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Available filters (4)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Search terms (8)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Available filters (4)</span>
                                </label>
                            </div>
                        </AnimateHeight>
                    </div>
                </div>
                <div className="border-b border-[#d3d3d3] dark:border-[#3b3f5c]">
                    <button
                        type="button"
                        className={`px-4 py-3 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                        onClick={() => togglePara('3')}
                    >
                        Type of Resource
                        <div className={`${active === '3' ? 'rotate-180' : ''} ltr:ml-auto rtl:mr-auto`}>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                    <div>
                        <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                            <div className="space-y-2 px-4 py-3  text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">Selecting keywords (15)</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked
                                    />
                                    <span className=" text-white-dark">typing in relevant (2)</span>
                                </label>
                            </div>
                        </AnimateHeight>
                    </div>
                </div>
            </div>
            <div className="bg-blue-500 transition-all hover:bg-blue-600 rounded-full hover:shadow-xl text-gray-100 mt-4 p-4 py-3 cursor-pointer text-center font-bold">
                Add Something
            </div>
        </div>
    );
};

export default SearchModuleFilter;