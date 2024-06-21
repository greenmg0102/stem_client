
const SearchModuleItemCard = ({ item }: any) => {

    return (
        <div className='w-full border p-4 hover:shadow-xl cursor-pointer transition-all rounded-[4px]'  >

            <p className="font-bold">School</p>
            <p>{item.credentialSchool && item.credentialSchool.school}</p>

            <div className="flex justify-start items-start flex-wrap mt-4">
                <div className="border rounded-[4px] p-2 mr-2 mb-2">
                    <p className="font-bold">Credential</p>
                    <p className="">{item.credential && item.credential.credential}</p>
                </div>
                <div className="border rounded-[4px] p-2 mr-2 mb-2">
                    <p className="font-bold">Opportunity</p>
                    <p className="">{item.opportunity && item.opportunity.opportunity}</p>
                </div>
                <div className="border rounded-[4px] p-2 mr-2 mb-2">
                    <p className="font-bold">General Study of Field</p>
                    <p className="">{item.field && item.field.field}</p>
                </div>
                <div className="border rounded-[4px] p-2 mr-2 mb-2">
                    <p className="font-bold">Program School / Org Type</p>
                    <p className="">{item.schoolOrgType && item.schoolOrgType.type}</p>
                </div>
            </div>


            <p className="font-bold my-2 mt-4">Program School / Org Information</p>

            <div className="flex justify-start items-start flex-wrap">
                <div className="w-1/5 p-1">
                    <p className="font-semibold">Address</p>
                    <p className="">{item.schoolOrg && item.schoolOrg.address}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold"> Name </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.name}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold"> Post Zip </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.zip}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold"> city </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.city}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold"> neighborhood </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.neighborhood}</p>
                </div>
            </div>
        </div>
    );
};

export default SearchModuleItemCard;