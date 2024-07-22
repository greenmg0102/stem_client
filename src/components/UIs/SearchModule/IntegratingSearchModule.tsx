import { useState, useEffect } from "react";
import { Checkbox } from 'antd';
import { DataTable } from 'mantine-datatable';
import SearchModuleItem from './SearchModuleItem'
import RealSearchItem from './RealSearchItem'
import clsx from 'clsx'

const IntegratingSearchModule = ({ setUnique, isUnique, setSortCondition, page, pageSize, PAGE_SIZES, isRealLoading, bufferSearchDataList, setBufferSearchDataList, setPage, totalCount, isLoading, setPageSize, recordsData, setSearchParameter, bufferSearch, setBufferSearch }: any) => {

    const [viewType, setViewType] = useState('list')
    // const [proccessedRecordsData, setRecordsData] = useState<any[]>([]);

    // useEffect(() => {
    //     // Function to find differences between two objects
    //     const findDifferences = (item1: any, item2: any): any => {
    //         const diff: any = {};

    //         // Compare each field and set to diff if different
    //         if (item1.credentialSchool._id !== item2.credentialSchool._id ||
    //             item1.credentialSchool.school !== item2.credentialSchool.school ||
    //             item1.credentialSchool.status !== item2.credentialSchool.status) {
    //             diff.credentialSchool = item2.credentialSchool;
    //         }

    //         if (item1.field._id !== item2.field._id ||
    //             item1.field.field !== item2.field.field ||
    //             item1.field.status !== item2.field.status) {
    //             diff.field = item2.field;
    //         }

    //         if (item1.credential._id !== item2.credential._id ||
    //             item1.credential.credential !== item2.credential.credential ||
    //             item1.credential.status !== item2.credential.status) {
    //             diff.credential = item2.credential;
    //         }

    //         if (item1.schoolOrg._id !== item2.schoolOrg._id ||
    //             item1.schoolOrg.name !== item2.schoolOrg.name ||
    //             item1.schoolOrg.address !== item2.schoolOrg.address ||
    //             item1.schoolOrg.city !== item2.schoolOrg.city ||
    //             item1.schoolOrg.zip !== item2.schoolOrg.zip ||
    //             item1.schoolOrg.neighborhood !== item2.schoolOrg.neighborhood ||
    //             item1.schoolOrg.status !== item2.schoolOrg.status) {
    //             diff.schoolOrg = item2.schoolOrg;
    //         }

    //         if (item1.schoolOrgType._id !== item2.schoolOrgType._id ||
    //             item1.schoolOrgType.type !== item2.schoolOrgType.type ||
    //             item1.schoolOrgType.status !== item2.schoolOrgType.status) {
    //             diff.schoolOrgType = item2.schoolOrgType;
    //         }

    //         if (item1.opportunity._id !== item2.opportunity._id ||
    //             item1.opportunity.opportunity !== item2.opportunity.opportunity ||
    //             item1.opportunity.status !== item2.opportunity.status) {
    //             diff.opportunity = item2.opportunity;
    //         }

    //         return diff;
    //     };

    //     // Update recordsData with the first unique diff added to each original item
    //     const updatedData: any[] = recordsData.map((record: any, index: any) => {
    //         let uniqueDiff: any = null;

    //         // Compare record with every other record
    //         for (let i = 0; i < recordsData.length; i++) {
    //             if (i !== index) {
    //                 const diff = findDifferences(record, recordsData[i]);
    //                 // Check if diff is not empty and hasn't been added already
    //                 if (Object.keys(diff).length > 0 && uniqueDiff === null) {
    //                     uniqueDiff = diff;
    //                 }
    //             }
    //         }

    //         return {
    //             ...record,
    //             diff: uniqueDiff,
    //         };
    //     });

    //     // Update state with recordsData including unique differences
    //     setRecordsData(updatedData);

    // }, [recordsData]);


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
                            <Checkbox onChange={(e: any) => setUnique(e.target.checked)} checked={isUnique}>Extracting Unique School</Checkbox>
                            <select
                                className="form-select text-white-dark w-[130px] mr-1"
                                onClick={(e: any) => setViewType(e.target.value)}
                            >
                                <option value={'list'}>List View</option>
                                <option value={'card'} disabled>Card View</option>
                                <option value={'map'} disabled>Map View</option>
                            </select>
                            <select
                                className="form-select text-white-dark w-[200px]"
                                onClick={(e: any) => setSortCondition(e.target.value)}
                            >
                                <option value={'credentialSchool.school:1'} className="flex justify-start items-center">
                                    School : A ~ Z

                                </option>
                                <option value={'credentialSchool.school:0'}>School : Z ~ A</option>
                                <option value={'credential.credential:1'}>Credential : A ~ Z</option>
                                <option value={'credential.credential:0'}>Credential : Z ~ A</option>
                                <option value={'opportunity.opportunity:1'}>Opportunity : A ~ Z</option>
                                <option value={'opportunity.opportunity:0'}>Opportunity : Z ~ A</option>
                                <option value={'generalfieldstudys.field:1'}>General Study : A ~ Z</option>
                                <option value={'generalfieldstudys.field:0'}>General Study : Z ~ A</option>
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
                    <div className="mt-0">
                        <DataTable
                            noRecordsText="No results match your search query"
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
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