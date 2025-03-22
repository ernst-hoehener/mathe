// https://github.com/mozilla/pdf.js
// https://mozilla.github.io/pdf.js/api/
// console.log(pdfjsLib.build);
// console.log(pdfjsLib.version);

var pdf_link = document.getElementById('pdf_link');
var pdf_viewer = document.getElementById('pdf_viewer');
var pdf_file = document.getElementById('pdf_file').dataset.pdfFile; // from data-pdf-file attribute

document.title = "Ernsts Mathe - " + pdf_file;
link = document.createElement("a");
link.href = pdf_file;
link.textContent = pdf_file;
pdf_link.appendChild(link);

var pdf = null;
var scale = 1.0;

pdfjsLib.getDocument(pdf_file).promise.then(function(thePdf) {
  pdf = thePdf;
  for (page = 1; page <= pdf.numPages; page++) {
    canvas = document.createElement("canvas");
    canvas.className = 'pdf-page-canvas';
    pdf_viewer.appendChild(canvas);
    renderPage(page, canvas);
  }
});

function renderPage(pageNumber, canvas) {
  pdf.getPage(pageNumber).then(function(page) {
    viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
  });
}