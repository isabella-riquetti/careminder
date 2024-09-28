import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), ["VITE", ""]) };
  
  return defineConfig({
    optimizeDeps: {
      include: ['@mui/icons-material']
    },
    plugins: [react(), tsconfigPaths(), svgr()],
  })
};