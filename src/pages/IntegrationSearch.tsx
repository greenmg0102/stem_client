import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'antd';
import debounce from 'lodash/debounce';
import IntegratingSearchModule from '../components/UIs/SearchModule/IntegratingSearchModule';
import { setPageTitle } from '../store/themeConfigSlice';
import SearchFilter from '../pages/IntegrationSearch/SearchFilter';
import { integrationRead, realTiemintegrationRead } from '../api/user/integration';
import { useUser } from "@clerk/clerk-react";

const IntegrationSearch = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    const dispatch = useDispatch();

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
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        dispatch(setPageTitle('IntegrationSearch'));
    }, [dispatch]);

    const bufferFilter = (total: any) => {
        setStemValue(total);
        setPage(1);
        setPageSize(PAGE_SIZES[0]);
    };

    const handleSearch = useCallback(debounce(async (hint) => {

        setTotalCount(0)
        setBufferSearchDataList([])

        let data = { ...stemValue, page: page, pageSize: pageSize, searchParameter: hint, sortCondition: sortCondition };
        setIsLoading(true);
        setIsRealLoading(true);

        let result = await realTiemintegrationRead(data);

        console.log('result', result);

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

    if (!isLoaded) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    if (isSignedIn) {
        return (
            <div>
                <div className="pt-5">
                    <div className='flex justify-around items-center flex-wrap'>
                        <div className='w-full 2xl:w-[45%]'>
                            <Alert
                                message={<p>How can I search all the data in an <span className='text-red-600 text-[18px] font-bold'>Integrated way</span>?</p>}
                                description={
                                    <ul className='list-disc pl-5'>
                                        <li>Search opportunities by <span className='text-blue-500 font-bold'>Name of school or organization</span>.</li>
                                        <li>Enter a specific name of <span className='text-blue-500 font-bold'>Credentials</span> you're looking for. </li>
                                        <li>Search for <span className='text-blue-500 font-bold'>Pathways</span>  related to a specific interest area such as Finance or Health Science.  </li>
                                    </ul>
                                }
                                type="info"
                                showIcon
                            />
                        </div>
                    </div>
                    <div className='p-4 flex justify-between items-start flex-wrap pt-16 '>
                        <div className='w-full xl:w-[30%] p-2 mb-4'>
                            <SearchFilter
                                stemValue={stemValue}
                                setStemValue={(total: any) => bufferFilter(total)}
                            />
                        </div>
                        <div className='w-full xl:w-[70%] p-2 pt-0 '>
                            <IntegratingSearchModule

                                isUnique={stemValue.isUnique}
                                setUnique={(bool: any) => setStemValue({ ...stemValue, isUnique: bool })}

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
        );
    } else {
        return <div>Please sign in to view this page.</div>;
    }


};

export default IntegrationSearch;
