import jwt from "jsonwebtoken"; 

export default function profileHandler(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ error: "Not logged in" });

  const data = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
  return res.status(200).json(data);
}