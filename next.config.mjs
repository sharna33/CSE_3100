/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
