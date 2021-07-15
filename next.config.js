const pwaConfig = require('next-pwa'); 

module.exports = pwaConfig({
    webpack5: true,
    pwa: {
        dest: 'public'
    }
})