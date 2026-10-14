import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import cookie from 'cookie';

// Ensure .env variables are available to serverless API functions during local dev
function initLocalEnv() {
  try {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  } catch (err) {
    console.warn('Failed to parse .env in vite.config.ts:', err);
  }
}

initLocalEnv();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-handler-mongodb',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url || !req.url.startsWith('/api')) {
            return next();
          }

          try {
            // 1. Buffer and parse request body for mutating HTTP methods
            let body: any = {};
            if (
              req.method === 'POST' ||
              req.method === 'PATCH' ||
              req.method === 'PUT' ||
              req.method === 'DELETE'
            ) {
              const buffers: Buffer[] = [];
              for await (const chunk of req) {
                buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              const rawBody = Buffer.concat(buffers).toString('utf-8');
              if (rawBody.trim()) {
                try {
                  body = JSON.parse(rawBody);
                } catch {
                  body = rawBody;
                }
              }
            }

            // 2. Parse URL query parameters
            const parsedUrl = new URL(req.url, 'http://localhost');
            const query: Record<string, string> = {};
            parsedUrl.searchParams.forEach((val, k) => {
              query[k] = val;
            });

            // 3. Decorate req for Vercel Request interface
            (req as any).body = body;
            (req as any).query = query;
            (req as any).cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

            // 4. Decorate res for Vercel Response interface
            (res as any).status = function (code: number) {
              res.statusCode = code;
              return res;
            };
            (res as any).json = function (data: any) {
              if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
              }
              res.end(JSON.stringify(data));
              return res;
            };

            // 5. Match route to API handler
            const pathname = parsedUrl.pathname;
            let modulePath = '';

            if (pathname === '/api/leads') {
              modulePath = path.resolve(__dirname, 'api/leads.ts');
            } else if (pathname === '/api/admin/leads') {
              modulePath = path.resolve(__dirname, 'api/admin/leads.ts');
            } else if (pathname === '/api/admin/stats') {
              modulePath = path.resolve(__dirname, 'api/admin/stats.ts');
            } else if (pathname === '/api/auth/login') {
              modulePath = path.resolve(__dirname, 'api/auth/login.ts');
            } else if (pathname === '/api/auth/logout') {
              modulePath = path.resolve(__dirname, 'api/auth/logout.ts');
            } else if (pathname === '/api/auth/session') {
              modulePath = path.resolve(__dirname, 'api/auth/session.ts');
            }

            if (modulePath && fs.existsSync(modulePath)) {
              const mod = await server.ssrLoadModule(modulePath);
              if (typeof mod.default === 'function') {
                await mod.default(req, res);
                return;
              }
            }

            // Fallback for unhandled API route
            res.statusCode = 404;
            (res as any).json({ success: false, error: `API route ${pathname} not found` });
          } catch (err: any) {
            console.error('[API Dev Server Error]:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              (res as any).json({ success: false, error: err?.message || 'Server error' });
            }
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three'],
          gsap: ['gsap'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
