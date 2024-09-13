import { useEffect } from "react";
import { toast } from "react-toastify";

const SpinnerOverlay = ({ isLoading, isFetching }: { isLoading: boolean, isFetching: boolean }) => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timeoutId: any;

        if (isLoading || isFetching) {
            timeoutId = setTimeout(() => {
                toast.info("We're using free resources, which means the first load needs to wake up the service and might take a few minutes.", {
                    autoClose: false,
                    toastId: 'slow-loading'
                });
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isLoading, isFetching]);

    if (!isLoading && !isFetching) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-950 bg-opacity-60">
            <div className="text-white text-xl flex flex-col items-center justify-between">
                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2">Loading your minders</p>    
            </div>
        </div>
    );
};

export default SpinnerOverlay;
