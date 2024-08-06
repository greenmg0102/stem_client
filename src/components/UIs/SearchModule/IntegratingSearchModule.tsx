import { useState, useEffect } from "react";
import { Checkbox } from 'antd';
import { DataTable } from 'mantine-datatable';
import SearchModuleItem from './SearchModuleItem'
import RealSearchItem from './RealSearchItem'
import clsx from 'clsx'

const IntegratingSearchModule = ({ setUnique, isUnique, setSortCondition, sortCondition, page, pageSize, PAGE_SIZES, isRealLoading, bufferSearchDataList, setBufferSearchDataList, setPage, totalCount, isLoading, setPageSize, recordsData, setSearchParameter, bufferSearch, setBufferSearch }: any) => {

    const [viewType, setViewType] = useState('list')

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            setSearchParameter(event.target.value)
            setBufferSearchDataList(null)
        }
    };

    return (
        <div className='w-full flex justify-center py-8 pt-0'>
            <div className="w-full flex justify-between items-start">
                <div className="w-full p-2 pt-0">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex mb-2 items-center">
                            <p className="mr-2">Total result: {totalCount}</p>

                            {isLoading ?
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="animate-spin"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
                                :
                                null}
                        </div>
                        <div className="flex justify-start items-center">
                            <Checkbox onChange={(e: any) => setUnique(e.target.checked)} checked={isUnique} style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>Extracting Unique School</Checkbox>
                            <select
                                className="form-select text-gray-900 w-[200px]"
                                onClick={(e: any) => setSortCondition(e.target.value)}
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                            // 
                            >
                                <option value={'credentialSchool.credential:1'}>School : A ~ Z</option>
                                <option value={'credentialSchool.school:0'}>School : Z ~ A</option>
                                <option value={'credential.credential:1'}>Credential : A ~ Z</option>
                                <option value={'credential.credential:0'}>Credential : Z ~ A</option>
                            </select>
                        </div>
                    </div>

                    <div className="relative search-form-overlay relative border border-white-dark/20 rounded-md h-12 w-full">
                        <input
                            type="text"
                            value={bufferSearch}
                            placeholder="Search..."
                            className={'form-input bg-white h-full placeholder:tracking-wider hidden ltr:pl-12 rtl:pr-12 peer !block'}
                            onChange={(e: any) => setBufferSearch(e.target.value)}
                            onKeyDown={(e: any) => handleKeyPress(e)}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                        />
                        <button
                            type="button"
                            className='text-dark/70 absolute ltr:right-1 rtl:left-1 inset-y-0 my-auto w-9 h-9 p-0 flex items-center justify-center peer-focus:text-primary !ltr:!right-auto ltr:left-1 rtl:right-1'
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" >
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-8">
                        <DataTable
                            noRecordsText="No results match your search query"
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                            records={bufferSearchDataList}
                            columns={[
                                {
                                    accessor: '_id',
                                    title: '',
                                    render: (data) => (
                                        <SearchModuleItem
                                            isUnique={isUnique}
                                            item={data}
                                            viewType={viewType}
                                        />
                                    ),
                                },
                            ]}
                            totalRecords={totalCount}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratingSearchModule;