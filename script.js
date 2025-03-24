async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const iframe = document.querySelector("iframe");
    
    try {
        const iframeDocument = iframe.contentWindow.document.body;
        
        // Use html2canvas to capture the iframe content
        const canvas = await html2canvas(iframeDocument, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        let pdf = new jsPDF("p", "mm", "a4");
        let imgWidth = 210; // A4 width in mm
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("report.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF generation failed. Try a different browser.");
    }
}
