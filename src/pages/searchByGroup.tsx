import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import SearchFilter from '../pages/IntegrationSearch/SearchFilter';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import { Definitions } from './OpportunitiesExtract/Definitions'
import IntegratingSearchModule from '../components/UIs/SearchModule/IntegratingSearchModule';
import { integrationRead, realTiemintegrationRead } from '../api/user/integration';
import { groupListGet } from '../api/user/groupBySearch';
import StemItemSearch from '../pages/Admin/ProgramSchool/StemComponent/StemItemSearch'

export default function SearchByGroup() {

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
    });

    const [opportunityList, setOpportunityList] = useState([])
    const [credentialList, setCredentialList] = useState([])
    const [pathwayList, setPathwayList] = useState([])

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

    useEffect(() => {

        async function fetchData() {
            let result = await groupListGet()
            if (result.isOkay) {
                setOpportunityList(result.result.opportunityList)
                setCredentialList(result.result.credentialList)
                setPathwayList(result.result.generalFieldStudyList)
            }
        }
        fetchData()

    }, [])

    const handleSearch = useCallback(debounce(async (hint) => {
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
        handleSearch(searchParameter);
    }, [stemValue, pageSize, page, searchParameter, handleSearch, sortCondition]);

    const bufferSearchHint = (hint: string) => {
        setBufferSearch(hint);
        handleSearch(hint);
    };

    const bufferGatherValue = (type: string, valueList: any) => {

        if (type === "Opportunity") {
            setStemValue({ ...stemValue, [type]: valueList, credential: [], field: [] })
        } else if (type === "credential") {
            setStemValue({ ...stemValue, [type]: valueList, field: [] })
        } else if (type === "field") {
            setStemValue({ ...stemValue, [type]: valueList })
        }
    }

    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Search By Group"}
                    description={""}
                />
                <div className='p-4 flex justify-between items-start flex-wrap pt-16 '>
                    <div className='w-full xl:w-1/2 flex justify-between items-start p-2 mb-4'>
                        <div className='w-1/3 p-1 mb-2 transition-all'>
                            <div className='flex justify-between items-center mb-1'>
                                <div className='flex justify-start items-center'>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="group" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M912 820.1V203.9c28-9.9 48-36.6 48-67.9 0-39.8-32.2-72-72-72-31.3 0-58 20-67.9 48H203.9C194 84 167.3 64 136 64c-39.8 0-72 32.2-72 72 0 31.3 20 58 48 67.9v616.2C84 830 64 856.7 64 888c0 39.8 32.2 72 72 72 31.3 0 58-20 67.9-48h616.2c9.9 28 36.6 48 67.9 48 39.8 0 72-32.2 72-72 0-31.3-20-58-48-67.9zM888 112c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zM136 912c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-752c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm704 680H184V184h656v656zm48 72c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"></path><path d="M288 474h448c8.8 0 16-7.2 16-16V282c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64zm-56 420h448c8.8 0 16-7.2 16-16V566c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64z"></path></svg>
                                    <p className='ml-2 text-gray-600 font-bold mb-0'>Opportunity</p>
                                </div>
                                {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                <label className="w-12 h-6 relative mt-2">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <input type="text" placeholder="Some opportunity..." className="mb-2 form-input" required />

                            <div className='h-64 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                {opportunityList.length > 0 && opportunityList.map((item: any, index: any) =>
                                    <div
                                        key={index}
                                        className={clsx("transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start items-center text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                            stemValue &&
                                                stemValue.Opportunity[0] &&
                                                item._id === stemValue.Opportunity[0].key ? "text-blue-500" : ""
                                        )}
                                        onClick={() => bufferGatherValue("Opportunity", [
                                            {
                                                key: item._id,
                                                label: "",
                                                value: item._id
                                            }
                                        ])}
                                    >
                                        {item.opportunity}
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
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg>
                                    <p className='ml-2 text-gray-600 font-bold mb-0'>Credential</p>
                                </div>
                                {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                <label className="w-12 h-6 relative mt-2">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <input type="text" placeholder="Some credentia..." className="mb-2 form-input" required />

                            <div className='h-64 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                {credentialList.length > 0 && credentialList.map((item: any, index: any) =>
                                    <div
                                        key={index}
                                        className={clsx("transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start items-center text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                            stemValue &&
                                                stemValue.credential[0] &&
                                                item._id === stemValue.credential[0].key ? "text-blue-500" : ""
                                        )}
                                        onClick={() => bufferGatherValue("credential", [
                                            {
                                                key: item._id,
                                                label: "",
                                                value: item._id
                                            }
                                        ])}
                                    >
                                        {item.credential}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-1/3 p-1 mb-2 transition-all'>
                            <div className='flex justify-between items-center mb-1'>
                                <div className='flex justify-start items-center'>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="unordered-list" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
                                    <p className='ml-2 text-gray-600 font-bold mb-0'>Pathway</p>
                                </div>
                                {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="0.7em" height="0.7em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg> */}
                                <label className="w-12 h-6 relative mt-2">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <input type="text" placeholder="Some pathway..." className="mb-2 form-input" required />

                            <div className='h-64 overflow-y-scroll border rounded-[4px] border-gray-300 p-[2px]'>
                                {pathwayList.length > 0 && pathwayList.map((item: any, index: any) =>
                                    <div
                                        key={index}
                                        className={clsx("transition-all cursor-pointer hover:text-blue-500 font-semibold flex justify-start items-center text-[12px] py-1 border border-dashed border-gray-400 border-t-[0px] border-r-[0px] border-l-[0px]",
                                            stemValue &&
                                                stemValue.field[0] &&
                                                item._id === stemValue.field[0].key ? "text-blue-500" : ""
                                        )}
                                        onClick={() => bufferGatherValue("field", [
                                            {
                                                key: item._id,
                                                label: "",
                                                value: item._id
                                            }
                                        ])}
                                    >
                                        {item.field}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full xl:w-1/2 p-2 pt-0 border border-dashed border-gray-500 border-t-[0px] border-b-[0px] border-r-[0px]'>
                        <IntegratingSearchModule
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
}