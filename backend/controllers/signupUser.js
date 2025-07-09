import Usermodel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { log } from "console";


export async function signupUser(req, res) {
    try {
        const { name, email, password, dob } = req.body;
        log(req.body);
        if (!name || !email || !password || !dob) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: "User already exists" });
            return;
        }

        const newUser = new Usermodel({
            name,
            email,
            password: hashedPass,
            dob
        });

        await newUser.save();

        const accessToken = jwt.sign({ email }, process.env.JWTKEY, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_KEY, { expiresIn: "7d" });

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "Strict" : "Lax",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "Strict" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });


        res.sendStatus(201);
        return;
    } catch (e) {
        res.status(500).json({ error: e.message });
        return;
    }
}