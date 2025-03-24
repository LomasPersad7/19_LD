async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const iframe = document.querySelector("iframe");

    try {
        const iframeDocument = iframe.contentWindow.document.body;

        // Capture the full content inside the iframe using html2canvas
        const canvas = await html2canvas(iframeDocument, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        let pdf = new jsPDF("p", "mm", "a4");
        let imgWidth = 210; // A4 width in mm
        let pageHeight = 297; // A4 height in mm
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add extra pages if needed
        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("report.pdf");

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF generation failed. Try a different browser.");
    }
}
