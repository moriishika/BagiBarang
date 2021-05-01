const pwaConfig = require('next-pwa');

module.exports = pwaConfig({
    future: { webpack5: true },
    pwa: {
        dest: 'public'
    }
})