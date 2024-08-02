import { useState, useEffect, useCallback } from 'react';
import { Alert, Drawer, message, Checkbox, Popconfirm } from 'antd';
import type { PopconfirmProps, CheckboxProps } from 'antd';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import SearchFilter from '../pages/IntegrationSearch/SearchFilter';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import { Definitions, BookMarkDefinitions } from './OpportunitiesExtract/Definitions'
import IntegratingSearchModule from '../components/UIs/SearchModule/IntegratingSearchModule';
import { integrationRead, realTiemintegrationRead } from '../api/user/integration';
import { bookmarkCreate, bookmarkRead } from '../api/user/bookmark';

import { groupListGet, credentialFromOpportunity, credentialFromOccupation, pathwayFromCredential, opportunutyFromPathway, occupationFromPathway } from '../api/user/groupBySearch';
import StemItemSearch from '../pages/Admin/ProgramSchool/StemComponent/StemItemSearch'
import { categroyCredential } from '../utils/categroyCredential'
import { useUser } from "@clerk/clerk-react";
import SearchByGroupModal from './searchByGroup/modal'


const imageList: any = {
    undefined: [],
    "Science, Technology, Engineering, and Math": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/science/1.jpg",
    ],
    "Arts, Audio/Video Technology and Communications": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/art/1.jpg",
    ],
    "Information Technology": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/2.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/3.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/4.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/5.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/6.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/7.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/8.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/information/9.jpg"
    ],
    "Architecture and Construction": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/architecture/32.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/architecture/33.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/architecture/34.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/architecture/35.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/architecture/36.jpg"
    ],
    "Manufacturing": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/24.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/25.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/26.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/27.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/28.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/29.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/30.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/manufacturing/31.jpg"
    ],
    "Transportation, Distribution and Logistics": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/transportation/37.png",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/transportation/38.png",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/transportation/39.png",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/transportation/40.png",
    ],
    "Agriculture, Food and Natural Resources": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/agriculture/1.jpg",
    ],
    "Health Science": [
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/10.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/11.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/12.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/13.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/14.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/15.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/16.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/17.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/18.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/19.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/20.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/21.jpg",
        "http://104.128.55.140:8000/uploads/assets/images/pathway/health/22.jpg"
    ]
}

