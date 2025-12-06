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
      "@marketplace": new URL("./packages/paylinq-marketplace/src", import.meta.url).pathname,
    };
    return config;
  },
};

export default nextConfig;
