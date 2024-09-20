import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "./HomePage.css";

export default function HomePage() {
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
    setSelectedDate(event.target.value);
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

  return (
    <div className="fixturesContainer">
      <input type="date" value={selectedDate} onChange={handleDateChange} />
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
          <h3>English Premier League</h3>
          {fixturesByLeague[39]?.length > 0 ? (
            fixturesByLeague[39].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>La Liga</h3>
          {fixturesByLeague[140]?.length > 0 ? (
            fixturesByLeague[140].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>Serie A</h3>
          {fixturesByLeague[135]?.length > 0 ? (
            fixturesByLeague[135].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>Bundesliga</h3>
          {fixturesByLeague[78]?.length > 0 ? (
            fixturesByLeague[78].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>Liga 1</h3>
          {fixturesByLeague[61]?.length > 0 ? (
            fixturesByLeague[61].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>UEFA Champions League</h3>
          {fixturesByLeague[2]?.length > 0 ? (
            fixturesByLeague[2].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>UEFA Europa League</h3>
          {fixturesByLeague[3]?.length > 0 ? (
            fixturesByLeague[3].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}

          <h3>International</h3>
          {fixturesByLeague[1]?.length > 0 ? (
            fixturesByLeague[1].map((item, index) => (
              <div key={index}>
                <p>
                  {item.teams.home.name} vs {item.teams.away.name}
                </p>
                <p className="score">
                  {item.goals.home} {item.fixture.status.short}{" "}
                  {item.goals.away}
                </p>
              </div>
            ))
          ) : (
            <p className="noGames">No Games Today</p>
          )}
        </>
      )}
    </div>
  );
}
