import "./dashboard.css";
import { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [url, setUrl] = useState([]);
  const [customCode, setCustomCode] = useState("");
  const [urldatas, setUrldatas] = useState([]);

  const handleAdd = () => {
    axios
      .post("https://tinylink-backend-c7jd.onrender.com/add", {
        url: url,
        customCode: customCode.trim() === "" ? null : customCode.trim(),
      })
      .then((result) => {
        console.log(result.data);
        alert("Code Generated!!");

        fetchUrls();
        setUrl("");
        setCustomCode("");
      })
      .catch((err) => console.log(err));
  };

  const fetchUrls = () => {
    axios
      .get("https://tinylink-backend-c7jd.onrender.com/get")
      .then((result) => {
        setUrldatas(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("https://tinylink-backend-c7jd.onrender.com/delete/" + id)
      .then((result) => {
        console.log(result.data);
        alert("Deleted Successfully!!!");
        location.reload();
      })
      .then((err) => console.log(err));
  };
  const navigate = useNavigate();

  //go to stats
  const gotostats = (code) => {
    navigate(`/code/${code}`);
  };
  return (
    <>
      <div className="dashboard-css">
        <h1 className="heading-dashboard">TINYLINK DASHBOARD</h1>
        <input
          type="text"
          placeholder="enter URL"
          className="url-input"
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="enter custom code"
          className="url-input"
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <br />

        <button type="submit" className="add-btn" onClick={handleAdd}>
          Add
        </button>
        <br />
        <br />

        <div className="wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>URL</th>
                <th className="shortlink-th">Shortlink</th>

                <th>Clicks</th>
                <th>Last Clicked</th>
                <th>Actions</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              {urldatas.map((urldata) => {
                const dateObj = urldata.lastClicked;
                const indianDate = dateObj
                  ? new Date(dateObj).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })
                  : "-";
                const indianTime = dateObj
                  ? new Date(dateObj).toLocaleTimeString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })
                  : "-";
                return (
                  <tr key={urldata._id}>
                    <td data-cell="Code">{urldata.code}</td>
                    <td data-cell="URL" className="url-css">
                      {urldata.url}
                    </td>
                    <td data-cell="Shortlink" className="shortlink-th">
                      <button
                        className="short-link-btn"
                        onClick={() => {
                          window.open(
                            `https://tinylink-backend-c7jd.onrender.com/${urldata.code}`,
                            "_blank"
                          );
                          location.reload();
                        }}
                      >
                        {`https://tinylink-backend-c7jd.onrender.com/${urldata.code}`}
                      </button>
                    </td>

                    <td data-cell="Clicks">{urldata.clicks}</td>
                    <td data-cell="Last Clicked">
                      {indianDate}-{indianTime}
                    </td>
                    <td data-cell="Delete">
                      <BsTrash onClick={() => handleDelete(urldata._id)} />
                    </td>
                    <td data-cell="Stats">
                      <button onClick={() => gotostats(urldata.code)} className="stats-btn">
                        stats
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
