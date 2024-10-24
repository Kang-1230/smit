/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkzghifllapgjxacdfbr.supabase.co",
        pathname: "/storage/v1/object/public/profile_img/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
