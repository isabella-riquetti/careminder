import { UserAction } from "@careminder/shared/types";
import { useState } from "react";

import Calendar from "../organisms/Calendar/Calendar";
import UserActionModal from "../organisms/UserActionModal/UserActionModal";

function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [userAction, setUserAction] = useState<Partial<UserAction>>({});

    return (
        <>
            {isAddModalOpen && userAction && <UserActionModal setIsAddModalOpen={setIsAddModalOpen} initialUserAction={userAction} />}
            <Calendar setIsAddModalOpen={setIsAddModalOpen} setUserAction={setUserAction} />
        </>
    )
}

export default Dashboard;
