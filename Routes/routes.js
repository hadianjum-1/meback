const express = require('express');
const router = express.Router();
const userModel = require('../Models/ship');

// Create user
router.post("/", async (req, res) => {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = new userModel({
            Name: name,
            Address: address,
            phone: phone
        });
        await user.save();

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
            to: "contact.mezalya@gmail.com",
            subject: "New Order Received",
            html: `
                <h2>New Order Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Address:</strong> ${address}</p>
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
