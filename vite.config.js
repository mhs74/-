import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages(https://mhs74.github.io/-/)처럼 하위 경로에 배포할 때는 BASE_PATH 로 경로를 지정합니다.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
