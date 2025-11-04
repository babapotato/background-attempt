/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // If deploying to a subdirectory (e.g., https://username.github.io/repo-name/)
  // uncomment and set the basePath to your repository name:
  // basePath: '/repo-name',
  // If deploying to root (e.g., https://username.github.io/)
  // keep basePath commented out or set to empty string
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

