module.exports = {
    siteUrl: process.env.SITE_URL || 'http://ott-we-t.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}