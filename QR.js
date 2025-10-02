// qr.js

const inputBox = document.getElementById("inputBox");
const inputLabel = document.getElementById("inputLabel");
const qrImage = document.getElementById("qrImage");
const fileUpload = document.getElementById("fileUpload");
const infoText = document.getElementById("infoText");
const createBtn = document.getElementById("createBtn");

document.querySelectorAll(".qr-type-selector button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".qr-type-selector button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;
    let labelText = "Enter ";
    let placeholder = "";
    let showFile = false;

    switch (type) {
      case "url": labelText += "URL:"; placeholder = "https://example.com"; break;
      case "pdf": labelText += "Upload PDF:"; showFile = true; break;
      case "multi-url": labelText += "Multiple URLs:"; placeholder = "url1, url2"; break;
      case "contact": labelText += "Upload Contact (.vcf):"; showFile = true; break;
      case "text": labelText += "Text:"; placeholder = "Your message"; break;
      case "image": labelText += "Upload Image:"; showFile = true; break;
      case "app": labelText += "App Link:"; placeholder = "https://play.google.com/..."; break;
      case "sms": labelText += "SMS Number & Message:"; placeholder = "1234567890: Message"; break;
      case "email": labelText += "Email Address:"; placeholder = "someone@example.com"; break;
      case "phone": labelText += "Phone Number:"; placeholder = "+123456789"; break;
    }

    inputLabel.textContent = labelText;

    if (showFile) {
      inputBox.style.display = "none";
      fileUpload.style.display = "block";
    } else {
      inputBox.style.display = "block";
      fileUpload.style.display = "none";
      inputBox.placeholder = placeholder;
      inputBox.value = "";
    }

    createBtn.style.display = "none";
    qrImage.style.display = "none";
    infoText.style.display = "block";
    infoText.textContent = "📷 QR will preview here";

    const downloadBtn = document.getElementById("downloadBtn");
    const formatOptions = document.getElementById("formatOptions");
    downloadBtn.classList.remove("enabled");
    downloadBtn.disabled = true;
    formatOptions.classList.add("hidden");
  });
});

inputBox.addEventListener("input", () => {
  createBtn.style.display = inputBox.value.trim() ? "inline-block" : "none";
});

fileUpload.addEventListener("change", () => {
  const activeBtn = document.querySelector(".qr-type-selector button.active");
  const type = activeBtn ? activeBtn.dataset.type : "";
  const file = fileUpload.files[0];
  if (!file) return;

  const allowedTypes = {
    pdf: ['application/pdf'],
    image: ['image/png', 'image/jpeg', 'image/jpg'],
    contact: ['text/vcard', 'application/vcard']
  };

  const fileType = file.type;

  if (type === "pdf" && !allowedTypes.pdf.includes(fileType)) {
    alert("❌ Please upload a valid PDF file.");
    fileUpload.value = "";
    createBtn.style.display = "none";
    return;
  }

  if (type === "image" && !allowedTypes.image.includes(fileType)) {
    alert("❌ Please upload a valid image (PNG, JPG, JPEG).");
    fileUpload.value = "";
    createBtn.style.display = "none";
    return;
  }

  if (type === "contact" && !allowedTypes.contact.includes(fileType)) {
    alert("❌ Please upload a valid .vcf contact file.");
    fileUpload.value = "";
    createBtn.style.display = "none";
    return;
  }

  createBtn.style.display = "inline-block";
});

createBtn.addEventListener("click", () => {
  let data = "";
  if (fileUpload.style.display === "block" && fileUpload.files.length > 0) {
    alert("⚠️ Backend not implemented — using filename as QR content.");
    data = fileUpload.files[0].name;
  } else {
    data = inputBox.value.trim();
  }

  if (!data) return;

  const canvas = document.getElementById("qrCanvas");
  const infoText = document.getElementById("infoText");

  QRCode.toCanvas(canvas, data, { width: 200, margin: 1 }, function (error) {
    if (error) {
      console.error(error);
      return;
    }

    canvas.style.display = "block";
    infoText.style.display = "none";

    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.disabled = false;
    downloadBtn.classList.add("enabled");

    const formatOptions = document.getElementById("formatOptions");
    formatOptions.classList.remove("hidden");
  });
});
