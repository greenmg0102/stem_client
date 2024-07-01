import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import Dropdown from '../../../../components/Dropdown';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { stemRead } from '../../../../api/admin/stem'
import StemModal from './StemModal'


import org from './org.txt'
import city from './city.txt'
import address from './address.txt'
import zip from './zip.txt'
import neighborhood from './neighborhood.txt'


import Opportunity from './tempData.txt'
import ProgramSchoolOrg from './tempData1.txt'
import ProgramSchoolOrgType from './tempData2.txt'
import CredentialsSchool from './tempData3.txt'
import SpecificAreaofStudy from './tempData4.txt'
import GeneralFieldofStudy from './tempData5.txt'
import CourseList from './tempData6.txt'
import Credential from './tempData7.txt'
import EducationLevel from './tempData8.txt'
import ApplicantRequirementCredential from './tempData9.txt'
import Age from './tempData10.txt'
import OpportunityLink from './tempData11.txt'

const ColumnChooser = () => {

    useEffect(() => {
        async function fetchData() {

            // let orgData: any = await fetch(org)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let cityData: any = await fetch(city)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let addressData: any = await fetch(address)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let zipData: any = await fetch(zip)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let neighborhoodData: any = await fetch(neighborhood)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })


            // let arrayResult1: any = await fetch(ProgramSchoolOrg)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })
            // let arrayResult2: any = await fetch(ProgramSchoolOrgType)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })
            // let arrayResult3: any = await fetch(CredentialsSchool)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })
            // let arrayResult4: any = await fetch(SpecificAreaofStudy)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })
            // let arrayResult5: any = await fetch(GeneralFieldofStudy)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult6: any = await fetch(CourseList)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult7: any = await fetch(Credential)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult8: any = await fetch(EducationLevel)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult9: any = await fetch(ApplicantRequirementCredential)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult10: any = await fetch(Age)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })

            // let arrayResult11: any = await fetch(OpportunityLink)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })


            // let arrayResult: any = await fetch(Opportunity)
            //     .then(response => response.text())
            //     .then((data: any) => {
            //         const lines = data.split('\n');
            //         const cleanedLines = lines.map((line: any) => line.trim()).filter((line: any) => line !== '');
            //         return cleanedLines
            //     })
            // // console.log(arrayResult1.length, arrayResult2.length, arrayResult3.length, arrayResult4.length, arrayResult5.length);

            // let buffer: any = []

            // for (let i = 0; i < arrayResult1.length; i++) {
            //     //     // buffer.push([arrayResult1[i], "Address", "City", "Zip COde", "Neighborhood"])
            //     // buffer.push([orgData[i], addressData[i], cityData[i], zipData[i], neighborhoodData[i]])
            //     buffer.push([arrayResult1[i], arrayResult2[i], arrayResult3[i], arrayResult4[i], arrayResult5[i], arrayResult6[i], arrayResult7[i], arrayResult8[i], arrayResult9[i], arrayResult10[i], arrayResult11[i], arrayResult[i]])
            // }

            // console.log("buffer.length", buffer.length);


            // let uniqueResult = buffer.filter((arr: any, index: any) => {
            //     return (
            //         index ===
            //         buffer.findIndex(
            //             (innerArr: any) => JSON.stringify(innerArr) === JSON.stringify(arr)
            //         )
            //     );
            // });

            // console.error('uniqueArray:', uniqueResult);

            // const uniqueArray = [...new Set(uniqueResult)];

            // console.log("uniqueArray", uniqueResult.length); // Output: [1, 2, 3]
            // const lines = fileContents.split('\n');
            // const cleanedLines = lines.map(line => line.trim()).filter(line => line !== '');
            // console.log(cleanedLines);


            // let result = await stemRead({ list: buffer.slice(3400, 3583) })
            let result = await stemRead({})
            if (result.isOkay) setTypeResult(result.result)

        }
        fetchData()

    }, []);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [typeResult, setTypeResult] = useState([]);
    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(typeResult, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [typeModal, setTypeModal] = useState(false);


    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        // { accessor: 'id', title: 'ID' },
        { accessor: 'schoolOrg.name', title: 'Program School / Org' },
        { accessor: 'schoolOrgType.type', title: 'Program School / Org Type' },
        { accessor: 'credentialSchool.school', title: 'School' },
        { accessor: 'field.field', title: 'Manufacturing' },
        { accessor: 'opportunity.opportunity', title: 'Opportunity' },
        { accessor: 'credential.credential', title: 'Credential' },
        // { accessor: 'lastName', title: 'Last Name' },
        // { accessor: 'email', title: 'Email' },
        // { accessor: 'phone', title: 'Phone' },
        // { accessor: 'company', title: 'Company' },
        // { accessor: 'address.street', title: 'Address' },
        // { accessor: 'age', title: 'Age' },
        // { accessor: 'dob', title: 'Birthdate' },
        // { accessor: 'isActive', title: 'Active' },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return typeResult.filter((item) => {
    //             return (
    //                 item.id.toString().includes(search.toLowerCase()) ||
    //                 item.firstName.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.lastName.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.company.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.email.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
    //                 item.dob.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.phone.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    // }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    // console.log("typeResult", typeResult);


    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light">STEM Exposure Programs</h5>
                <div className="flex justify-between mb-5 gap-5">
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark w-[250px]"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={!hideCols.includes(col.accessor)}
                                                                className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                                onChange={(event: any) => {
                                                                    setHideCols(event.target.value);
                                                                    showHideColumns(col.accessor, event.target.checked);
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setTypeModal(!typeModal)}
                    >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
                        <p className='ml-2'>Create</p>
                    </button>
                    <StemModal
                        typeModal={typeModal}
                        setTypeResult={(result: any) => setTypeResult(result)}
                        setTypeModal={(isTrue: boolean) => setTypeModal(isTrue)}
                    />
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={typeResult}
                        columns={[
                            // { accessor: 'id', title: 'ID', sortable: true, hidden: hideCols.includes('id') },
                            {
                                accessor: 'schoolOrg.name',
                                title: 'Program School Org',
                                sortable: true,
                                hidden: hideCols.includes('schoolOrg.name'),
                            },
                            {
                                accessor: 'schoolOrgType.type',
                                title: 'Program School / Org Type',
                                sortable: true,
                                hidden: hideCols.includes('schoolOrgType.type'),
                            },
                            {
                                accessor: 'credentialSchool.school',
                                title: 'School',
                                sortable: true,
                                hidden: hideCols.includes('credentialSchool.school'),
                            },
                            {
                                accessor: 'field.field',
                                title: 'Manufacturing',
                                sortable: true,
                                hidden: hideCols.includes('field.field'),
                            },
                            {
                                accessor: 'opportunity.opportunity',
                                title: 'Opportunity',
                                sortable: true,
                                hidden: hideCols.includes('opportunity.opportunity'),
                            },
                            {
                                accessor: 'credential.credential',
                                title: 'Credential',
                                sortable: true,
                                hidden: hideCols.includes('credential.credential'),
                            }
                            // {
                            //     accessor: 'lastName',
                            //     title: 'Last Name',
                            //     sortable: true,
                            //     hidden: hideCols.includes('lastName'),
                            // },
                            // { accessor: 'email', title: 'Email', sortable: true, hidden: hideCols.includes('email') },
                            // { accessor: 'phone', title: 'Phone', sortable: true, hidden: hideCols.includes('phone') },
                            // {
                            //     accessor: 'company',
                            //     title: 'Company',
                            //     sortable: true,
                            //     hidden: hideCols.includes('company'),
                            // },
                            // {
                            //     accessor: 'address.street',
                            //     title: 'Address',
                            //     sortable: true,
                            //     hidden: hideCols.includes('address.street'),
                            // },
                            // {
                            //     accessor: 'age',
                            //     title: 'Age',
                            //     sortable: true,
                            //     hidden: hideCols.includes('age'),
                            // },
                            // {
                            //     accessor: 'dob',
                            //     title: 'Birthdate',
                            //     sortable: true,
                            //     hidden: hideCols.includes('dob'),
                            //     render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            // },
                            // {
                            //     accessor: 'isActive',
                            //     title: 'Active',
                            //     sortable: true,
                            //     hidden: hideCols.includes('isActive'),
                            //     render: ({ isActive }) => <div className={`${isActive ? 'text-success' : 'text-danger'} capitalize`}>{isActive.toString()}</div>,
                            // },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
