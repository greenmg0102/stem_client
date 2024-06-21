
const SearchModuleItemList = ({ item }: any) => {

    return (
        <div className='w-full border p-4 hover:shadow-xl cursor-pointer transition-all rounded-[4px]'  >

            <p className="font-bold flex mb-2 text-[20px]">
                <svg className="mr-2" viewBox="64 64 896 896" focusable="false" data-icon="home" width="1.2em" height="1.2em" fill="currentColor" aria-hidden="true"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                {item.credentialSchool && item.credentialSchool.school}
            </p>

            <div className="flex justify-start items-start flex-wrap mt-4">
                <div className="border rounded-[8px] p-2 mr-2 mb-2">
                    <p className="font-bold flex mb-2 text-[16px] items-center">
                        <svg className="mr-2" viewBox="0 0 1024 1024" focusable="false" data-icon="bars" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
                        Credential
                    </p>
                    <p className="">{item.credential && item.credential.credential}</p>
                </div>
                <div className="border rounded-[8px] p-2 mr-2 mb-2">
                    <p className="font-bold flex mb-2 text-[16px] items-center">
                        <svg className="mr-2" viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path></svg>
                        Opportunity
                    </p>
                    <p className="">{item.opportunity && item.opportunity.opportunity}</p>
                </div>
                <div className="border rounded-[8px] p-2 mr-2 mb-2">
                    <p className="font-bold flex mb-2 text-[16px] items-center">
                        <svg className="mr-2" viewBox="64 64 896 896" focusable="false" data-icon="barcode" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path></svg>
                        Pathways
                    </p>
                    <p className="">{item.field && item.field.field}</p>
                </div>
                <div className="border rounded-[8px] p-2 mr-2 mb-2">
                    <p className="font-bold flex mb-2 text-[16px] items-center">
                        <svg className="mr-2" viewBox="64 64 896 896" focusable="false" data-icon="barcode" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zm833 0h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm321 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm126 0h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-255 0h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zm-79 64H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm257 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm256 0H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-385 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path></svg>
                        Program School / Org Type
                    </p>
                    <p className="">{item.schoolOrgType && item.schoolOrgType.type}</p>
                </div>
            </div>

            {/* <div className="flex justify-start items-start flex-wrap">
                <div className="w-1/5 p-1">
                    <p className="font-semibold flex mb-2 text-[18px]">Address</p>
                    <p className="">{item.schoolOrg && item.schoolOrg.address}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold flex mb-2 text-[18px]"> Name </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.name}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold flex mb-2 text-[18px]"> Post Zip </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.zip}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold flex mb-2 text-[18px]"> city </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.city}</p>
                </div>
                <div className="w-1/5 p-1">
                    <p className="font-semibold flex mb-2 text-[18px]"> neighborhood </p>
                    <p className="">{item.schoolOrg && item.schoolOrg.neighborhood}</p>
                </div>
            </div> */}
        </div>
    );
};

export default SearchModuleItemList;