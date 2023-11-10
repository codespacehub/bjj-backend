export default () => ({
  jwtAuth: {
    expiresIn: 3600,
    jwtSecret: process.env.JWT_SECRET,
  },
  mail: {
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    globalMail: {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
    },
  },
});
