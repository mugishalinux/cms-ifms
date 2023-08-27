import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useAuthUser } from "react-auth-kit";
import React, { useState, useEffect } from "react";
import FullScreenLoader from "../../components/loader/FullScreenLoader";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import Datatable from "../../components/datatable/VictimList";
import { BASE_URL } from "../../config/baseUrl";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import {
  userColumns,
  victimsColumns,
  categoryColumns,
  userRows,
} from "../../datatablesource";

function Report() {
  const auth = useAuthUser();
  const [user, setUser] = useState(null);
  const [victimOnGoing, setVictimOnGoing] = useState([]);
  const [victimFinished, setVictimFinished] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const victimFinishedHandleExportToPDF = () => {
    const doc = new jsPDF();

    const columns = victimsColumns.map((column) => column.headerName);

    // Prepare the rows for the PDF table
    const rows = victimFinished.map((item) => {
      const rowData = [];
      columns.forEach((column) => {
        let value = "";

        if (column === "ID") {
          value = item.id || ""; // Access the nested property directly
        } else if (column === "Last Name") {
          value = item.lastName || ""; // Access the nested property directly
        } else if (column === "First Name") {
          value = item.firstName || ""; // Access the nested property directly
        } else if (column === "Birth Date") {
          const readableDate = new Date(item.dob).toLocaleDateString();
          value = readableDate || ""; // Access the nested property directly
        } else if (column === "Email") {
          value = item.email || ""; // Access the nested property directly
        } else if (column === "Phone Number") {
          value = item.phoneNumber || ""; // Access the nested property directly
        } else if (column === "Category Name") {
          value = item.cateogryName || ""; // Access the nested property directly
        } else if (column === "Starting Date") {
          const readableDate = new Date(item.created_at).toLocaleDateString();
          value = readableDate || ""; // Access the nested property directly
        } else {
          const field = victimsColumns.find(
            (col) => col.headerName === column
          )?.field;
          if (field) {
            value = item[field] || "";
          }
        }
        rowData.push(value);
      });
      return rowData;
    });

    // Add a title
    doc.text(
      `List Of All Victims Finished Program Total:(${victimFinished.length})`,
      105,
      10,
      { align: "center" }
    );

    // Add the table using autoTable
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF
    doc.save("victim_report_list.pdf");
  };

  const victimOngoingHandleExportToPDF = () => {
    const doc = new jsPDF();

    const columns = victimsColumns.map((column) => column.headerName);

    // Prepare the rows for the PDF table
    const rows = victimOnGoing.map((item) => {
      const rowData = [];
      columns.forEach((column) => {
        let value = "";

        if (column === "ID") {
          value = item.id || ""; // Access the nested property directly
        } else if (column === "Last Name") {
          value = item.lastName || ""; // Access the nested property directly
        } else if (column === "First Name") {
          value = item.firstName || ""; // Access the nested property directly
        } else if (column === "Birth Date") {
          const readableDate = new Date(item.dob).toLocaleDateString();
          value = readableDate || ""; // Access the nested property directly
        } else if (column === "Email") {
          value = item.email || ""; // Access the nested property directly
        } else if (column === "Phone Number") {
          value = item.phoneNumber || ""; // Access the nested property directly
        } else if (column === "Category Name") {
          value = item.cateogryName || ""; // Access the nested property directly
        } else if (column === "Starting Date") {
          const readableDate = new Date(item.created_at).toLocaleDateString();
          value = readableDate || ""; // Access the nested property directly
        } else {
          const field = victimsColumns.find(
            (col) => col.headerName === column
          )?.field;
          if (field) {
            value = item[field] || "";
          }
        }
        rowData.push(value);
      });
      return rowData;
    });

    // Add a title
    doc.text(
      `List Of All Victims Ongoing in Program Total:(${victimOnGoing.length})`,
      105,
      10,
      { align: "center" }
    );

    // Add the table using autoTable
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF
    doc.save("victim_report_list.pdf");
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        // Fetch user information using auth()
        const userInformation = await auth();

        // Set the user object in component state
        setUser(userInformation);
        setIsLoading(false);

        //fetch victims finished
        const totalVictimsFinished = await axios.get(
          `${BASE_URL}/victim-report`
        );
        setVictimFinished(totalVictimsFinished.data);

        //fetch victims finished
        const totalVictimsOngoing = await axios.get(
          `${BASE_URL}/victim-report/unfinished`
        );
        setVictimOnGoing(totalVictimsOngoing.data);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        setIsLoading(false); // Set
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
        <div style={{ display: "flex" }}>
          <button
            onClick={victimOngoingHandleExportToPDF}
            style={{
              backgroundColor: "black",
              border: "solid black 1px",
              color: "white",
              marginLeft: "120px",
              marginTop: "80px",
              padding: "10px",
              fontSize: "20px",
            }}
            className="hide-on-print"
            // onClick={handlePrint}
          >
            Generate Report Of victim ongoing Program
          </button>

          <button
            onClick={victimFinishedHandleExportToPDF}
            style={{
              backgroundColor: "black",
              border: "solid black 1px",
              color: "white",
              marginLeft: "50px",
              marginTop: "80px",
              padding: "10px",
              fontSize: "20px",
            }}
            className="hide-on-print"
            // onClick={handlePrint}
          >
            Generate Report Of victim finished Program
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
