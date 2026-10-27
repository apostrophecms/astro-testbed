import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import apostrophe from '@apostrophecms/apostrophe-astro';

// Hostnames Astro may trust in X-Forwarded-Host. Behind a proxy, Astro builds
// the request origin for its CSRF check from that header; without a match,
// same-host form posts, uploads and logout are rejected as cross-site
const allowedDomains = (process.env.APOS_ALLOWED_DOMAINS || '**.apos.dev')
  .split(',')
  .map(hostname => ({
    hostname: hostname.trim(),
    protocol: 'https'
  }));

// https://astro.build/config
export default defineConfig({
  output: "server",
  security: {
    allowedDomains
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    // Required for some hosting, like Heroku
    // host: true
  },
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [apostrophe({
    aposHost: 'http://localhost:3000',
    widgetsMapping: './src/widgets',
    templatesMapping: './src/templates',
    includeResponseHeaders: [
      'content-security-policy',
      'strict-transport-security',
      'x-frame-options',
      'referrer-policy',
      'cache-control'
    ],
    excludeRequestHeaders: [
      // For hosting on multiple servers, block the host header
      // 'host'
    ]
  })],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    },
    ssr: {
      // Do not externalize the @apostrophecms/apostrophe-astro plugin, we need
      // to be able to use virtual: URLs there
      noExternal: ['@apostrophecms/apostrophe-astro']
    }
  }
});