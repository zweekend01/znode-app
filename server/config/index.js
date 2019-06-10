module.exports = {
  SESSION_SECRET: 'ddhjsakdj&*%%jdksa347^^7dhjsahdk3434ajksdhjjsad',
  SESSION_UNLESS_PATH: [
    /^\/$/,
    /^\/api\/v1\/user\/register$/,
    /^\/api\/v1\/user\/login$/
  ],
  JWT_SECRET: 'jahsdja%923kajsd65%%&8780/-=1jas238940349',
  JWT_UNLESS_PATH: [
    /^\/login$/
  ],
  PWD_SECRET: 'ajshdkjas^$%$#99JJhjas**60sdjk$#$#0JHJhdkasdk'
}
