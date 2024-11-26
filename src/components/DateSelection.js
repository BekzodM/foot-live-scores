import "./DateSelect.css";
import "../App.css";
import { useEffect } from "react";
import { useState } from "react";

export default function DateSelection({onChanged}) {
    const[dateArray, setDateArray] = useState([]);
    const[selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChanged(date);
    };


    useEffect(() => {
        const generateDateRange = (middleDate) => {
            const dates = [];
            
            for(let i = -2; i <= 2; i++) {
                const newDate = new Date();
                newDate.setDate(middleDate.getDate() + i);
                dates.push(newDate.toISOString().split("T")[0]);
            }

            return dates;
        };

        setDateArray(generateDateRange(new Date()));
    }, []);
    


    return (
        <ul className="dateSelect">
            {dateArray.map((date, index) => (
                <li key={index} className={date === selectedDate ? "currentDate" : "" }
                onClick={() => handleDateChange(date)}>
                    {date.split("-").slice(1).join("/")}
                </li>
            ))}
        </ul>
    );
}