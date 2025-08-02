// Background service worker for JongoPass
chrome.runtime.onInstalled.addListener(() => {
    console.log("JongoPass extension installed successfully.");
});

// This can be used later for OTP notifications or handling events

const backendUrl = "http://localhost:3000";

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendOtp") {
    fetch('${backendUrl}/api/send-otp', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: request.email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Show a Chrome notification
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "JongoPass OTP Sent",
            message: 'OTP sent to ${request.email}',
            priority: 2
          });
        }
        sendResponse(data);
      })
      .catch(err => sendResponse({ success: false, message: err.message }));

    return true; // Keep the message channel open for async
  }

  if (request.action === "verifyOtp") {
    fetch('${backendUrl}/api/verify-otp', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: request.email, otp: request.otp })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "JongoPass Verified",
            message: "OTP verified successfully! Profile ready.",
            priority: 2
          });
        }
        sendResponse(data);
      })
      .catch(err => sendResponse({ success: false, message: err.message }));

    return true;
  }
});

fetch("http://localhost:3000/api/send-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com" })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);