import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: process.env.TYPE_AUTH,
    user: process.env.USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export const sendEmail = async (req, res) => {
  try {
    let info = await transporter.sendMail(req.body);
    res.status(200).json({ info });
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
};
