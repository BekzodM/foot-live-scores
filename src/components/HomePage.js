import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import "./HomePage.css";
import ifope from "../ifope.jpg";
import useWindowWidth from '../hooks/useWindowWidth';
import DateSelection from "./DateSelection";

export default function HomePage() {
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const windowWidth = useWindowWidth();
  const [apiResponse, setApiResponse] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fixturesByLeague, setFixturesByLeague] = useState({
    1: [],
    2: [],
    3: [],
    39: [],
    61: [],
    78: [],
    135: [],
    140: [],
  });

  useEffect(() => {
    const fetchLeague = async () => {
      setLoading(true);
      setError(null);

      fetch(`${process.env.REACT_APP_API_FIXTURES_URL}?date=${selectedDate}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setApiResponse(data.response);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchLeague();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event);
  };

  useEffect(() => {
    const tempFixturesByLeague = {
      1: [],
      2: [],
      3: [],
      39: [],
      61: [],
      78: [],
      135: [],
      140: [],
    };

    apiResponse.forEach((item) => {
      const leagueId = item.league.id;

      if (
        leagueId === 2 ||
        leagueId === 3 ||
        leagueId === 39 ||
        leagueId === 61 ||
        leagueId === 78 ||
        leagueId === 135 ||
        leagueId === 140
      ) {
        tempFixturesByLeague[leagueId].push(item);
      } else if (
        leagueId === 1 ||
        leagueId === 4 ||
        leagueId === 6 ||
        leagueId === 7 ||
        leagueId === 18 ||
        leagueId === 29 ||
        leagueId === 30 ||
        leagueId === 31 ||
        leagueId === 32 ||
        leagueId === 33 ||
        leagueId === 34
      ) {
        tempFixturesByLeague[1].push(item);
      }
    });

    setFixturesByLeague(tempFixturesByLeague);
  }, [apiResponse]);

  const getStatusDisplay = (item) => {
    const matchDateUTC = new Date(item.fixture.date);
    const matchDateInClientTZ = new Intl.DateTimeFormat("en-US", {
      timeZone: clientTimeZone,
      hour: "2-digit",
      minute: "2-digit",
    }).format(matchDateUTC);

    const status = item.fixture.status.short;

    if (status === "NS") {
      return matchDateInClientTZ;
    } else if (["1H", "2H", "ET", "BT", "P", "INT", "LIVE"].includes(status)) {
      return "LIVE";
    } else {
      return status;
    }
  };

  return (
    <div className="fixturesContainer">
      {/* <input type="date" value={selectedDate} onChange={handleDateChange} /> */}
      <DateSelection onChanged={handleDateChange}/>
      {loading ? (
        <>
          <p>Loading fixtures...</p>
          <p>Allow up to 2 minutes for API servers to spin up</p>
          <a href="https://docs.render.com/free#spinning-down-on-idle">
            Learn more
          </a>
        </>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h2>{selectedDate}'s Fixtures</h2>
          <div className="leagueFixtures">
            {Object.entries(fixturesByLeague).map(
              ([leagueId, fixtures]) =>
                fixtures.length > 0 && (
                  <div key={leagueId} className="leagueSection">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <img
                              src={
                                leagueId === "1"
                                  ? ifope
                                  : fixtures[0].league.flag
                              }
                              alt={`Flag for ${
                                leagueId === "1"
                                  ? "International"
                                  : fixtures[0].league.name
                              }`}
                              className="countryFlag"
                            />
                            <span>
                              {leagueId === "1"
                                ? "International"
                                : fixtures[0].league.name}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixtures.map((item, index) => (
                          <tr key={item.fixture.id} className="fixture">
                            <td>
                              <span className="time">{getStatusDisplay(item)}</span>
                              {windowWidth < 600 ? (
                                <>
                                  <div className="logos">
                                    <h3><img src = {item.teams.home.logo} alt=""/></h3>
                                    <h3><img src = {item.teams.away.logo} alt=""/></h3>
                                  </div>
                                  <div className="teamNames">
                                    <h3>{item.teams.home.name}</h3>
                                    <h3>{item.teams.away.name}</h3>
                                  </div>
                                  <div className="scores">
                                    <h3>{item.goals.home}</h3>
                                    <h3>{item.goals.away}</h3>
                                  </div>
                                </>
                              ) : (
                                <div className="teams">
                                  <div className="homeTeam">
                                    <img src = {item.teams.home.logo} alt=""/>
                                    {item.teams.home.name}
                                  </div>
                                  <div className="scores">
                                    {item.goals.home} - {item.goals.away}
                                  </div>
                                  <div className="awayTeam">
                                    {item.teams.away.name}
                                    <img src = {item.teams.away.logo} alt=""/>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
}
