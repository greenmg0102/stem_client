import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBanner from '../components/UIs/SearchModule/SearchBanner';
import IntegratingSearchModule from '../components/UIs/SearchModule/IntegratingSearchModule';
import { setPageTitle } from '../store/themeConfigSlice';
import SearchFilter from '../pages/IntegrationSearch/SearchFilter'
import { integrationRead } from '../api/user/integration'

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

    const [pageInfo, setPageInfo] = useState({
        total: 23,
        pageNumber: 0,
        pageLimit: 20,
    })

    const [searchParameter, setSearchParameter] = useState("")
    const [bufferSearch, setBufferSearch] = useState("")
    const [searchResult, setSearchResult] = useState<any>([])

    useEffect(() => {

        let data = {
            ...stemValue,
            ...pageInfo,
            searchParameter: searchParameter
        }

        async function fetchData() {
            let result = await integrationRead(data)
            if (result.isOkay) setSearchResult(result.result)
        }
        fetchData()

    }, [stemValue, pageInfo, searchParameter])

    useEffect(() => {
        dispatch(setPageTitle('IntegrationSearch'));
    });

    return (
        <div>
            <div className="pt-5">
                <SearchBanner
                    title={"IntegrationSearch"}
                    description={""}
                />
                <div className='p-4 flex justify-between items-start flex-wrap'>
                    <div className='w-full xl:w-[40%] p-2 mb-4 py-24'>
                        <p className='font-bold mb-8 text-center text-[24px]'>Filter Category </p>
                        <SearchFilter
                            stemValue={stemValue}
                            setStemValue={(total: any) => setStemValue(total)}
                        />
                    </div>
                    <div className='w-full xl:w-[60%] p-2'>
                        <IntegratingSearchModule
                            pageInfo={pageInfo}
                            setPageInfo={(pageInfo: any) => setPageInfo(pageInfo)}
                            searchResult={searchResult}
                            searchParameter={searchParameter}
                            bufferSearch={bufferSearch}
                            setBufferSearch={(value: any) => setBufferSearch(value)}
                            setSearchParameter={(parameter: any) => setSearchParameter(parameter)}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationSearch;
