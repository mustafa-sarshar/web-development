const fs = require("fs"),
  PDFDocument = require("pdfkit");

const createInvoiceContent = (invoiceData, docTarget) => {
  let totalPrice = 0;

  docTarget.fontSize(16).text(`User: ${invoiceData.user.email}`);
  docTarget.fontSize(16).text("---------------------------------------------");
  docTarget
    .fontSize(24)
    .text(`Invoice: #${invoiceData.products[0].product._id}`);
  docTarget.fontSize(16).text("---------------------------------------------");
  invoiceData.products.forEach((item) => {
    const itemTotalPrice = item.product.price * item.quantity;
    totalPrice += itemTotalPrice;

    docTarget
      .fontSize(12)
      .text(
        `x${item.quantity} -> ${item.product.title} (\$${item.product.price}) - TOTAL: \$${itemTotalPrice}`
      );
  });
  docTarget.fontSize(16).text("---------------------------------------------");
  docTarget.fontSize(16).text(`Total price: \$${totalPrice}`);
};

const generatePDFContent = (contentType, contentData, docTarget) => {
  switch (contentType) {
    case "INVOICE":
      createInvoiceContent(contentData, docTarget);
      break;
    default:
      break;
  }
};

const createPDF = (filename, filePath, fileData, destination) => {
  const pdfDoc = new PDFDocument();
  destination.set("Content-Type", "application/pdf");
  destination.set("Content-Disposition", `inline; filename=${filename}`);
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.pipe(destination);
  generatePDFContent("INVOICE", fileData, pdfDoc);
  pdfDoc.end();
};

module.exports = { createPDF };
