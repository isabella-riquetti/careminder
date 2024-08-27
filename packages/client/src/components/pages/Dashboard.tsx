import { useGetActionsQuery } from "@/api/actions";
import { UserButton, useUser } from "@clerk/clerk-react";

function Dashboard() {
    const { data: actions } = useGetActionsQuery();
    const { user } = useUser();

    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="flex flex gap-2 items-center justify-center transition-all">
                <UserButton />
                <p className="text-lg text-white truncate">{user?.firstName ?? user?.username ?? "User"}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Action</th>
                                <th>Recommended Frequency</th>
                                <th>Estimated Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actions?.map(a => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.frequency}</td>
                                    <td>{a.estimated_cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