export default function SearchByGroup() {

    const [messageApi, contextHolder] = message.useMessage();
    const { isSignedIn, user, isLoaded }: any = useUser();

    const [stemValue, setStemValue] = useState<any>({
        programSchoolOrg: [],
        programSchoolOrgType: [],
        credentialSchool: [],
        Opportunity: [],
        field: [],
        credential: [],
        areaStudy: [],
        educationLieve: [],
        applicantRequirementCredential: [],
        courseLink: "",
        opportunityLink: "",
        isUnique: false
    });

    const [checkable, setCheckable] = useState({
        opportunityCheck: true,
        credentialCheck: true,
        fieldCheck: true
    })

    const [loadingStatus, setLoadingStatus] = useState({
        opportunityCheck: false,
        credentialCheck: false,
        fieldCheck: false
    })

    const [isOpen, setIsOpen] = useState(undefined)

    const [specificFieldStudyList, setspecificFieldStudyList] = useState([])
    const [credentialList, setCredentialList] = useState([])
    const [pathwayList, setPathwayList] = useState([])

    const [bufferspecificFieldStudyList, setbufferspecificFieldStudyList] = useState<any>([])
    const [bufferPathwayList, setbufferPathwayList] = useState<any>([])
    const [bufferCredentialList, setbufferCredentialList] = useState<any>([])

    const [sortCondition, setSortCondition] = useState("credentialSchool.school:1")
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isRealLoading, setIsRealLoading] = useState<any>(null);

    const [recordsData, setRecordsData] = useState([]);
    const [bufferSearchDataList, setBufferSearchDataList] = useState<any>(null);

    const [searchParameter, setSearchParameter] = useState("");
    const [bufferSearch, setBufferSearch] = useState("");

    const [bookmark, setBookmark] = useState<any>([])
    const [open, setOpen] = useState(false);

    const onChangeCheck: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setStemValue({ ...stemValue, isUniqueSchool: e.target.checked })
    };

    useEffect(() => {
        if (credentialList.length > 0) {
            let result = categroyCredential(credentialList)
            // setbufferCredentialList(result)
        }
    }, [credentialList])

    useEffect(() => {

        async function fetchData() {

            let data = {
                type: 'search-by-group',
                userId: user.id,
            }

            let realCredential = await bookmarkRead(data)
            setBookmark(realCredential.result)

        }
        fetchData()

    }, [user])

    useEffect(() => {

        async function fetchData() {

            let result = await groupListGet()
            if (result.isOkay) {
                setPathwayList(result.result.generalFieldStudyList)
                setbufferPathwayList(result.result.generalFieldStudyList)

                setspecificFieldStudyList(result.result.specificFieldStudyList)
                // setbufferspecificFieldStudyList(result.result.specificFieldStudyList)

                setCredentialList(result.result.credentialList)
                // setbufferCredentialList(result.result.credentialList)
            }
        }
        fetchData()

    }, [])

    const handleSearch = useCallback(debounce(async (hint) => {
        setTotalCount(0)
        setBufferSearchDataList([])
        let data = { ...stemValue, page: page, pageSize: pageSize, searchParameter: hint, sortCondition: sortCondition };
        setIsLoading(true);
        setIsRealLoading(true);

        let result = await realTiemintegrationRead(data);

        setIsLoading(false);
        setIsRealLoading(false);

        if (result.isOkay) {
            setBufferSearchDataList(result.result);
            setRecordsData(result.result);
            setTotalCount(result.totalCount);
        }
    }, 800), [stemValue, page, pageSize, sortCondition]);

    useEffect(() => {
        if (stemValue.credential.length > 0) handleSearch(searchParameter);
    }, [stemValue, pageSize, page, searchParameter, handleSearch, sortCondition]);

    const bufferSearchHint = (hint: string) => {
        setBufferSearch(hint);
        handleSearch(hint);
    };

    const bufferGatherValue = async (type: string, valueList: any) => {
        if (type === "field") {

            setStemValue({ ...stemValue, field: valueList, credential: [], Opportunity: [] })
            setLoadingStatus({ ...loadingStatus, opportunityCheck: true })

            setspecificFieldStudyList([])
            setbufferspecificFieldStudyList([])
            setCredentialList([])
            setbufferCredentialList([])

            let result = await occupationFromPathway({
                data: valueList[0].value
            })

            if (result.isOkay) {
                setLoadingStatus({ ...loadingStatus, opportunityCheck: false })
                setspecificFieldStudyList(result.specificFieldStudyList)
                setbufferspecificFieldStudyList(result.specificFieldStudyList)
            }
            return
        }
        else if (type === "Opportunity") {
            setStemValue({ ...stemValue, Opportunity: valueList, credential: [] })
            setLoadingStatus({ ...loadingStatus, credentialCheck: true })

            setCredentialList([])
            setbufferCredentialList([])

            let result = await credentialFromOccupation({
                data: valueList[0].value
            })

            if (result.isOkay) {
                setLoadingStatus({ ...loadingStatus, credentialCheck: false })
                setCredentialList(result.credentialList)
                setbufferCredentialList(result.credentialList)
            }

            return
        } else if (type === "credential") {

            setStemValue({ ...stemValue, credential: valueList })
            // setLoadingStatus({ ...loadingStatus, fieldCheck: true })
            // let result = await pathwayFromCredential({
            //     opprtunity: stemValue.Opportunity && stemValue.Opportunity[0] && stemValue.Opportunity[0].value ? stemValue.Opportunity[0].value : null,
            //     credential: valueList[0].value,
            // })

            // if (result.isOkay) {
            //     setLoadingStatus({ ...loadingStatus, fieldCheck: false })
            //     setPathwayList(result.fieldList)
            //     setbufferPathwayList(result.fieldList)
            // }

            return
        }
    }

    const onchange = (type: any, e: any) => {
        if (type === "Opportunity") {
            let real = specificFieldStudyList.filter((item: any) => item.specificField.includes(e.target.value))
            setbufferspecificFieldStudyList(real)
        } else if (type === "field") {
            let real = pathwayList.filter((item: any) => item.field.includes(e.target.value))
            setbufferPathwayList(real)
        } else if (type === "credential") {
            let real = credentialList.filter((item: any) => item.credential.includes(e.target.value))
            let result = categroyCredential(real)
            console.log("result", result);
            setbufferCredentialList(result)
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {

        console.log("stemValue", stemValue);

        if (
            stemValue.field.length > 0 &&
            stemValue.Opportunity.length > 0 &&
            stemValue.credential.length > 0
        ) {
            let data = {
                type: 'search-by-group',
                userId: user.id,
                details: {
                    field: stemValue.field,
                    Opportunity: {
                        key: stemValue.Opportunity[0].key,
                        specificField: stemValue.Opportunity[0].label,
                        value: stemValue.Opportunity[0].key
                    },
                    credential: stemValue.credential,
                    bufferSearch: bufferSearch
                }
            }
            console.log("$$$$$", data);

            let result = await bookmarkCreate(data)

            if (result.isOkay) {
                messageApi.success('Okay, your bookmark was saved!');
            } else {
                messageApi.error('Plz set filtering option!');
            }
        } else {
            messageApi.info('Plz set filtering option!');
        }
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        message.error('You ignored the saving current search filter');
    };

    const insertBook = async (item: any) => {
        // setStemValue({
        //     ...stemValue,
        //     Opportunity: [{
        //         key: item.details.Opportunity.key,
        //         specificField: item.details.Opportunity.specificField,
        //         value: item.details.Opportunity.key
        //     }],
        //     credential: item.details.credential,
        //     field: item.details.field
        // })

        console.log(1);

        await bufferGatherValue("field", item.details.field)
        console.log(2);

        await bufferGatherValue("Opportunity", [
            {
                key: item.details.Opportunity._id,
                label: item.details.Opportunity.specificField,
                value: item.details.Opportunity._id
            }
        ])
        console.log(3);

        await bufferGatherValue("credential", item.details.credential)
        console.log(4);

        setSearchParameter(item.details.bufferSearch)
        setBufferSearch(item.details.bufferSearch)

    }

    const onCheck = (type: any, checked: any) => {
        if (type === "opportunityCheck" && checked === false) {
            console.log('type', type, "checked", checked);
            setStemValue({ ...stemValue, Opportunity: [], credential: [], field: [] })
        }
        setCheckable({ ...checkable, [type]: checked })
    }

    const onClose = () => {
        setOpen(false);
    };

    function formatDate(dateStr: any) {
        const dateObj = new Date(dateStr);

        const yy = String(dateObj.getUTCFullYear()).slice(-2);
        const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getUTCDate()).padStart(2, '0');
        const hh = String(dateObj.getUTCHours()).padStart(2, '0');
        const min = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const ss = String(dateObj.getUTCSeconds()).padStart(2, '0');

        return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (isSignedIn) {
        return (
            <div>
                {contextHolder}
                <Drawer title="Bookmark for Search By Group" onClose={onClose} open={open} width={700}>
                    {bookmark.length > 0 && bookmark.map((item: any, index: any) =>
                        <div
                            key={index}
                            className='border border-dashed border-gray-400 border-t-[0px] border-l-[0px] border-r-[0px] p-4 cursor-pointer hover:bg-gray-100'
                            onClick={() => insertBook(item)}
                        >
                            <div className='flex justify-start items-start'>
                                <p className='w-[90px] font-semibold'>
                                    Date
                                </p>
                                <p>: {formatDate(item && item.updatedAt)}</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <p className='w-[90px] font-semibold'>
                                    Pathway
                                </p>
                                <p>: {item && item.details && item.details.field && item.details.field[0] && item.details.field[0].label}</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <p className='w-[90px] font-semibold'>
                                    Occupation
                                </p>
                                <p>: {item && item.details && item.details.Opportunity && item.details.Opportunity.specificField}</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <p className='w-[90px] font-semibold'>
                                    Credential
                                </p>
                                <p>: {item && item.details && item.details.credential && item.details.credential[0] && item.details.credential[0].label}</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <p className='w-[90px] font-semibold'>
                                    Hint
                                </p>
                                <p>: {item && item.details && item.details.bufferSearch}</p>
                            </div>
                        </div>
                    )}
                </Drawer>
                <div className="pt-5">
                    {/* <SearchBanner
                        title={"Search By Group"}
                        description={""}
                    /> */}
                    <div className='flex justify-around items-center flex-wrap'>
                        <div className='w-full 2xl:w-[45%]'>
                            <Alert
                                message={<p>How to search for stem data by <span className='text-red-600 text-[18px] font-bold'>Group</span>?</p>}
                                description={
                                    <ul className='list-disc pl-5'>
                                        <li>The search is performed in the order <span className='text-blue-500 font-bold'>Pathway</span> &rarr; <span className='text-blue-500 font-bold'>Occupation</span> &rarr; <span className='text-blue-500 font-bold'>Credential</span>, and the final search result displays data containing all three search items.</li>
                                        <li>To find a unique school, check <span className='text-blue-500 font-bold'>Extracting Unique School</span> below. </li>
                                    </ul>}
                                type="info"
                                showIcon
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                            />
                        </div>
                    </div>

                    <SearchByGroupModal
                        isOpen={isOpen}
                        imageList={isOpen === undefined ? [] : imageList[isOpen]}
                        setIsOpen={(isOpen: any) => setIsOpen(isOpen)}
                    />
                    <div className='p-4 flex justify-between items-start flex-wrap pt-1'>
                        <div className='w-full flex justify-between items-start p-2 mb-4'>
                            <div className='w-1/3 p-1 mb-2 transition-all'>
                                <div className='flex justify-between items-center mb-1'>
                                    <div className='flex justify-start items-center'>
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="unordered-list" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
                                        <p className='mx-2 text-gray-600 font-bold mb-0'>Pathway</p>
                                        {loadingStatus.fieldCheck ?
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="text-red-500 animate-spin"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
                                            :
                                            null
                                        }
                                    </div>
                                    {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                    <label className="w-12 h-6 relative mt-2">
                                        {/* <input type="checkbox" checked={checkable.fieldCheck} onChange={(e: any) => onCheck("fieldCheck", e.target.checked)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span> */}
                                    </label>
                                </div>
                                <input type="text" placeholder="Some pathway..." className="mb-2 form-input" required onChange={(e: any) => onchange("field", e)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />

                                <div className="h-[80px] mb-8 font-semibold text-blue-600 text-[20px] flex justify-center items-center px-1 border border-red-500 rounded-[6px] border-dashed">
                                    {
                                        stemValue && stemValue.field[0] && stemValue.field[0].key &&
                                        bufferPathwayList.find((item: any) => item._id === stemValue.field[0].key).field
                                    }
                                </div>

                                <div className='h-32 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                    {bufferPathwayList.length > 0 && bufferPathwayList.map((item: any, index: any) =>
                                        <div
                                            key={index}
                                            className={clsx("px-1 h-[32px] transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-between items-center text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                                stemValue &&
                                                    stemValue.field[0] &&
                                                    item._id === stemValue.field[0].key ? "text-blue-500" : "",
                                                imageList[item.field] ? "" : "hidden"
                                            )}
                                        >

                                            <p
                                                className='pl-1'
                                                onClick={() => bufferGatherValue("field", [
                                                    {
                                                        key: item._id,
                                                        label: item.field,
                                                        value: item._id
                                                    }
                                                ])}
                                            >
                                                {item.field}
                                            </p>

                                            {imageList[item.field] ?
                                                <svg
                                                    className='mt-1 animated-box'
                                                    onClick={() => setIsOpen(item.field)}
                                                    viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1.4em" height="1.4em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
                                                :
                                                null
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='w-1/3 p-1 mb-2 transition-all'>
                                <div className='flex justify-between items-center mb-1'>
                                    <div className='flex justify-start items-center'>
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="group" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M912 820.1V203.9c28-9.9 48-36.6 48-67.9 0-39.8-32.2-72-72-72-31.3 0-58 20-67.9 48H203.9C194 84 167.3 64 136 64c-39.8 0-72 32.2-72 72 0 31.3 20 58 48 67.9v616.2C84 830 64 856.7 64 888c0 39.8 32.2 72 72 72 31.3 0 58-20 67.9-48h616.2c9.9 28 36.6 48 67.9 48 39.8 0 72-32.2 72-72 0-31.3-20-58-48-67.9zM888 112c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zM136 912c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-752c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm704 680H184V184h656v656zm48 72c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"></path><path d="M288 474h448c8.8 0 16-7.2 16-16V282c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64zm-56 420h448c8.8 0 16-7.2 16-16V566c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64z"></path></svg>
                                        <p className='mx-2 text-gray-600 font-bold mb-0'>Occupation</p>
                                        {loadingStatus.opportunityCheck ?
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="text-red-500 animate-spin"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
                                            :
                                            null
                                        }
                                    </div>
                                    {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                    <label className="w-12 h-6 relative mt-2">
                                        {/* <input type="checkbox" checked={checkable.opportunityCheck} onChange={(e: any) => onCheck("opportunityCheck", e.target.checked)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span> */}
                                    </label>
                                </div>

                                <input type="text" placeholder="Some opportunity..." className="mb-2 form-input" required onChange={(e: any) => onchange("Opportunity", e)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />
                                <div className="h-[80px] mb-8 font-semibold text-blue-600 text-[20px] flex justify-center items-center px-1 border border-red-500 rounded-[6px] border-dashed">
                                    {
                                        stemValue && stemValue.Opportunity[0] && stemValue.Opportunity[0].key &&
                                        bufferspecificFieldStudyList.find((item: any) => item._id === stemValue.Opportunity[0].key).specificField
                                    }
                                </div>
                                <div className='h-32 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                    {checkable.opportunityCheck === true && bufferspecificFieldStudyList.length > 0 && bufferspecificFieldStudyList.map((item: any, index: any) =>
                                        <div
                                            key={index}
                                            className={clsx("px-1 transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start items-center text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                                stemValue &&
                                                    stemValue.Opportunity[0] &&
                                                    item._id === stemValue.Opportunity[0].key ? "text-blue-500" : ""
                                            )}
                                            onClick={() => bufferGatherValue("Opportunity", [
                                                {
                                                    key: item._id,
                                                    label: item.specificField,
                                                    value: item._id
                                                }
                                            ])}
                                        >
                                            {item.specificField}
                                            {
                                                Definitions.find((each: any) => each.title === item.opportunity) ?
                                                    <Tippy content={Definitions.find((each: any) => each.title === item.opportunity)?.description}>
                                                        <svg className='ml-1' viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
                                                    </Tippy>
                                                    :
                                                    null

                                            }
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='w-1/3 p-1 mb-2 transition-all'>
                                <div className='flex justify-between items-center mb-1'>
                                    <div className='flex justify-start items-center'>
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-32.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg>
                                        <p className='mx-2 text-gray-600 font-bold mb-0'>Credential</p>
                                        {loadingStatus.credentialCheck ?
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="text-red-500 animate-spin"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
                                            :
                                            null
                                        }
                                    </div>
                                    {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                    <label className="w-12 h-6 relative mt-2">
                                        {/* <input type="checkbox" checked={checkable.credentialCheck} onChange={(e: any) => onCheck("credentialCheck", e.target.checked)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span> */}
                                    </label>
                                </div>
                                <input type="text" placeholder="Some credentia..." className="mb-2 form-input" required onChange={(e: any) => onchange("credential", e)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} />

                                <div className="h-[80px] mb-8 font-semibold text-blue-600 text-[20px] flex justify-center items-center px-1 border border-red-500 rounded-[6px] border-dashed">
                                    {stemValue && stemValue.credential[0] && stemValue.credential[0].label}
                                </div>

                                <div className='h-32 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                    {bufferCredentialList.length > 0 && bufferCredentialList.map((item: any, index: any) =>
                                        <div key={index}>
                                            {item && item.list ?
                                                <div>
                                                    <div
                                                        key={index}
                                                        className={clsx("flex justify-start transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start  text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                                            stemValue &&
                                                                stemValue.credential[0] &&
                                                                item._id === stemValue.credential[0].key ? "text-blue-500" : ""
                                                        )}
                                                        onClick={() => bufferGatherValue("credential", [
                                                            {
                                                                key: item._id,
                                                                label: item.credential,
                                                                value: item._id
                                                            }
                                                        ])}
                                                    >
                                                        <svg className='mt-[5px]' viewBox="64 64 896 896" focusable="false" data-icon="plus" width="0.8em" height="0.8em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
                                                        <p className='w-[calc(100%-0.8em)] pl-1'>
                                                            {item.credential}
                                                        </p>
                                                    </div>
                                                    {
                                                        item.list.map((each: any, order: any) =>
                                                            <div
                                                                key={index + ":" + order}
                                                                className={clsx("pl-2 flex justify-start transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start  text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                                                    stemValue &&
                                                                        stemValue.credential[0] &&
                                                                        each._id === stemValue.credential[0].key ? "text-blue-500" : ""
                                                                )}
                                                                onClick={() => bufferGatherValue("credential", [
                                                                    {
                                                                        key: each._id,
                                                                        label: each.credential,
                                                                        value: each._id
                                                                    }
                                                                ])}
                                                            >
                                                                {/* <svg className='mt-[5px]' viewBox="64 64 896 896" focusable="false" data-icon="minus" width="0.8em" height="0.8em" fill="currentColor" aria-hidden="true"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg> */}
                                                                <p className='w-[calc(100%-1em)] pl-1'>
                                                                    {each.credential}
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                :
                                                <div
                                                    key={index}
                                                    className={clsx("flex justify-start  transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                                        stemValue &&
                                                            stemValue.credential[0] &&
                                                            item._id === stemValue.credential[0].key ? "text-blue-500" : ""
                                                    )}
                                                    onClick={() => bufferGatherValue("credential", [
                                                        {
                                                            key: item._id,
                                                            label: item.credential,
                                                            value: item._id
                                                        }
                                                    ])}
                                                >
                                                    <svg className='mt-[5px]' viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                                                    <p className='w-[calc(100%-1em)] pl-1'>
                                                        {item.credential}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-start items-center pt-1 px-4'>
                                <Popconfirm
                                    title="Bookmark?"
                                    description="Save the current search filter?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <div
                                        className="btn btn-primary btn-sm cursor-pointer"
                                    >
                                        <p className='pr-2'>
                                            Search Filter Bookmark
                                        </p>
                                        <Tippy content={BookMarkDefinitions.find((each: any) => each.title === "searchBookMark")?.description}>
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
                                        </Tippy>
                                    </div>
                                </Popconfirm>
                                <div
                                    className="btn btn-success btn-sm cursor-pointer mx-2"
                                    onClick={() => setOpen(true)}
                                >
                                    Bookmark view
                                </div>
                                {/* <Checkbox onChange={onChangeCheck}>Extracting School list</Checkbox> */}
                            </div>
                        </div>
                        <div className='w-full p-2 pt-4'>
                            <IntegratingSearchModule
                                setUnique={(bool: any) => setStemValue({ ...stemValue, isUnique: bool })}
                                isUnique={stemValue.isUnique}

                                page={page}
                                pageSize={pageSize}
                                isLoading={isLoading}
                                PAGE_SIZES={PAGE_SIZES}
                                totalCount={totalCount}
                                recordsData={recordsData}
                                bufferSearch={bufferSearch}
                                isRealLoading={isRealLoading}
                                sortCondition={sortCondition}
                                bufferSearchDataList={bufferSearchDataList}
                                setPage={(page: any) => setPage(page)}
                                setPageSize={(value: any) => setPageSize(value)}
                                setBufferSearch={(value: any) => bufferSearchHint(value)}
                                setSortCondition={(total: any) => setSortCondition(total)}
                                setBufferSearchDataList={(value: any) => setBufferSearchDataList(value)}
                                setSearchParameter={(parameter: any) => setSearchParameter(parameter)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Please sign in to view this page.</div>;
    }
}