import { useGetQuery } from "@/api/tasks";
import { UserButton, useUser } from "@clerk/clerk-react";

function Dashboard() {
    const { data } = useGetQuery();
    const { user } = useUser();

    return (
        <div className="flex flex-col gap-10 items-center">
            <h1>{data}</h1>
            <div className="flex flex gap-2 items-center justify-center transition-all">
                <UserButton />
                <p className="text-lg text-white truncate">{user?.firstName ?? user?.username ?? "User"}</p>
            </div>
        </div>
    )
}

export default Dashboard;
