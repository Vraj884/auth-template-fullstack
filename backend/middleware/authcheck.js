import jwt from "jsonwebtoken";

export function verifyAccessToken(
    req,
    res,
    next
) {
    const token = req.cookies.accessToken;

    if (!token) {
        res.status(401).json({ error: "Access token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTKEY); 

        req.email = decoded.email;

        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired access token" });
        return;
    }
}