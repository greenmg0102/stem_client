import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import CredentialExtractListModule from './CredentialExtract/CredentialExtractList';
import { setPageTitle } from '../store/themeConfigSlice';
import CredentialExtractFilter from './CredentialExtract/CredentialExtractFilter'
import { stemAccordingtoOpportunityRead } from '../api/user/opportunity'

const CredentialExtract = () => {

    const dispatch = useDispatch();

    const [stemValue, setStemValue] = useState<any>({
        Opportunity: undefined
    });

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isRealLoading, setIsRealLoading] = useState<any>(null);

    const [recordsData, setRecordsData] = useState([]);
    const [bufferSearchDataList, setBufferSearchDataList] = useState<any>(null);

    const [searchParameter, setSearchParameter] = useState("")
    const [bufferSearch, setBufferSearch] = useState("")

    useEffect(() => { setPage(1); }, [pageSize]);

    useEffect(() => {

        let data = {
            ...stemValue,
            page: page,
            pageSize: pageSize,
            searchParameter: searchParameter
        }

        if (searchParameter !== "") handleSearch(searchParameter);

        async function fetchData() {

            setIsLoading(true)
            let result = await stemAccordingtoOpportunityRead(data)
            setIsLoading(false)

            if (result.isOkay) {
                setRecordsData(result.result)
                setTotalCount(result.totalCount)
            }
        }
        fetchData()

    }, [stemValue, pageSize, page, searchParameter])

    useEffect(() => {
        dispatch(setPageTitle('IntegrationSearch'));
    });

    const bufferFilter = (total: any) => {
        setStemValue(total)
        setPage(1)
        setPageSize(PAGE_SIZES[0])
    }

    const handleSearch = debounce((hint: string) => {

        let data = { ...stemValue, page: 1, pageSize: 10, searchParameter: hint }

        async function fetchData() {

            // setIsRealLoading(true)
            // let result = await realTiemintegrationRead(data)
            // setIsRealLoading(false)

            // if (result.isOkay) {
            //     setBufferSearchDataList(result.result)
            // }
        }
        fetchData()

    }, 800);

    const bufferSearchHint = (hint: string) => {
        setBufferSearch(hint);
        handleSearch(hint);
    };

    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"Stem Data Extractiong According to the Credential"}
                    description={""}
                />
                <div className='p-4 flex justify-between items-start flex-wrap'>
                    <div className='w-full xl:w-[30%] p-2 mb-4 pt-16'>
                        <CredentialExtractFilter
                            opportunityString={stemValue.Opportunity}
                            setStemValue={(value: any) => setStemValue({ ...stemValue, Opportunity: value })}
                        />
                    </div>
                    <div className='w-full xl:w-[70%] p-2'>
                        <CredentialExtractListModule
                            page={page}
                            pageSize={pageSize}
                            isLoading={isLoading}
                            PAGE_SIZES={PAGE_SIZES}
                            totalCount={totalCount}
                            recordsData={recordsData}
                            bufferSearch={bufferSearch}
                            isRealLoading={isRealLoading}
                            bufferSearchDataList={bufferSearchDataList}
                            setPage={(page: any) => setPage(page)}
                            setPageSize={(value: any) => setPageSize(value)}
                            setBufferSearch={(value: any) => bufferSearchHint(value)}
                            setBufferSearchDataList={(value: any) => setBufferSearchDataList(value)}
                            setSearchParameter={(parameter: any) => setSearchParameter(parameter)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CredentialExtract;
