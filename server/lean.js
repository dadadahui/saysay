var AV = require ('leanengine')

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'nhKwEEEgzby6qiIn3Far8LoC-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'j9DjWm5Jf6crfxtu3Hvehi4p',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '1F3g50pfEgcTnXElpLsvGxxH'
})


module.exports= AV;
