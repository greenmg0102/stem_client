
import Stem from './StemComponent'
import { useUser } from "@clerk/clerk-react";

const StemAdmin = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    if (isSignedIn) {
        return (
            <div className='w-full pt-12'>
                <Stem />
            </div>
        );
    } else {
        return <div>Please sign in to view this page.</div>;
    }
};

export default StemAdmin;