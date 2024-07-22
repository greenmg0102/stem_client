import { Dialog, Transition, Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Input } from 'antd';
import { ExcelRenderer } from 'react-excel-renderer';
import { stemCreate, stemDumpCreate, stemWholeCreate } from '../../../../api/admin/stem'
import { unRepeatedArrayExtracting, unRepeatedArrayArrayExtracting } from './prefixProcess'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import StemItemSearch from './StemItemSearch'

const StemModal = ({ typeModal, setTypeModal, setTypeResult }: { typeModal: boolean, setTypeModal: any, setTypeResult: any }) => {

    const MySwal = withReactContent(Swal);

    const [isloading, setIsLoading] = useState(false)

    const [isError, setIsError] = useState(false)

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

    const [updateStatus, setUpdateStatus] = useState<any>({
        "Program School / Org Type": false,
        "Eligible Credits Transfer School / Credentials School": false,
        "Opportunity": false,
        "Specific Area of Study": false,
        "Career Path Category": false,
        "Credential": false,
        "Applicant Requirement: Education Level": false,
        "Applicant Requirement: Credential": false,
        "Applicant Requirement: Age": false,
    })

    const [percent, setPercent] = useState(0)

    const [excelData, setExcelData] = useState(null);

    const handleFileUpload = async (event: any) => {

        console.log('!!!');

        const fileObj = event.target.files[0];
        ExcelRenderer(fileObj, async (err: any, resp: any) => {
            if (err) {
                console.log(err);
            } else {

                let originHeader = resp.rows[0]
                console.log("originHeader", originHeader);

                let origingData = resp.rows.slice(1, resp.rows.length).filter((item: any) => item.length !== 0)
                console.log("origingData", origingData);

                let ProgramSchoolOrgTypeIndex = originHeader.indexOf("Program School / Org Type")
                let ProgramSchoolOrgTypeList = origingData.map((item: any) => item[ProgramSchoolOrgTypeIndex])
                let ProgramSchoolOrgType = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Program School / Org Type",
                    list: ProgramSchoolOrgTypeList
                })
                await stemDumpCreate(ProgramSchoolOrgType)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": false,
                    "Opportunity": false,
                    "Specific Area of Study": false,
                    "Career Path Category": false,
                    "Credential": false,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })


                let CredentialsSchoolIndex = originHeader.indexOf("Eligible Credits Transfer School / Credentials School")
                let CredentialsSchoolList = origingData.map((item: any) => item[CredentialsSchoolIndex])
                let CredentialsSchool = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Eligible Credits Transfer School / Credentials School",
                    list: CredentialsSchoolList
                })
                await stemDumpCreate(CredentialsSchool)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": false,
                    "Specific Area of Study": false,
                    "Career Path Category": false,
                    "Credential": false,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })

                let OpportunityIndex = originHeader.indexOf("Opportunity")
                let OpportunityList = origingData.map((item: any) => item[OpportunityIndex])
                let Opportunity = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Opportunity",
                    list: OpportunityList
                })
                await stemDumpCreate(Opportunity)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": false,
                    "Career Path Category": false,
                    "Credential": false,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })

                let SpecificAreaOfStudyIndex = originHeader.indexOf("Specific Area of Study")
                let SpecificAreaOfStudyList = origingData.map((item: any) => item[SpecificAreaOfStudyIndex])
                let SpecificAreaOfStudy = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Specific Area of Study",
                    list: SpecificAreaOfStudyList
                })
                await stemDumpCreate(SpecificAreaOfStudy)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": false,
                    "Credential": false,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })


                let CareerPathCategoryIndex = originHeader.indexOf("Career Path Category")

                console.log("CareerPathCategoryIndex", CareerPathCategoryIndex);

                let CareerPathCategoryList = origingData.map((item: any) => item[CareerPathCategoryIndex])
                let CareerPathCategory = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Career Path Category",
                    list: CareerPathCategoryList
                })
                await stemDumpCreate(CareerPathCategory)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": true,
                    "Credential": false,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })


                let CredentialIndex = originHeader.indexOf("Credential")
                let CredentialList = origingData.map((item: any) => item[CredentialIndex])
                let Credential = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Credential",
                    list: CredentialList
                })
                await stemDumpCreate(Credential)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": true,
                    "Credential": true,
                    "Applicant Requirement: Education Level": false,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })


                let ApplicantRequirementEducationLevelIndex = originHeader.indexOf("Applicant Requirement: Education Level")
                let ApplicantRequirementEducationLevelList = origingData.map((item: any) => item[ApplicantRequirementEducationLevelIndex])
                let ApplicantRequirementEducationLevel = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Applicant Requirement: Education Level",
                    list: ApplicantRequirementEducationLevelList
                })
                await stemDumpCreate(ApplicantRequirementEducationLevel)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": true,
                    "Credential": true,
                    "Applicant Requirement: Education Level": true,
                    "Applicant Requirement: Credential": false,
                    "Applicant Requirement: Age": false,
                })


                let ApplicantRequirementCredentialIndex = originHeader.indexOf("Applicant Requirement: Credential")
                let ApplicantRequirementCredentialList = origingData.map((item: any) => item[ApplicantRequirementCredentialIndex])
                let ApplicantRequirementCredential = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Applicant Requirement: Credential",
                    list: ApplicantRequirementCredentialList
                })
                await stemDumpCreate(ApplicantRequirementCredential)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": true,
                    "Credential": true,
                    "Applicant Requirement: Education Level": true,
                    "Applicant Requirement: Credential": true,
                    "Applicant Requirement: Age": false,
                })


                let ApplicantRequirementAgeIndex = originHeader.indexOf("Applicant Requirement: Age")
                let ApplicantRequirementAgeList = origingData.map((item: any) => item[ApplicantRequirementAgeIndex])
                let ApplicantRequirementAge = await unRepeatedArrayExtracting({
                    type: "un-repeated",
                    name: "Applicant Requirement: Age",
                    list: ApplicantRequirementAgeList
                })
                await stemDumpCreate(ApplicantRequirementAge)
                setUpdateStatus({
                    ...updateStatus,
                    "Program School / Org Type": true,
                    "Eligible Credits Transfer School / Credentials School": true,
                    "Opportunity": true,
                    "Specific Area of Study": true,
                    "Career Path Category": true,
                    "Credential": true,
                    "Applicant Requirement: Education Level": true,
                    "Applicant Requirement: Credential": true,
                    "Applicant Requirement: Age": true,
                })


                let SchoolOrgIndex = originHeader.indexOf("School/Org")
                let StreetAddressIndex = originHeader.indexOf("Program School / Org Street Address")
                let CityIndex = originHeader.indexOf("Program School / Org City")
                let ZipCodeIndex = originHeader.indexOf("Zip Code")
                let NeighborhoodIndex = originHeader.indexOf("Neighborhood")

                let ProgramSchoolOrgList = origingData.map((item: any) => {
                    return {
                        name: item[SchoolOrgIndex],
                        address: item[StreetAddressIndex],
                        city: item[CityIndex],
                        zip: item[ZipCodeIndex],
                        neighborhood: item[NeighborhoodIndex],
                        status: 1
                    }
                }).filter((item: any) => item.name !== undefined)

                let ProgramSchoolOrg = await unRepeatedArrayArrayExtracting({
                    type: "un-repeated",
                    name: "ProgramSchoolOrg",
                    list: ProgramSchoolOrgList
                })

                await stemDumpCreate(ProgramSchoolOrg)

                // await sendStringToNest(origingData)

                const chunkSize = 100;
                const iterations = Math.ceil(origingData.length / chunkSize);


                for (let i = 0; i < iterations; i++) {
                    console.log('!', i);

                    setPercent((previous: any) => Number(((100 / iterations) * (i + 1)).toFixed(0)))

                    const start = i * chunkSize;
                    const end = Math.min(start + chunkSize, origingData.length);
                    const list = origingData.slice(start, end);

                    await stemWholeCreate({
                        i,
                        list,
                    });
                }

                coloredToast('Database updated with new Excel file.', 'success')
                setTypeModal(false)
                // await stemDumpCreate({
                //     type: "matched-way",
                //     name: "Stem",
                //     list: origingData
                // })

                // setExcelData(resp.rows);
            }
        });
    };

    // const sendStringToNest = async (data: any) => {

    //     // const string = JSON.stringify(array);

    //     // const chunkSize = 1024; // Define the chunk size as per your requirement
    //     // const chunks = [];

    //     // for (let i = 0; i < string.length; i += chunkSize) {
    //     //     const chunk = string.slice(i, i + chunkSize);
    //     //     chunks.push(chunk);
    //     // }

    //     const stream = new ReadableStream({
    //         start(controller) {
    //             const encoder = new TextEncoder();
    //             const encodedData = encoder.encode(JSON.stringify(data));
    //             controller.enqueue(encodedData);
    //             controller.close();
    //         },
    //     });


    //     const response = await fetch('http://localhost:8000/api/v1/admin/stem/stem-stream', {
    //         method: 'POST',
    //         body: stream,
    //         headers: {
    //             'Content-Type': 'application/octet-stream',
    //         },
    //     });

    //     // Handle the response from the Nest.js backend
    //     // ...
    // };

    const gatherValue = (type: string, valueList: any) => {
        setStemValue({ ...stemValue, [type]: valueList })
    }

    const saveType = async (isTrue: boolean) => {

        if (
            stemValue.programSchoolOrg.length === 1 &&
            stemValue.programSchoolOrgType.length === 1 &&
            stemValue.credentialSchool.length === 1 &&
            stemValue.Opportunity.length === 1 &&
            stemValue.credential.length === 1 &&
            stemValue.field.length === 1
        ) {

            setIsLoading(true)

            const data = {
                ...stemValue,
                programSchoolOrg: stemValue.programSchoolOrg[0].value,
                programSchoolOrgType: stemValue.programSchoolOrgType[0].value,
                credentialSchool: stemValue.credentialSchool[0].value,
                Opportunity: stemValue.Opportunity[0].value,
                field: stemValue.field[0].value,
                credential: stemValue.credential[0].value,
                status: 0
            }

            let result = await stemCreate(data)

            if (result.isOkay) {

                setTypeResult(result.result)
                coloredToast('Please wait for manager approval.', 'success')
                setTypeModal(false)
            } else {
                coloredToast('Registration failed.', 'danger')
            }

        } else {

            setIsError(true)

        }
    }

    const coloredToast = (message: string, color: string) => {

        MySwal.fire({
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            customClass: {
                popup: `color-${color}`,
            },
            timer: 3000,
            showCloseButton: true,
        });
    };

    return (
        <Transition appear show={typeModal} as={Fragment}>
            <Dialog as="div" open={typeModal} onClose={() => setTypeModal(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>

                <div id="tabs_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full lg:max-w-[50%] xl:max-w-[70%] my-8 text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 pt-6">
                                    <h5 className="font-bold text-lg text-gray-600">Please register <span className='font-bold text-gray-900 text-[20px]'>STEM Exposure Programs</span>.</h5>
                                    <button onClick={() => setTypeModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="shrink" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M881.7 187.4l-45.1-45.1a8.03 8.03 0 00-11.3 0L667.8 299.9l-54.7-54.7a7.94 7.94 0 00-13.5 4.7L576.1 439c-.6 5.2 3.7 9.5 8.9 8.9l189.2-23.5c6.6-.8 9.3-8.8 4.7-13.5l-54.7-54.7 157.6-157.6c3-3 3-8.1-.1-11.2zM439 576.1l-189.2 23.5c-6.6.8-9.3 8.9-4.7 13.5l54.7 54.7-157.5 157.5a8.03 8.03 0 000 11.3l45.1 45.1c3.1 3.1 8.2 3.1 11.3 0l157.6-157.6 54.7 54.7a7.94 7.94 0 0013.5-4.7L447.9 585a7.9 7.9 0 00-8.9-8.9z"></path></svg>
                                    </button>
                                </div>
                                <div className="p-5 pt-2">
                                    <div className="active pt-5 p-5">

                                        <p className="mb-4 font-semibold flex items-center text-blue-400">
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" className='text-blue-600 mr-1' aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                                            You can register bundle data at once using file like excel.
                                        </p>

                                        <div className='w-full py-4 flex justify-center items-start flex-wrap'>

                                            {/* 
    <div className='w-full xl:w-1/3 mb-4 p-4 flex justify-center items-center relative'>
        <input type="file" onChange={handleFileUpload} className="opacity-0 absolute" />
        <div className="border border-dashed rounded-[8px] border-gray-300 absolute top-0 left-0 w-full h-[300px] pointer-events-none flex justify-center items-center">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="5em" height="5em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
        </div>
    </div> */}
                                            <div className='w-full xl:w-1/3 mb-4 p-4 flex justify-center items-center relative mt-8'>
                                                <input type="file" onChange={handleFileUpload} className=" h-[600px] opacity-0 absolute" />
                                                <div className="border border-dashed rounded-[8px] border-gray-300 absolute top-0 left-0 w-full h-[300px] pointer-events-none flex justify-center items-center" onClick={handleFileUpload}>
                                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="5em" height="5em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
                                                </div>
                                            </div>





                                            <div className='w-full xl:w-2/3 mb-4 p-4'>
                                                {Object.keys(updateStatus).map((key: any, index: any) =>
                                                    <div className='flex justify-start items-center mb-2 transition-all' key={index}>
                                                        {updateStatus[key] ?
                                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1.3em" height="1.3em" className='text-blue-500' fill="currentColor" aria-hidden="true"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                                                            :
                                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1.3em" height="1.3em" className='text-red-500' fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                                                        }
                                                        <p className='ml-2'>{key}</p>
                                                    </div>
                                                )}
                                                <div className='flex justify-start items-start mb-2 transition-all'>
                                                    {percent !== 0 ?
                                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1.3em" height="1.3em" className='text-blue-500' fill="currentColor" aria-hidden="true"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                                                        :
                                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1.3em" height="1.3em" className='text-red-500' fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                                                    }
                                                    <div className='w-full'>
                                                        <div className='flex justify-between items-center'>
                                                            <p className='ml-2'>Program School / Org</p>
                                                            <p className='mr-12'>{percent}%</p>
                                                        </div>
                                                        <div className='relative w-[calc(100%-2em)] rounded-[8px] bg-gray-300 h-[8px] mt-1'>
                                                            <div
                                                                className='absolute bg-blue-500 rounded-[8px] h-[8px] transition-all'
                                                                style={{
                                                                    width: `${percent}%`
                                                                }}
                                                            >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center mt-4">
                                        <button onClick={() => setTypeModal(false)} type="button" className="btn btn-outline-danger">
                                            Cancel
                                        </button>
                                        <button onClick={() => saveType(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            {
                                                isloading ?
                                                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" className='animate-spin' aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
                                                    :
                                                    null
                                            }
                                            <p className='ml-2'>Save</p>
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default StemModal;