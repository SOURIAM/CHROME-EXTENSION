const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const User = require("../server/models/User");        // adjust path if needed
const Credential = require("../server/models/Credential");

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/jongopass", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Admin Dashboard connected to DB"))
  .catch(err => console.log(err));

// Home -> Redirect to Users
app.get("/", (req, res) => res.redirect("/users"));

// Users page
app.get("/users", async (req, res) => {
    const users = await User.find({}, { email: 1, otp: 1, otpExpiry: 1, _id: 0 });
    res.render("users", { users });
});

// OTP logs
app.get("/otps", async (req, res) => {
    const users = await User.find({}, { email: 1, otp: 1, otpExpiry: 1, _id: 0 });
    res.render("otps", { users });
});

// Login events (here we can display credentials access logs)
app.get("/logins", async (req, res) => {
    const creds = await Credential.find({}, { domain: 1, userId: 1 });
    res.render("logins", { creds });
});

const PORT = process.env.ADMIN_PORT || 4000;
app.listen(PORT, () => console.log('Admin Dashboard running on port ${PORT}'));