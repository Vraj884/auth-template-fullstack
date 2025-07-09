import Usermodel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }
    try {
        const user = await Usermodel.findOne({ email });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
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
        res.status(200).json({ success: true });
        return;
    } catch (e) {
        res.status(500).json({ error: e.message });
        return;
    }
}