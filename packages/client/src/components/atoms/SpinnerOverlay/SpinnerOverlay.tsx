import { useEffect, useState } from "react";

const SpinnerOverlay = ({ loading }: { loading: boolean }) => {
    const [showFreeResources, setShowFreeResources] = useState(false);

    useEffect(() => {
        setShowFreeResources(false);
        setTimeout(() => setShowFreeResources(true), 5000)
    }, []);
    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-950 bg-opacity-60">
            <div className="text-white text-xl flex flex-col items-center justify-between">
                <div className="invisible">
                    <div className={`${!showFreeResources ? "invisible" : ""} mb-2 max-w-[80%] text-center`}>{`We're running on free resources, so the first load needs to wake up the service and might take a few minutes.`}</div>
                    <p className="mb-2">Loading your minders</p>
                </div>
                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2">Loading your minders</p>
                <div className={`${!showFreeResources ? "invisible" : ""} mt-2 max-w-[80%] text-center`}>{`We're running on free resources, so the first load needs to wake up the service and might take a few minutes.`}</div>
            </div>
        </div>
    );
};

export default SpinnerOverlay;
