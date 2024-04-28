import React, { useState } from "react";
import jsPDF from "jspdf";

const ReportGenerator = ({ fromDate, 
    toDate, 
    handleFromDateChange, 
    handleToDateChange, 
    reduxUserDataArrayID }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownloadReport = () => {
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
    
        const dummyData = [
            { date: "2024-04-01", stockName: "Apple", purchasePrice: 150, sellingDate: "2024-04-10", sellingPrice: 180, pnl: 30 },
            { date: "2024-04-05", stockName: "Google", purchasePrice: 250, sellingDate: "2024-04-15", sellingPrice: 280, pnl: 30 },
            { date: "2024-04-10", stockName: "Microsoft", purchasePrice: 180, sellingDate: "2024-04-20", sellingPrice: 200, pnl: 20 },
        ];
    
        const filteredData = dummyData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= selectedFromDate && entryDate <= selectedToDate;
        });
    
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
        startY += 15;
    
    
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(65, 168, 147);
        pdf.setFillColor(211, 211, 211); 
        pdf.rect(20, startY - 6, 168, 8, "F");
        pdf.text("  Account Holder Details:", 20, startY);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.text("Name:", 20, startY + 10);
        pdf.setFont("helvetica", "normal");
        pdf.text("John Doe", 32, startY + 10);
        pdf.setFont("helvetica", "bold");
        pdf.text("Email:", 20, startY + 20);
        pdf.setFont("helvetica", "normal");
        pdf.text("john.doe@example.com", 32, startY + 20);
        startY += 30;
    
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(65, 168, 147);
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
        pdf.setTextColor(65, 168, 147);
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
            pdf.text(formatDate(entry.date), 20, startY);
            pdf.text(entry.stockName, 55, startY);
            pdf.text(formatCurrency(entry.purchasePrice), 85, startY);
            pdf.text(formatDate(entry.sellingDate || "-"), 115, startY); 
            pdf.text(formatCurrency(entry.sellingPrice || "-"), 145, startY); 
            pdf.text(formatCurrency(entry.pnl), 175, startY); 
            startY += 10;
        });

        const lineYsa = startY - 6; // Adjust position as needed
        pdf.line(20, lineYsa, 188, lineYsa); // Draw a line from x = 20 to x = 195
        startY += 5;
    
        const totalPnL = filteredData.reduce((acc, entry) => acc + entry.pnl, 0);
        const totalPnLColor = totalPnL >= 0 ? "green" : "red";
        const totalPnLText = totalPnL >= 0 ? `+${totalPnL.toFixed(2)}` : `${totalPnL.toFixed(2)}`;

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
        <label style={{marginRight: "30px",
          color: "white", }}>To Date:</label>
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
