import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Featured = ({ todayIncome, percentage }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Victims Created Today</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={6}
          />
        </div> */}
        <p style={{ marginTop: "50px" }} className="title">
          Total people
        </p>
        <p style={{ color: "red" }} className="amount">
          <span style={{ color: "black", marginRight: "5px" }}>
            {" "}
            <PersonOutlineIcon
              className="icon"
              style={{
                color: "blue",
              }}
            />{" "}
          </span>
          {todayIncome}
        </p>
        <p className="desc">Previous records may not be included.</p>
      </div>
    </div>
  );
};

export default Featured;
