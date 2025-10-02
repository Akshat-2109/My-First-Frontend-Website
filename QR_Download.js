const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("qrCanvas");
const formatSelect = document.getElementById("formatSelect");

downloadBtn.addEventListener("click", () => {
  if (downloadBtn.disabled) return;

  const format = formatSelect.value;
  const mimeType = `image/${format === "jpg" ? "jpeg" : format}`;
  const dataURL = canvas.toDataURL(mimeType);

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `qr-code.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
