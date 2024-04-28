import jsPDF from "jspdf";
import { React, useEffect, useState } from "react";
import axios from "../../api/axiosConfig.js";
import { useSelector } from "react-redux";

const ReportGenerator = ({ fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  reduxUserDataArrayID }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const reduxUserDataUserName= useSelector(
    (state) => state.userData.currentUser.userName
  );
  console.log("name will be : ", reduxUserDataUserName)

  const reduxUserDataEmail= useSelector(
    (state) => state.userData.currentUser.email
  );

  useEffect(() => {
    const getAllFilteredData = async () => {
      try {
        const body = {
          arrayID: reduxUserDataArrayID,
          fromDate: fromDate,
          toDate: toDate
        }
        const result = await axios.post("/simulator/getTradedStocksBetweenTheDates", body);
        setFilteredData(result.data.data);
        console.log("the array will be : ", result.data.data)
      } catch (error) {
        console.error("Error fetching filtered data:", error);
        // Handle error, show alert, etc.
      }
    }
    getAllFilteredData();
  }, [fromDate, toDate]); // empty dependency array to run only once on component mount

  const handleDownloadReport = async () => {
    const today = new Date();
    const selectedFromDate = new Date(fromDate);
    const selectedToDate = new Date(toDate);

    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date.");
      return;
    }

    if (selectedFromDate > today) {
      alert("Please select a 'From Date' before today's date.");
      return;
    }

    if (selectedToDate > today) {
      alert("Please select a 'To Date' before today's date.");
      return;
    }

    if (selectedFromDate > selectedToDate) {
      alert("From Date cannot be after To Date.");
      return;
    }

    const pdf = new jsPDF();
    let startY = 10;

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US");
    };

    const formatCurrency = (amount) => {
      if (typeof amount !== 'number') return '-';
      return "$" + amount.toFixed(2);
    };

    const headers = ["Purchase Date", "Stock Name", "Purchase Price", "Selling Date", "Selling Price", "PnL"];

    const positions = [20, 55, 85, 115, 145, 175];
    const logoImg = document.getElementById('logo');
    const imgData = logoImg.src;
    const logoWidth = 20;
    const logoHeight = (logoWidth / logoImg.width) * logoImg.height;
    pdf.addImage(imgData, 'PNG', 70, startY, logoWidth, logoHeight);
    startY += logoHeight - 5;

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(65, 168, 147);
    pdf.text("Chai Trade", 93, startY);
    startY += 8;

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(0,0,0);
    pdf.text(" - Easy as a cup of tea", 93, startY);
    startY += 13;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0,0,0);
    pdf.setFillColor(211, 211, 211);
    pdf.rect(20, startY - 6, 168, 8, "F");
    pdf.text("  Account Holder Details:", 20, startY);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text("Name:", 20, startY + 10);
    pdf.setFont("helvetica", "normal");
    pdf.text(reduxUserDataUserName, 32, startY + 10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Email:", 20, startY + 20);
    pdf.setFont("helvetica", "normal");
    pdf.text(reduxUserDataEmail, 32, startY + 20);
    startY += 30;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0,0,0);
    pdf.setFillColor(211, 211, 211);
    pdf.rect(20, startY - 6, 168, 8, "F"); // Extend the height to accommodate two lines
    pdf.text("  Statement Period:", 20, startY);
    pdf.text("Account Number:", 100, startY);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${formatDate(fromDate)} - ${formatDate(toDate)}`, 25, startY + 10); // Move dates below "Statement Period"
    pdf.text(`${reduxUserDataArrayID}`, 108, startY + 10); // Align Account Number and its value
    startY += 20; // Increase startY to leave space for the next content



    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0,0,0);
    pdf.setFillColor(211, 211, 211);
    pdf.rect(20, startY - 6, 168, 8, "F");
    pdf.text("  Transactions:", 20, startY);
    startY += 10;

    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      pdf.text(header, positions[index], startY);
    });
    startY += 10;

    // Draw horizontal line after headers
    const lineY = startY - 6; // Adjust position as needed
    pdf.line(20, lineY, 188, lineY); // Draw a line from x = 20 to x = 195

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    filteredData.forEach(entry => {
      pdf.text(formatDate(entry.purchaseDate), 20, startY);
      pdf.text(entry.stockName, 55, startY);
      pdf.text(formatCurrency(entry.purchasePrice), 85, startY);
      {if (entry.sellingDate == '-') {
        pdf.text("-", 115, startY);
      }else{
        pdf.text(formatDate(entry.sellingDate), 115, startY);
      }}
      pdf.text(formatCurrency(entry.sellingPrice) || "-", 145, startY);
      pdf.text(formatCurrency(entry.profitLoss), 175, startY);
      startY += 10;
    });

    const lineYsa = startY - 6; // Adjust position as needed
    pdf.line(20, lineYsa, 188, lineYsa); // Draw a line from x = 20 to x = 195
    startY += 5;

    const totalPnL = filteredData.reduce((acc, entry) => acc + entry.profitLoss, 0);
    const totalPnLColor = totalPnL >= 0 ? "green" : "red";
    const totalPnLText = totalPnL >= 0 ? `+$${totalPnL.toFixed(2)}` : `-$${totalPnL.toFixed(2)}`;

    const totalPnLWidth = pdf.getTextWidth(totalPnLText); // Adjust padding as needed
    const totalPnLHeight = 7; // Adjust height as needed
    pdf.setFillColor(211, 211, 211); // Grey color
    pdf.rect(38, startY - 5, totalPnLWidth + 1, totalPnLHeight, "F"); // Adjust padding as needed

    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("Total PnL:", 20, startY);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(totalPnLColor);
    pdf.text(totalPnLText, 38, startY);


    pdf.save("trading_report.pdf");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
    },
    downloadButton: {
      backgroundColor: "green",
      border: "none",
      color: "white",
      padding: "12px 24px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "18px",
      marginTop: "20px",
      marginBottom: "20px",
      cursor: "pointer",
      borderRadius: "4px",
      marginLeft: "270px",
    },
    downloadButtonHover: {
      backgroundColor: "red",
    },
    datePicker: {
      marginLeft: "250px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    dateLabel: {
      marginRight: "10px",
      color: "white",
    },
    datePickerInput: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
      minWidth: "150px",
    },
    reportHeading: {
      cursor: "pointer",
      fontFamily: "Sacramento, cursive",
      fontSize: "75px",
      color: isHovered ? "transparent" : "#65a893",
      textAlign: "center",
      WebkitTextStroke: isHovered ? "2px #88b9a9" : "none",
      fontWeight: "normal",
      marginTop: "80px",
      marginBottom: "50px",
    },
  };

  return (
    <div>
      <h2
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={styles.reportHeading}
      >
        Download Your Report
      </h2>
      <div style={styles.datePicker}>
        <label style={styles.dateLabel}>From Date:</label>
        <input type="date" value={fromDate} onChange={handleFromDateChange} style={styles.datePickerInput} />
      </div>
      <div style={styles.datePicker}>
        <label style={{
          marginRight: "30px",
          color: "white",
        }}>To Date:</label>
        <input type="date" value={toDate} onChange={handleToDateChange} style={styles.datePickerInput} />
      </div>
      <button
        style={styles.downloadButton}
        onClick={handleDownloadReport}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = styles.downloadButton.backgroundColor}
      >
        Download Report
      </button>
    </div>
  );
};

export default ReportGenerator;
