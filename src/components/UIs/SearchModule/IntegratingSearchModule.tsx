import { useState, useEffect } from "react";
import ClickAwayListener from 'react-click-away-listener';
import SearchModuleFilter from './SearchModuleFilter'
import SearchModuleItem from './SearchModuleItem'

const IntegratingSearchModule = ({ pageInfo, setPageInfo, searchResult, searchParameter, setSearchParameter, bufferSearch, setBufferSearch }: any) => {


    const [focus, setFocus] = useState(false);
    const overlaySearchClick = () => setFocus(true);
    const overlayClickAway = () => setFocus(false);

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            setSearchParameter(event.target.value)
        }
    };

    return (
        <div className='w-full flex justify-center py-8'>
            <div className="w-full flex justify-between items-start">
                <div className="w-full p-2">
                    <div className="flex justify-between items-center mb-2">
                        <p className="mb-2">Viewing {pageInfo.pageNumber + 1} ~ {pageInfo.pageLimit} of {searchParameter.totalNumber} results</p>
                        <div className="flex justify-start items-center">
                            <select className="form-select text-white-dark w-[130px] mr-1">
                                <option>Card View</option>
                                <option>List View</option>
                                <option>Map View</option>
                            </select>
                            <select className="form-select text-white-dark w-[150px]">
                                <option>A ~ Z</option>
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Recently Updated</option>
                                <option>Relevance</option>
                                <option>Z ~ A</option>
                            </select>
                        </div>
                    </div>

                    <ClickAwayListener onClickAway={overlayClickAway}>
                        <div className="search-form-overlay relative border border-white-dark/20 rounded-md h-12 w-full" onClick={overlaySearchClick}>
                            <input
                                type="text"
                                value={bufferSearch}
                                placeholder="Search..."
                                className={`form-input bg-white h-full placeholder:tracking-wider hidden ltr:pl-12 rtl:pr-12 peer ${focus ? '!block' : ''}`}
                                onChange={(e: any) => setBufferSearch(e.target.value)}
                                onKeyDown={(e: any) => handleKeyPress(e)}
                            />
                            <button
                                type="button"
                                className={`text-dark/70 absolute ltr:right-1 rtl:left-1 inset-y-0 my-auto w-9 h-9 p-0 flex items-center justify-center peer-focus:text-primary ${focus ? '!ltr:!right-auto ltr:left-1 rtl:right-1' : ''
                                    }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </button>
                        </div>
                    </ClickAwayListener>

                    <div className="mt-4">
                        {
                            searchResult.map((item: any, index: any) =>
                                <SearchModuleItem key={index} item={item} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratingSearchModule;