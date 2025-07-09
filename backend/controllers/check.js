import jwt from "jsonwebtoken";

export async function checkAuth(req, res) {
    const token = req.cookies.refreshToken;
    console.log("Checking");
        
    if (!token) {
        return res.sendStatus(401); // ✅ 401 Unauthorized - no token
    }

    try {
        jwt.verify(token, process.env.REFRESH_KEY);
        return res.sendStatus(200); // ✅ 200 OK - token valid
    } catch (e) {
        return res.sendStatus(403); // ✅ 403 Forbidden - token invalid/expired
    }
}
