// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@marketplace": new URL("./components/Marketplace", import.meta.url).pathname,
    };
    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Admin Portal Rewrites for "admin.getpaylinq.com"
        {
          // Catch-all for other admin routes (dashboard, merchants, etc.)
          // EXCLUDE /api so that calls to /api/users (Global) fall through to the root app
          // EXCLUDE /sign-in and /sign-up so they render the main app's auth pages instead of 404ing on /admin/sign-in
          source: "/:path((?!_next|favicon.ico|api|sign-in|sign-up|admin).*)",
          has: [{ type: "host", value: "admin.getpaylinq.com" }],
          destination: "/admin/:path*",
        },


        // Admin Portal Rewrites for "admin.localhost"
        {
          source: "/:path((?!_next|favicon.ico|api|sign-in|sign-up|admin).*)",
          has: [{ type: "host", value: "admin.localhost" }],
          destination: "/admin/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
