import "./DateSelect.css";
import "../App.css";
import { useEffect } from "react";
import { useState } from "react";

export default function DateSelection() {
    const[dateArray, setDateArray] = useState([]);

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
                <li key={index}>{date}</li>
            ))}
        </ul>
    );
}