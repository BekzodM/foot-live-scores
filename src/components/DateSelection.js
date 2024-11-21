import "./DateSelect.css";
import "../App.css";
import { useEffect } from "react";
import { useState } from "react";

export default function DateSelection() {
    const today = new Date();


    return (
        <ul className="dateSelect">
            <li className="otherDate">{today.getDate()}</li>
            <li className="otherDate">{today.getDate()}</li>
            <li className="todaysDate">TODAY</li>
            <li className="otherDate">11/21</li>
            <li className="otherDate">11/22</li>
        </ul>
    );
}