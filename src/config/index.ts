export default () => ({
  jwtAuth: {
    expiresIn: 3600,
    jwtSecret:
      '7afdec9d711948f59943fbe9ad82eefe0ccd6ec3208944079986290944f3364f',
  },
  mail: {
    port: 587,
    host: 'smtp.office365.com',
    globalMail: {
      user: 'andreypp@hotmail.com',
      password: 'R@afa151203',
    },
  },
});
