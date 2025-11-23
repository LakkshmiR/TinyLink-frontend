import "./stats.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Stats() {
  const { code } = useParams();
  const [statsDatas, setStatsDatas] = useState(null);

  useEffect(() => {
    axios
      .get(`https://tinylink-backend-c7jd.onrender.com/get/${code}`)
      .then((result) => {
        setStatsDatas(result.data);
      })
      .catch((err) => console.log(err));
  }, [code]);

  if (!statsDatas) return <p>Loading...</p>; // render only after data is loaded
  const dateObj = new Date(statsDatas.lastClicked);
  const indianDate = dateObj.toLocaleDateString("en-IN", { timezone: "Asia/Kolkata" });
  const indianTime = dateObj.toLocaleTimeString("en-IN", { timezone: "Asia/Kolkata" });

  return (
    <>
      <div className="stats-container">
        <h1 className="heading-stats">TINYLINK STATS</h1>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Last Clicked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-cell="Code">{statsDatas.code}</td>
              <td data-cell="URL">{statsDatas.url}</td>
              <td data-cell="Clicks">{statsDatas.clicks}</td>
              <td data-cell="Last Clicked">
                {indianDate}-{indianTime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Stats;
