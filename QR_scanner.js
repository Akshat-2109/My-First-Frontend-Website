// scanner.js

const scanResult = document.getElementById('scanResult');
const scanBox = document.getElementById('scanBox');

function onScanSuccess(decodedText, decodedResult) {
  scanResult.innerText = `✅ QR Code Detected: ${decodedText}`;
}

function onScanFailure(error) {
  console.warn(`QR Scan Error: ${error}`);
}

// Initialize scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  {
    fps: 10,
    qrbox: { width: 300, height: 300 },
    aspectRatio: 1.7777778
  },
  false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// Show scan box once camera starts
const observer = new MutationObserver(() => {
  const video = document.querySelector('#reader video');
  if (video && video.readyState >= 2) {
    scanBox.style.display = 'block';
    observer.disconnect();
  }
});

observer.observe(document.getElementById('reader'), {
  childList: true,
  subtree: true
});
