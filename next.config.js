const pwaConfig = require('next-pwa'); 

module.exports = pwaConfig({
    pwa: {
        dest: 'public'
    }
})