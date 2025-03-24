async function downloadPDF() {
    const iframe = document.querySelector("iframe");

    try {
        const iframeDocument = iframe.contentWindow.document.body;

        // Load html2pdf.js
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        document.body.appendChild(script);

        script.onload = () => {
            html2pdf(iframeDocument, {
                margin: 10,
                filename: "report.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            });
        };

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("PDF generation failed. Try a different browser.");
    }
}
