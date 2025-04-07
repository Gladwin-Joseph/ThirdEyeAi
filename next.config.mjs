let userConfig = undefined;
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs');
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack(config, { isServer }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // Configure SVGR for SVG components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      cleanupIDs: false,
                    },
                  },
                },
                'removeXMLProcInst', // Remove XML declaration
                'removeComments', // Remove comments
              ],
            },
          },
        },
      ],
    });

    // Reapply the existing rule for SVG URLs (*.svg?url)
    if (fileLoaderRule) {
      config.module.rules.push({
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      });
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  }
};

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig;

  // Handle webpack configuration merging specially
  if (config.webpack) {
    const originalWebpack = nextConfig.webpack;
    nextConfig.webpack = (webpackConfig, options) => {
      if (originalWebpack) {
        webpackConfig = originalWebpack(webpackConfig, options);
      }
      return config.webpack(webpackConfig, options);
    };
  }

  for (const key in config) {
    if (key !== 'webpack') {
      if (
        typeof nextConfig[key] === 'object' &&
        !Array.isArray(nextConfig[key]) &&
        config[key] !== null
      ) {
        nextConfig[key] = {
          ...nextConfig[key],
          ...config[key],
        };
      } else {
        nextConfig[key] = config[key];
      }
    }
  }
}

export default nextConfig;