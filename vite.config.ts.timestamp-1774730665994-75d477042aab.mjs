// vite.config.ts
import { defineConfig } from "file:///D:/Antigravity/amazing/the-paxion/node_modules/vite/dist/node/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "file:///D:/Antigravity/amazing/the-paxion/node_modules/@vitejs/plugin-react/dist/index.js";
import electron from "file:///D:/Antigravity/amazing/the-paxion/node_modules/vite-plugin-electron/dist/simple.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Antigravity/amazing/the-paxion/vite.config.ts";
var _dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  server: {
    watch: {
      ignored: ["**/android/**", "**/release/**", "**/dist-electron/**"]
    }
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main.ts"
      },
      preload: {
        input: path.join(_dirname, "electron/preload.ts")
      },
      renderer: {}
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBbnRpZ3Jhdml0eVxcXFxhbWF6aW5nXFxcXHRoZS1wYXhpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFudGlncmF2aXR5XFxcXGFtYXppbmdcXFxcdGhlLXBheGlvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQW50aWdyYXZpdHkvYW1hemluZy90aGUtcGF4aW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBlbGVjdHJvbiBmcm9tICd2aXRlLXBsdWdpbi1lbGVjdHJvbi9zaW1wbGUnXG5cbmNvbnN0IF9kaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICBpZ25vcmVkOiBbJyoqL2FuZHJvaWQvKionLCAnKiovcmVsZWFzZS8qKicsICcqKi9kaXN0LWVsZWN0cm9uLyoqJ10sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZWxlY3Ryb24oe1xuICAgICAgbWFpbjoge1xuICAgICAgICBlbnRyeTogJ2VsZWN0cm9uL21haW4udHMnLFxuICAgICAgfSxcbiAgICAgIHByZWxvYWQ6IHtcbiAgICAgICAgaW5wdXQ6IHBhdGguam9pbihfZGlybmFtZSwgJ2VsZWN0cm9uL3ByZWxvYWQudHMnKSxcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjoge30sXG4gICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UixTQUFTLG9CQUFvQjtBQUMxVCxPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUo0SixJQUFNLDJDQUEyQztBQU1sTyxJQUFNLFdBQVcsS0FBSyxRQUFRLGNBQWMsd0NBQWUsQ0FBQztBQUc1RCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsaUJBQWlCLGlCQUFpQixxQkFBcUI7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxRQUNKLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxPQUFPLEtBQUssS0FBSyxVQUFVLHFCQUFxQjtBQUFBLE1BQ2xEO0FBQUEsTUFDQSxVQUFVLENBQUM7QUFBQSxJQUNiLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
