
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import OpportunityModal from './OpportunityModal'

import { opportunityRead, opportunityDelete } from '../../../../api/admin/opportunity'

const Opportunity = () => {

    const [typeResult, setTypeResult] = useState([]);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [typeModal, setTypeModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let result = await opportunityRead()
            setTypeResult(result)
        }
        fetchData()
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const deleteItem = async (id: any) => {
        const data = { id: id }
        let result = await opportunityDelete(data)
        if (result.isOkay) setTypeResult(result.result)
    }

    return (
        <div>
            <div>
                <div className="panel mt-6">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-4">Opportunity</h5>
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
                        <OpportunityModal
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
                                { accessor: 'opportunity', title: 'Opportunity' },
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
                                //         <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteItem(_id)}>Delete</button>
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
        </div>
    );
};

export default Opportunity;