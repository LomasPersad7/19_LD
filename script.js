async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const iframe = document.querySelector("iframe");

    try {
        const iframeDocument = iframe.contentWindow.document.body;

        // Ensure html2canvas is loaded
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        document.body.appendChild(script);

        script.onload = async () => {
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            let yPosition = 10; // Start position for text in mm

            // Capture the full page content
            const canvas = await html2canvas(iframeDocument, {
                scale: 2,
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL("image/png");
            let imgWidth = pageWidth - 20; // Leave margins
            let imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (imgHeight > pageHeight - 20) {
                let totalPages = Math.ceil(imgHeight / (pageHeight - 20));
                let heightLeft = imgHeight;
                let position = 10;

                // Loop to add multiple pages
                for (let i = 0; i < totalPages; i++) {
                    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight - 20;
                    position = heightLeft > 0 ? -pageHeight + 30 : position;

                    if (heightLeft > 0) {
                        pdf.addPage();
                    }
                }
            } else {
                pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
            }

            pdf.save("report.pdf");
        };

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF generation failed. Try a different browser.");
    }
}
