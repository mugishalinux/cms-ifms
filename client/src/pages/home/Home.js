import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useAuthUser } from "react-auth-kit";

import FullScreenLoader from "../../components/loader/FullScreenLoader";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import SkipperSidebar from "../../components/sidebar/SkipperSidebar";
import { BASE_URL } from "../../config/baseUrl";

const Home = () => {
  const auth = useAuthUser();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalBoats, setTotalBoats] = useState(0);
  const [todayIncomes, setTodayIncomes] = useState(0);
  const [todayIncomesPer, setTodayIncomesPer] = useState(0);
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);
  const [christians, setChristians] = useState([]);
  const [churches, setChurches] = useState([]);
  const [todayChristiansRegistered, setTodayChristiansRegistered] = useState(0);
  const [todayVictimRegistered, setTodayVictimRegistered] = useState(0);
  const [category, setCategories] = useState([]);
  const [victim, setVictim] = useState([]);
  const [allVictimsPerProvince, setAllVictimsPerProvince] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        // Fetch user information using auth()
        const userInformation = await auth();

        // Set the user object in component state
        setUser(userInformation);

        //fetch total users
        const totalUsers = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setUsers(totalUsers.data);

        //fetch categories
        const totalCategories = await axios.get(`${BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setCategories(totalCategories.data);

        //fetch victims
        const totalVictims = await axios.get(`${BASE_URL}/victim`, {
          headers: {
            Authorization: `Bearer ${auth().jwtToken}`,
          },
        });
        setVictim(totalVictims.data);

        //fetch victims per provinces
        const totalVictimsPerProvince = await axios.get(
          `${BASE_URL}/allReports/victim/per/location`,
          {
            headers: {
              Authorization: `Bearer ${auth().jwtToken}`,
            },
          }
        );
        console.log(totalVictimsPerProvince.data)
        setAllVictimsPerProvince(totalVictimsPerProvince.data);

        //fetch victims created in today

        const totalVictimsRegistered = await axios.get(
          `${BASE_URL}/allReports/victim/registered/today`,
          {
            headers: {
              Authorization: `Bearer ${auth().jwtToken}`,
            },
          }
        );

        setTodayVictimRegistered(totalVictimsRegistered.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        setIsLoading(false);
      }
    };

    fetchUserInformation();
  }, []);
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="home">
      <AdminSidebar />
      <div className="homeContainer">
        <Navbar imageUrl={user.profile} style={{ marginBottom: "50px" }} />

        <div className="widgets">
          {/* <Widget type="booking" amount={totalBookings} /> */}
          <Widget type="user" amount={users.length} />
          {/* <Widget type="payments" amount={totalAmount[0].total_amount} /> */}
          <Widget type="victims" amount={victim.length} />
          {/* <Widget type="boats" amount={totalBoats} /> */}
          <Widget type="categories" amount={category.length} />
        </div>
        <div className="charts">
          {/* <Featured todayIncome={todayIncomes} percentage={todayIncomesPer} /> */}
          <Featured todayIncome={todayVictimRegistered} percentage={300} />
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} data={datas} /> */}
          <Chart
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
            data={allVictimsPerProvince}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
