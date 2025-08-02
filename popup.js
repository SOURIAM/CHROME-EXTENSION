document.getElementById("sendOtp").onclick = () => {
  const email = document.getElementById("email").value;
  if (!email) return alert("Enter your email");

  chrome.runtime.sendMessage({ action: "sendOtp", email }, (response) => {
    console.log(response);
    if (response.success) {
      document.getElementById("otp-input").classList.remove("hidden");
    } else {
      alert(response.message);
    }
  });
};

document.getElementById("verifyOtp").onclick = () => {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  if (!otp) return alert("Enter the OTP");

  chrome.runtime.sendMessage({ action: "verifyOtp", email, otp }, (response) => {
    console.log(response);
    if (response.success) {
      showProfile(response); // Comes from profile.js
    } else {
      alert(response.message);
    }
  });
};