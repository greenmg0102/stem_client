
import StemItemSearch from '../../pages/Admin/ProgramSchool/StemComponent/StemItemSearch'

const SearchFilter = ({ stemValue, setStemValue }: any) => {

    const gatherValue = (type: string, valueList: any) => setStemValue({ ...stemValue, [type]: valueList })

    return (
        <div className='w-full'>
            <div className='flex justify-start items-center flex-wrap'>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('programSchoolOrg', valueList)}
                        category={"programSchoolOrg"}
                        title={"Program School / Org"}
                        placeholder={"Select Program School / Org"}
                    />
                </div>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('programSchoolOrgType', valueList)}
                        category={"programSchoolOrgType"}
                        title={"Referral Program School/Org Type"}
                        placeholder={"Select Program School / Org / Type"}
                    />
                </div>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('credentialSchool', valueList)}
                        category={"credentialSchool"}
                        title={"School"}
                        placeholder={"School"}
                    />
                </div>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('Opportunity', valueList)}
                        category={"Opportunity"}
                        title={"Opportunity"}
                        placeholder={"Opportunity"}
                    />
                </div>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('credential', valueList)}
                        category={"credential"}
                        title={"Credential"}
                        placeholder={"Credential"}
                    />
                </div>
                <div className='w-full p-1 mb-2 transition-all'>
                    <StemItemSearch
                        stemValue={stemValue}
                        gatherValue={(valueList: any) => gatherValue('field', valueList)}
                        category={"field"}
                        title={"Pathway"}
                        placeholder={"Pathway"}
                    />
                </div>
                <p className='mt-4'><span className='text-red-500 font-bold mr-2 mb-0'>*</span>In all search categories, you can search for multiple options.</p>
            </div>
        </div>
    );
};

export default SearchFilter;
