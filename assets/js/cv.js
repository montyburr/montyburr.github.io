// The inline CV viewer only works where the browser has a built-in PDF
// renderer. Most mobile browsers don't, and they fail silently — <object>
// fallback content isn't shown, you just get a blank box. So detect it and
// switch to the fallback panel explicitly.

(function () {
  const viewer = document.getElementById("cv-viewer");
  if (!viewer) return;

  // Deliberately inverted: show the embed only where the browser positively
  // confirms it can render PDFs (navigator.pdfViewerEnabled, Chrome 94+,
  // Firefox 94+, Safari 16.4+). Anything older or unknown gets the fallback
  // buttons, which always work — better than a blank grey box.
  if (navigator.pdfViewerEnabled !== true) {
    viewer.classList.add("is-unsupported");
  }
})();
