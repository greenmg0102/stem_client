import { NavLink } from 'react-router-dom';

const Welcome = () => {


    return (
        <div className="mb-5 flex items-center justify-center">
            <div
                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                className="max-w-[700px] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
            >
                <div className="p-8">
                    <p className="text-[40px] leading-[50px] text-gray-800 font-bold text-center">Welcome to the STEM Opportunity Index</p>
                    <p className="text-[18px] text-center leading-7 text-gray-600 my-6">
                        I want to find a....
                    </p>
                    <div className="flex justify-around flex-wrap items-center">

                        {/* <NavLink to="/resources" className="px-8 py-3 my-2 hover:shadow-xl text-gray-100 rounded-[6px] bg-blue-600 text-[18px] cursor-pointer transition-all">
                            Explore Resources
                        </NavLink>
                        <NavLink to="/about" className="px-8 py-3 my-2 hover:shadow-xl font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            Learn More
                        </NavLink> */}

                        <NavLink to="/integration-search" className="w-[45%] text-center hover:text-gray-100 hover:bg-blue-500 px-8 py-3 my-2 hover:shadow-xl font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            <div className="flex items-center">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="interaction" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM304.8 524h50.7c3.7 0 6.8-3 6.8-6.8v-78.9c0-19.7 15.9-35.6 35.5-35.6h205.7v53.4c0 5.7 6.5 8.8 10.9 5.3l109.1-85.7c3.5-2.7 3.5-8 0-10.7l-109.1-85.7c-4.4-3.5-10.9-.3-10.9 5.3V338H397.7c-55.1 0-99.7 44.8-99.7 100.1V517c0 4 3 7 6.8 7zm-4.2 134.9l109.1 85.7c4.4 3.5 10.9.3 10.9-5.3v-53.4h205.7c55.1 0 99.7-44.8 99.7-100.1v-78.9c0-3.7-3-6.8-6.8-6.8h-50.7c-3.7 0-6.8 3-6.8 6.8v78.9c0 19.7-15.9 35.6-35.5 35.6H420.6V568c0-5.7-6.5-8.8-10.9-5.3l-109.1 85.7c-3.5 2.5-3.5 7.8 0 10.5z"></path></svg>
                                <span className="ltr:pl-3 rtl:pr-3">Pathway</span>
                            </div>
                        </NavLink>

                        <NavLink to="/opportunity-extract" className="w-[45%] text-center hover:text-gray-100 hover:bg-blue-500 px-8 py-3 my-2 hover:shadow-xl font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            <div className="flex items-center">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="line-chart" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z"></path></svg>
                                <span className="ltr:pl-3 rtl:pr-3">Opportunity Search</span>
                            </div>
                        </NavLink>

                        <NavLink to="/credential-extract" className="w-[45%] text-center hover:text-gray-100 hover:bg-blue-500 px-8 py-3 my-2 hover:shadow-xl font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            <div className="flex items-center">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg>
                                <span className="ltr:pl-3 rtl:pr-3">Credential</span>
                            </div>
                        </NavLink>

                        <NavLink to="/general-field-extract" className="w-[45%] text-center hover:text-gray-100 hover:bg-blue-500 px-8 py-3 my-2 hover:shadow-xl font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            <div className="flex items-center">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="unordered-list" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
                                <span className="ltr:pl-3 rtl:pr-3">Interest area</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
