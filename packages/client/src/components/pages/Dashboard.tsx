import { useState } from "react";

import Calendar from "../organisms/Calendar/Calendar";
import AddNewReminderModal from "../organisms/Modal/Modal";

function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(true);

    return (
        <>
            <AddNewReminderModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
            <Calendar setIsAddModalOpen={setIsAddModalOpen} />
        </>
    )
}

export default Dashboard;
