import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import IntegratingSearchModule from '../components/UIs/SearchModule/IntegratingSearchModule';
import { setPageTitle } from '../store/themeConfigSlice';
import SearchFilter from '../pages/IntegrationSearch/SearchFilter';
import { integrationRead, realTiemintegrationRead } from '../api/user/integration';

const IntegrationSearch = () => {
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


    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Integration Search"}
                    description={""}
                />
                <div className='p-4 flex justify-between items-start flex-wrap pt-16 '>
                    <div className='w-full xl:w-[30%] p-2 mb-4'>
                        <SearchFilter
                            stemValue={stemValue}
                            setStemValue={(total: any) => bufferFilter(total)}
                        />
                    </div>
                    <div className='w-full xl:w-[70%] p-2 pt-0 border border-dashed border-gray-500 border-t-[0px] border-b-[0px] border-r-[0px]'>
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
    );
};

export default IntegrationSearch;
