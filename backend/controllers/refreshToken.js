import jwt from "jsonwebtoken";

export function refreshAccessToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.sendStatus(401); // No refresh token
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

        const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWTKEY, {
            expiresIn: "15m"
        });
        const isProd = process.env.NODE_ENV === "production";


        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: isProd ? "Strict" : "Lax",
            path: "/",
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.sendStatus(200); // Access token refreshed
        return;
    } catch (err) {
        res.sendStatus(403); // Invalid or expired refresh token
        return;
    }
}