
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import ProgramSchoolModal from './ProgramSchoolModal'

import { programSchoolOrgRead, programSchoolOrgDelete, programSchoolOrgUpdate } from '../../../../api/admin/programSchool/program'

const ProgramSchool = () => {

    const [typeResult, setTypeResult] = useState([]);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [typeModal, setTypeModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let result = await programSchoolOrgRead()
            setTypeResult(result)
        }
        fetchData()
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const statusBadge: any = {
        0: <span className="badge badge-outline-warning">Waiting</span>,
        1: <span className="badge badge-outline-secondary">Agreed</span>,
        2: <span className="badge badge-outline-danger">Rejected</span>,
    }

    const updateItem = async (id: any, status: any) => {
        const data = { id: id, status: status }
        let result = await programSchoolOrgUpdate(data)
        if (result.isOkay) setTypeResult(result.result)
    }

    const deleteItem = async (id: any) => {
        const data = { id: id }
        let result = await programSchoolOrgDelete(data)
        if (result.isOkay) setTypeResult(result.result)
    }

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-4">Program School / Org Type</h5>
                <div className="flex items-start justify-between mb-5">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setTypeModal(!typeModal)}
                    >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
                        <p className='ml-2'>Create</p>
                    </button>
                    <ProgramSchoolModal
                        typeModal={typeModal}
                        setTypeResult={(result: any) => setTypeResult(result)}
                        setTypeModal={(isTrue: boolean) => setTypeModal(isTrue)}
                    />
                </div>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={typeResult.slice(0, pageSize)}
                        columns={[
                            { accessor: 'name', title: 'School /Org Name' },
                            { accessor: 'address', title: 'School /Org address' },
                            { accessor: 'city', title: 'School /Org city' },
                            { accessor: 'zip', title: 'School /Org zip' },
                            { accessor: 'neighborhood', title: 'School /Org Neighborhood' },
                            {
                                accessor: 'createdAt', title: 'Created Date',
                                render: ({ createdAt }: any) => (
                                    <div
                                        className='cursor-pointer'
                                    >
                                        {createdAt.slice(0, 10)}
                                    </div>
                                )
                            },
                            // {
                            //     accessor: 'status',
                            //     title: 'Status',
                            //     render: ({ _id, status }) => (
                            //         <div className='flex justify-around items-center'>
                            //             <div className="dropdown">
                            //                 <Dropdown
                            //                     placement='bottom-end'
                            //                     btnClassName="btn btn-sm dropdown-toggle"
                            //                     button={
                            //                         <>
                            //                             {statusBadge[status]}
                            //                             <span>
                            //                                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                                     <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            //                                 </svg>
                            //                             </span>
                            //                         </>
                            //                     }
                            //                 >
                            //                     <ul className="!min-w-[100px]">
                            //                         {[1, 2].map((item: any, index: any) =>
                            //                             <li key={index}>
                            //                                 <button type="button" onClick={() => updateItem(_id, item)}>{statusBadge[item]}</button>
                            //                             </li>
                            //                         )}
                            //                     </ul>
                            //                 </Dropdown>
                            //             </div>
                            //             <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteItem(_id)}>Delete</button>
                            //         </div>
                            //     )
                            // }
                        ]}
                        totalRecords={typeResult.length}
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
    );
};

export default ProgramSchool;