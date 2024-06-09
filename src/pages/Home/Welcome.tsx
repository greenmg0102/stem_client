import { NavLink } from 'react-router-dom';

// import { useEffect, useState } from 'react';
// import { stateList, countryList } from './temp'

const Welcome = () => {

    // const [CityStatecountry, setCityStatecountry] = useState([])
    // useEffect(() => {
    //     const originData = stateList
    //     let real: any = []
    //     async function fecthData() {

    //         for (let i = 0; i < 3; i++) {
    //             var headers = new Headers();
    //             headers.append("X-CSCAPI-KEY", "YVdOOVdCQkRyNjNvYTB3dzh3bE9LZ29hVVZsOWhmR0lFT2dSUWtMTg==");
    //             var requestOptions: any = {
    //                 method: 'GET',
    //                 headers: headers,
    //                 redirect: 'follow'
    //             };
    //             let result: any = await fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    //                 .then(response => response.text())
    //                 .then(result => { return result })
    //             var processedResult = JSON.parse(result).map((item: any) => `${item.name}, ${originData[i].name}, ${countryList.filter((each: any) => originData[i].country_id === each.id)[0].name}`);
    //             real = [...real, ...processedResult]
    //         }
    //         console.log("originData", real[0], real.length);
    //     }
    //     fecthData()
    // }, [])

    return (
        <div className="mb-5 flex items-center justify-center">
            <div className="max-w-[700px] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="p-8">
                    <p className="text-[40px] leading-[50px] text-gray-800 font-bold text-center">Welcome to MBA</p>
                    <p className="text-[18px] leading-7 text-gray-600 mt-6 mb-12">

                    </p>
                    <div className="flex justify-around flex-wrap items-center">
                        
                        {/* <NavLink to="/resources" className="px-8 py-3 my-2 hover:shadow-lg text-gray-100 rounded-[6px] bg-blue-600 text-[18px] cursor-pointer transition-all">
                            Explore Resources
                        </NavLink>
                        <NavLink to="/about" className="px-8 py-3 my-2 hover:shadow-lg font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            Learn More
                        </NavLink> */}

                        <NavLink to="/integration-search" className="w-[45%] text-center px-8 py-3 my-2 hover:shadow-lg font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            Integration Search
                        </NavLink>

                        <NavLink to="/opportunity-extract" className="w-[45%] text-center px-8 py-3 my-2 hover:shadow-lg font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            Opportunity Search
                        </NavLink>

                        <NavLink to="/general-field-extract" className="w-[45%] text-center px-8 py-3 my-2 hover:shadow-lg font-bold rounded-[6px] border border-[2px] border-blue-600 text-blue-600 text-[18px] cursor-pointer transition-all">
                            General Field Search
                        </NavLink>
                        <NavLink to="/admin/stem" className="w-[45%] text-center px-8 py-3 my-2 hover:shadow-lg text-gray-100 rounded-[6px] bg-blue-600 text-[18px] cursor-pointer transition-all">
                            Updating Excel
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
