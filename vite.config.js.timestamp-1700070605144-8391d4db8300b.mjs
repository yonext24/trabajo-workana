// vite.config.js
import { defineConfig } from "file:///C:/Users/yonie/dev/trabajo-workana/node_modules/vite/dist/node/index.js";
import * as path from "path";
import react from "file:///C:/Users/yonie/dev/trabajo-workana/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\yonie\\dev\\trabajo-workana";
var vite_config_default = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/testing/setup.js"],
    testMatch: ["./src/testing/**/*.test.jsx"],
    globals: true
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 3e3
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5b25pZVxcXFxkZXZcXFxcdHJhYmFqby13b3JrYW5hXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5b25pZVxcXFxkZXZcXFxcdHJhYmFqby13b3JrYW5hXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy95b25pZS9kZXYvdHJhYmFqby13b3JrYW5hL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFsnLi9zcmMvdGVzdGluZy9zZXR1cC5qcyddLFxuICAgIHRlc3RNYXRjaDogWycuL3NyYy90ZXN0aW5nLyoqLyoudGVzdC5qc3gnXSxcbiAgICBnbG9iYWxzOiB0cnVlXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlXG4gICAgfSxcbiAgICBob3N0OiB0cnVlLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgcG9ydDogMzAwMFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSB9XVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxTQUFTLG9CQUFvQjtBQUMvVCxZQUFZLFVBQVU7QUFDdEIsT0FBTyxXQUFXO0FBRmxCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsd0JBQXdCO0FBQUEsSUFDckMsV0FBVyxDQUFDLDZCQUE2QjtBQUFBLElBQ3pDLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFrQixhQUFRLGtDQUFXLEtBQUssRUFBRSxDQUFDO0FBQUEsRUFDcEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
