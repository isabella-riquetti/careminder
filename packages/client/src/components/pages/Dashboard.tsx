import { useState } from "react";

import Calendar from "../organisms/Calendar/Calendar";
import AddNewReminderModal from "../organisms/Modal/Modal";

function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    return (
        <>
            <AddNewReminderModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} startDate={startDate} endDate={endDate} />
            <Calendar setIsAddModalOpen={setIsAddModalOpen} setStartDate={setStartDate} setEndDate={setEndDate} />
        </>
    )
}

export default Dashboard;
