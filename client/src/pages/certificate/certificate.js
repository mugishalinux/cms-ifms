import { margin } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const pdfRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [loading, setLoading] = useState(false);
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    // Add a listener to detect when the media type is "print"
    const printMediaQuery = window.matchMedia("print");

    function handlePrintMediaChange(e) {
      setPrinting(e.matches);
    }

    printMediaQuery.addListener(handlePrintMediaChange);

    // Clean up the listener when the component is unmounted
    return () => {
      printMediaQuery.removeListener(handlePrintMediaChange);
    };
  }, []);

  const styles = {
    container: {
      position: "relative",
      width: "800px",
      height: "600px",
      backgroundColor: "#618597",
      padding: "30px",
      color: "#333",
      fontFamily: "'Open Sans', sans-serif",
      boxShadow: "0 0 5px rgba(0, 0, 0, .5)",
    },
    outerBorder: {
      width: "794px",
      height: "594px",
      position: "absolute",
      left: "50%",
      marginLeft: "-397px",
      top: "50%",
      marginTop: "-297px",
      border: "2px solid #fff",
    },
    innerBorder: {
      width: "730px",
      height: "530px",
      position: "absolute",
      left: "50%",
      marginLeft: "-365px",
      top: "50%",
      marginTop: "-265px",
      border: "2px solid #fff",
    },
    certificateBorder: {
      position: "relative",
      width: "720px",
      height: "520px",
      padding: "0",
      border: "1px solid #E1E5F0",
      backgroundColor: "rgba(255, 255, 255, 1)",
      backgroundImage: "none",
      left: "50%",
      marginLeft: "-360px",
      top: "50%",
      marginTop: "-260px",
    },
    certificateBlock: {
      width: "650px",
      height: "200px",
      position: "relative",
      left: "50%",
      marginLeft: "-325px",
      top: "70px",
      marginTop: "0",
    },
    certificateHeader: {
      marginBottom: "10px",
    },
    certificateTitle: {
      position: "relative",
      top: "40px",
    },
    certificateHeaderTitle: {
      fontSize: "28px",
      margin: "center",
      marginLeft: "50px",
    },
    certificateBody: {
      padding: "20px",
    },
    nameText: {
      fontSize: "20px",
    },
    earned: {
      margin: "15px 0 20px",
    },
    earnedText: {
      fontSize: "20px",
    },
    creditsText: {
      fontSize: "15px",
    },
    courseTitle: {
      earnedText: {
        fontSize: "20px",
      },
      creditsText: {
        fontSize: "15px",
      },
    },
    certified: {
      fontSize: "12px",
    },
    underline: {
      marginBottom: "5px",
    },
    certificateFooter: {
      width: "650px",
      height: "100px",
      position: "relative",
      left: "50%",
      marginLeft: "-325px",
      bottom: "-105px",
    },
  };

  const buttonStyles = {
    display: "block",
    "@media print": {
      display: "none", // This won't work directly in inline styles
    },
    backgroundColor: "black",
    border: "solid black 1px",
    color: "white",
    marginLeft: "250px",
    marginTop: "350px",
    padding: "10px",
    fontSize: "30px",
  };

  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    setPrintMode(mediaQuery.matches);

    const updatePrintMode = (e) => {
      setPrintMode(e.matches);
    };

    mediaQuery.addListener(updatePrintMode);

    return () => {
      mediaQuery.removeListener(updatePrintMode);
    };
  }, []);

  const handlePrint = () => {
    window.print();
    navigate("/home");
  };

  // Function to get the current date in the format "MM/DD/YYYY"
  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const downloadPdf = () => {
    window.print();
    // setLoading(true);
    // const input = pdfRef.current;
    // html2canvas(input).then((canvas)=>{
    //   const imgData = canvas.toDataURL("img/png");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const pdfWidth = pdf.internal.pagesize.getWidth();
    //   const pdfHeight = pdf.internal.pagesize.getHeigth();
    //   const imgWidth = canvas.width;
    //   const imgHeight = canvas.height;
    //   const ratio = Math.min(pdfWidth/ imgWidth, pdfHeight/imgHeight);
    //   const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //   const imgY = 30;
    //   pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //   pdf.save("certificate.pdf");
    // })

    // const capture = document.querySelector(".cert");
    // setLoading(true);
    // html2canvas(capture).then((canvas) => {
    //   const imgData = canvas.toDataURL("img/png");
    //   const doc = new jsPDF("p", "mm", "a4");
    //   const componentWidth = doc.internal.pagesize.getWidth();
    //   const componentHeight = doc.internal.pagesize.height();
    //   doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
    //   setLoading(false);
    //   doc.save("certificate.pdf");
    // });
  };

  return (
    <>
      <div
        style={styles.container}
        className="container pm-certificate-container"
        ref={pdfRef}
      >
        <div style={styles.outerBorder} className="outer-border"></div>
        <div style={styles.innerBorder} className="inner-border"></div>

        <div
          style={styles.certificateBorder}
          className="pm-certificate-border col-xs-12"
        >
          <div
            style={{ ...styles.certificateHeader, ...styles.certificateTitle }}
            className="row pm-certificate-header"
          >
            <div className="pm-certificate-title cursive col-xs-12 text-center">
              <h2 style={styles.certificateHeaderTitle}>
                CHILDREN MOTHER SUPPORT INFORMATION SYSTEM
              </h2>
            </div>
          </div>
          <div className="cert">
            <div className="row pm-certificate-body">
              <div
                style={styles.certificateBlock}
                className="pm-certificate-block"
              >
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2"></div>
                    <div
                      style={{ ...styles.nameText, ...styles.underline }}
                      className="pm-certificate-name underline margin-0 col-xs-8 text-center"
                    >
                      <span style={{ color: "black", marginLeft: "230px" }}>
                        CERTIFICATE OF COMPLETION
                      </span>
                    </div>

                    <div
                      style={{ ...styles.nameText, ...styles.underline }}
                      className="pm-certificate-name underline margin-0 col-xs-8 text-center"
                    >
                      <span style={{ color: "black", marginLeft: "250px" }}>
                        {state.names}
                      </span>
                    </div>

                    <div
                      style={{ ...styles.nameText, ...styles.underline }}
                      className="pm-certificate-name underline margin-0 col-xs-8 text-center"
                    >
                      <span style={{ color: "black", marginLeft: "250px" }}>
                        Certified in {state.catName}
                      </span>
                    </div>

                    <div
                      style={{ ...styles.nameText, ...styles.underline }}
                      className="pm-certificate-name underline margin-0 col-xs-8 text-center"
                    >
                      <span style={{ color: "black", marginLeft: "250px" }}>
                        Issued on {getCurrentDate()}
                      </span>
                    </div>

                    <div className="col-xs-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          {!printing && (
            <button
              style={{
                display: printMode ? "none" : "block",

                backgroundColor: "black",
                border: "solid black 1px",
                color: "white",
                marginLeft: "650px",
                marginTop: "80px",
                padding: "10px",
                fontSize: "30px",
              }}
              className="hide-on-print"
              onClick={handlePrint}
            >
              Print Certificate
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Certificate;
