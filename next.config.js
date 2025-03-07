/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'book-official.vercel.app'],
        unoptimized: true,
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.join(__dirname)
        return config
    }
}

module.exports = nextConfig