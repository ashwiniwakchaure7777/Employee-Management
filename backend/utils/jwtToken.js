const generateToken = (admin, message, statusCode, res) => {
  const token = admin.generateJsonWebToken();
  const cookieName = "adminToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({ success: true, message, admin, token });
};

export default generateToken;
