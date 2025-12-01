const express = require('express');
const router = express.Router();
const userModel = require('../Models/ship');

router.get("/home", (req, res) => {
    res.send("hi I am Home page");
});

// Create user
router.post("/", async (req, res) => {
    const { Name, Address, phone } = req.body;

    if (!Name || !Address || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Save to MongoDB
        const user = new userModel({
            Name,
            Address,
            phone
        });
        await user.save();

        // Send email
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message = {
            from: process.env.EMAIL_USER,
            to: "contact.mezalya@gmail.com",  // the email that receives the order
            subject: "🚀 New Order Received",
            html: `
                <h2>New Order Details</h2>
                <p><strong>Name:</strong> ${Name}</p>
                <p><strong>Address:</strong> ${Address}</p>
                <p><strong>Phone:</strong> ${phone}</p>
            `
        };

        await transporter.sendMail(message);

        res.status(201).json({
            message: "User created and email sent",
            data: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
