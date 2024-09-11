/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/sumarit",
  output: 'export',
  async redirects() {
    return [
      {
        source: "/",
        destination: "/scores",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
