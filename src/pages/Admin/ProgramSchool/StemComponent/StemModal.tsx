import { Dialog, Transition, Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Input } from 'antd';

import { stemCreate } from '../../../../api/admin/stem'

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
                                    <Tab.Group>
                                        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={
                                                            `${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                            dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`
                                                        }
                                                    >
                                                        Single
                                                    </button>
                                                )}
                                            </Tab>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={
                                                            `${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                            dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`
                                                        }
                                                    >
                                                        Bundle
                                                    </button>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                        <Tab.Panels>
                                            <Tab.Panel>
                                                <div className="active pt-5">
                                                    <p className="mb-4 font-semibold flex items-center text-blue-400 ">
                                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" className='text-blue-600 mr-1' aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                                                        You can register one document at a time.
                                                    </p>

                                                    <p className={isError ? 'text-red-500' : 'invisible'}>Please fulfill the input.</p>

                                                    <div className='flex justify-start items-center flex-wrap'>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('programSchoolOrg', valueList)}
                                                                category={"programSchoolOrg"}
                                                                title={"Program School / Org"}
                                                                placeholder={"Select Program School / Org"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('programSchoolOrgType', valueList)}
                                                                category={"programSchoolOrgType"}
                                                                title={"Program School / Org Type"}
                                                                placeholder={"Select Program School / Org / Type"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('credentialSchool', valueList)}
                                                                category={"credentialSchool"}
                                                                title={"Credential School"}
                                                                placeholder={"Credential School"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('Opportunity', valueList)}
                                                                category={"Opportunity"}
                                                                title={"Opportunity"}
                                                                placeholder={"Opportunity"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('field', valueList)}
                                                                category={"field"}
                                                                title={"General Field Study"}
                                                                placeholder={"General Field Study"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('credential', valueList)}
                                                                category={"credential"}
                                                                title={"Credential"}
                                                                placeholder={"Credential"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('areaStudy', valueList)}
                                                                category={"areaStudy"}
                                                                title={"Specific Area of Study"}
                                                                placeholder={"Specific Area of Study"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('educationLieve', valueList)}
                                                                category={"educationLieve"}
                                                                title={"Applicant Requirement: Education Level"}
                                                                placeholder={"Applicant Requirement: Education Level"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <StemItemSearch
                                                                stemValue={stemValue}
                                                                gatherValue={(valueList: any) => gatherValue('applicantRequirementCredential', valueList)}
                                                                category={"applicantRequirementCredential"}
                                                                title={"Applicant Requirement: Credential"}
                                                                placeholder={"Applicant Requirement: Credential"}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <p className='text-[14px] font-bold text-gray-600 mb-2'>Course Link</p>
                                                            <Input
                                                                placeholder="Course Link"
                                                                name={"courseLink"}
                                                                value={stemValue["courseLink"]}
                                                                onChange={(e: any) => setStemValue({ ...stemValue, [e.target.name]: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className='w-full xl:w-1/3 p-1 mb-2 transition-all'>
                                                            <p className='text-[14px] font-bold text-gray-600 mb-2'>Opportunity Link</p>
                                                            <Input
                                                                placeholder="Opportunity Link"
                                                                name={"opportunityLink"}
                                                                value={stemValue["opportunityLink"]}
                                                                onChange={(e: any) => setStemValue({ ...stemValue, [e.target.name]: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* <p className="">Program School / Org Name</p>
                                                    <input type="text" value={value.name} name="name" placeholder="Name..." className="form-input my-4" onChange={(e: any) => setValue({ ...value, [e.target.name]: e.target.value })} /> */}


                                                </div>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <div className="active pt-5">
                                                    <p className="mb-4 font-semibold flex items-center text-blue-400 ">
                                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" className='text-blue-600 mr-1' aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                                                        You can register bundle data at once using file like excel.
                                                    </p>

                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>

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