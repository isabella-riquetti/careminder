import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), ["VITE", ""]) };
  
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
  })
};