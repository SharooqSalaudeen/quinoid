import React, { useState, useCallback, useEffect } from "react";

export default function Table(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const region = props.region;

  let url = "https://restcountries.eu/rest/v2/region/";
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${region}`);
      const data = await response.json();
      setData(data);
      //   console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [region, url]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    return () => {
      setLoading(false);
    };
  }, [region, fetchData]);

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>Area Code</th>
            <th>Borders</th>
            <th>Capital</th>
            <th>Currencies</th>
            <th>Languages</th>
            <th>Flag</th>
            <th>Timexones</th>
            <th>Top Level Domains</th>
          </tr>
          {data.map((item, id) => {
            const {
              name,
              area,
              borders,
              capital,
              currencies,
              languages,
              flag,
              timezones,
              topLevelDomain,
            } = item;

            return (
              <tr key={id}>
                <td>
                  <h5>{name}</h5>
                </td>
                <td>
                  <h5>{area}</h5>
                </td>
                <td>
                  <h5>
                    {borders.map((item, id) => {
                      return <p key={id}>{`${item}, `}</p>;
                    })}
                  </h5>
                </td>
                <td>
                  <h5>{capital}</h5>
                </td>
                <td>
                  <h5>
                    {currencies.map((item, id) => {
                      return <p key={id}>{`${item.name}, `}</p>;
                    })}
                  </h5>
                </td>
                <td>
                  <h5>
                    {languages.map((item, id) => {
                      return <p key={id}>{`${item.name}, `}</p>;
                    })}
                  </h5>
                </td>
                <td>
                  <img
                    style={{ height: "60px", width: "120px" }}
                    src={`${flag}`}
                    alt={`${name}`}
                  />
                </td>
                <td>
                  <h5>
                    {timezones.map((item, id) => {
                      return <p key={id}>{`${item}, `}</p>;
                    })}
                  </h5>
                </td>
                <td>
                  <h5>
                    {topLevelDomain.map((item, id) => {
                      return <p key={id}>{`${item}, `}</p>;
                    })}
                  </h5>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
