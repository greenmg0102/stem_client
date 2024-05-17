
import GeneralFieldOfStudy from './SingleClassification/GeneralFieldOfStudy'
import ProgramSchoolOrgType from './SingleClassification/ProgramSchoolOrgType'
import Opportunity from './SingleClassification/Opportunity'
import CredentialSchool from './SingleClassification/CredentialSchool'
import Credential from './SingleClassification/Credential'

const SingleClassification = () => {

    return (
        <div className='w-full flex justify-between items-start flex-wrap pt-12'>
            <div className="w-full xl:w-1/2 p-2 mt-4">
                <ProgramSchoolOrgType />
            </div>
            <div className="w-full xl:w-1/2 p-2 mt-4">
                <CredentialSchool />
            </div>
            <div className="w-full xl:w-1/2 p-2 mt-4">
                <Credential />
            </div>
            <div className="w-full xl:w-1/2 p-2 mt-4">
                <GeneralFieldOfStudy />
            </div>
            <div className="w-full xl:w-1/2 p-2 mt-4">
                <Opportunity />
            </div>
        </div>
    );
};

export default SingleClassification;