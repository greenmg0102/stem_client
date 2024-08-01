import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'antd';
import debounce from 'lodash/debounce';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import OpportunityListModule from './OpportunitiesExtract/OpportunityList';
import { setPageTitle } from '../store/themeConfigSlice';
import OpportunityFilter from './OpportunitiesExtract/OpportunityFilter';
import { stemAccordingtoOpportunityRead } from '../api/user/opportunity';
import { useUser } from "@clerk/clerk-react";

const OpportunitiesExtract = () => {

    const { isSignedIn, user, isLoaded } = useUser();
    const dispatch = useDispatch();

    const [stemValue, setStemValue] = useState<any>({
        Opportunity: undefined,
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

    const handleSearch = useCallback(
        debounce(async (hint) => {
            let data = { ...stemValue, page: page, pageSize: pageSize, searchParameter: hint, sortCondition: sortCondition };
            setIsLoading(true);
            let result = await stemAccordingtoOpportunityRead(data);
            setIsLoading(false);

            if (result.isOkay) {
                setRecordsData(result.result);
                setTotalCount(result.totalCount);
            }
        }, 800),
        [stemValue, page, pageSize, sortCondition]
    );

    useEffect(() => {
        let data = {
            ...stemValue,
            page: page,
            pageSize: pageSize,
            searchParameter: searchParameter,
            sortCondition: sortCondition
        };

        async function fetchData() {
            setTotalCount(0)
            setRecordsData([])

            setIsLoading(true);
            let result = await stemAccordingtoOpportunityRead(data);

            console.log("result", result);

            setIsLoading(false);

            if (result.isOkay) {
                setRecordsData(result.result);
                setTotalCount(result.totalCount);
            }
        }

        if (searchParameter !== "") {
            handleSearch(searchParameter);
        } else {
            fetchData();
        }
    }, [stemValue, pageSize, page, searchParameter, handleSearch, sortCondition]);

    const bufferSearchHint = (hint: string) => {
        setBufferSearch(hint);
        setSearchParameter(hint);
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
                                message={<p>How can I search all the data by <span className='text-red-600 text-[18px] font-bold'>Opportunity</span>?</p>}
                                description={
                                    <p>
                                        Sort by the type of  <span className='text-blue-500 font-bold'>Opportunity</span> such as Apprenticeship, Dual Enrollment, etc.
                                    </p>
                                }
                                type="info"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
                                showIcon
                            />
                        </div>
                    </div>
                    <div className='p-4 flex justify-between items-start flex-wrap pt-16 '>
                        <div className='w-full p-2 mb-4'>
                            <OpportunityFilter
                                opportunityString={stemValue.Opportunity}
                                setStemValue={(value: any) => bufferFilter({ ...stemValue, Opportunity: value })}
                            />
                        </div>
                        <div className='w-full p-2 pt-0 transition-all '>
                            <OpportunityListModule

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

export default OpportunitiesExtract;
