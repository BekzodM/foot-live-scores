import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "./GroupStandings.css";

export default function UclStandings() {
    const [apiResponse, setApiResponse] = useState([]);
    useEffect(() => {
      const fetchLeague = async () => {
        fetch(process.env.REACT_APP_API_UCL_URL)
          .then((response) => response.json())
          .then((data) => {setApiResponse(data.response[0]);})
          .catch((err) => {console.log(err);});
      };
      fetchLeague();
      
    }, []);

    const teams = apiResponse?.league?.standings[0] || [];


    return (
      <div className="LeagueStandings">
        <h2>UEFA Champions League Standings</h2>
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, teamIndex) => (
                  <tr key={teamIndex}>
                    <td>{teamIndex + 1} <img src={team.team.logo} alt={team.team.name}/></td>
                    <td>{team.team.name}</td>
                    <td>{team.all.played}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
              </tbody>
             </table>
      </div>
    );
}
