import { useState } from "react";

import Calendar from "../organisms/Calendar/Calendar";
import UserActionModal from "../organisms/UserActionModal/UserActionModal";

function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [allDay, setAllDay] = useState<boolean>(false);

    return (
        <>
            <UserActionModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} startDate={startDate} endDate={endDate} allDay={allDay} />
            <Calendar setIsAddModalOpen={setIsAddModalOpen} setStartDate={setStartDate} setEndDate={setEndDate} setAllDay={setAllDay} />
        </>
    )
}

export default Dashboard;
