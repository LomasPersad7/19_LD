// async function downloadPDF() {
//     const { jsPDF } = window.jspdf;
//     const iframe = document.querySelector("iframe");

//     try {
//         const iframeDocument = iframe.contentWindow.document.body;

//         // Load html2canvas dynamically
//         const script = document.createElement("script");
//         script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
//         document.body.appendChild(script);

//         script.onload = async () => {
//             const pdf = new jsPDF("p", "mm", "a4");
//             const pageWidth = 210; // A4 width in mm
//             const pageHeight = 297; // A4 height in mm
//             const margin = 10; // Margin for text and images
//             let yPosition = margin; // Start position in mm

//             // Select the content inside the iframe
//             const content = iframeDocument.cloneNode(true);

//             // Hide unnecessary elements (like navigation bars)
//             const elementsToHide = content.querySelectorAll("nav, footer, .some-class");
//             elementsToHide.forEach(el => el.style.display = "none");

//             // Capture content as an image
//             const canvas = await html2canvas(content, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: false
//             });

//             const imgData = canvas.toDataURL("image/png");
//             let imgWidth = pageWidth - 2 * margin; // Leave margins
//             let imgHeight = (canvas.height * imgWidth) / canvas.width;

//             // If content is larger than a single page, split into multiple pages
//             if (imgHeight > pageHeight - 2 * margin) {
//                 let totalPages = Math.ceil(imgHeight / (pageHeight - 2 * margin));
//                 let heightLeft = imgHeight;
//                 let position = yPosition;

//                 for (let i = 0; i < totalPages; i++) {
//                     pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
//                     heightLeft -= (pageHeight - 2 * margin);
//                     position = heightLeft > 0 ? -pageHeight + 2 * margin : position;

//                     if (heightLeft > 0) {
//                         pdf.addPage();
//                     }
//                 }
//             } else {
//                 pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
//             }

//             pdf.save("report.pdf");
//         };

//     } catch (error) {
//         console.error("Error generating PDF:", error);
//         alert("PDF generation failed. Try a different browser.");
//     }
// }

async function downloadPDF() {
    const iframe = document.querySelector("iframe");

    try {
        const iframeDocument = iframe.contentWindow.document.body;

        // Load html2pdf.js dynamically
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
        alert("PDF generation failed. Try refreshing the page.");
    }
}


function downloadHTML() {
    const iframe = document.querySelector("iframe");

    try {
        const iframeDocument = iframe.contentWindow.document.documentElement.outerHTML; // Get full HTML content
        const blob = new Blob([iframeDocument], { type: "text/html" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "report.html"; // File name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading HTML:", error);
        alert("Download failed. Try a different browser.");
    }
}


