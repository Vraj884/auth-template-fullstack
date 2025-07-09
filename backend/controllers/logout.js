export function logoutUser(req, res) {
  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "Strict" : "Lax",
    secure: isProd,
    path: "/", // ✅ This must match the path used during cookie creation
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({ success: true });
}
