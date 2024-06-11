export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/posts-with-pagination/' : '/',
  build: {
    outDir: 'docs',

  }
})