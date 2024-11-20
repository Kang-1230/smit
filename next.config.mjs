/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkzghifllapgjxacdfbr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // 모든 경로에 Cache-Control 헤더를 적용
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=0, must-revalidate", // 원하는 Cache-Control 값 설정
          },
        ],
      },
    ];
  },
};

export default nextConfig;
