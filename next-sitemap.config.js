module.exports = {
    siteUrl: process.env.SITE_URL || 'https://we-t-ott.vercel.app',
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