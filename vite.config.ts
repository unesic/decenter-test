import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr({ include: '**/*.svg' })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		},
	},
});
