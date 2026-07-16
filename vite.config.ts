import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          runtimeErrorOverlay(),
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-framer";
          // @floating-ui is a peer dependency of @radix-ui and must be grouped
          // with it. It MUST be listed before the react/react-dom checks below
          // because @floating-ui/react-dom contains "/react-dom/" in its path,
          // which would otherwise accidentally route it into the vendor-react
          // chunk and corrupt that chunk's CJS interop exports — causing the
          // runtime error: Cannot set properties of undefined (setting 'Children')
          if (id.includes("@radix-ui") || id.includes("@floating-ui")) return "vendor-radix";
          if (id.includes("lucide-react") || id.includes("react-icons")) return "vendor-icons";
          if (id.includes("@tanstack")) return "vendor-query";
          // Use a regex anchored to the package boundary so packages whose names
          // merely contain "react" or "react-dom" as a substring (e.g.
          // @floating-ui/react-dom) are never accidentally placed here.
          if (/[/\\]node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) return "vendor-react";
          if (id.includes("zod") || id.includes("react-hook-form") || id.includes("@hookform")) return "vendor-forms";
          return "vendor";
        },
      },
    },
  },
  server: {
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
