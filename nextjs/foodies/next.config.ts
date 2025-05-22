import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ebonet-nextjs-demo-users-image.s3.us-east-2.amazonaws.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
