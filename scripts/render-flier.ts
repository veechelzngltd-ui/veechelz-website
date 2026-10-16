/**
 * Playwright script to screenshot the Veechelz flier page
 * Renders to out/veechelz-flier.png at 1080x1350px
 *
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. Run this script: npx tsx scripts/render-flier.ts
 */

import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { existsSync, mkdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PROJECT_ROOT = resolve(__dirname, '..')
const OUTPUT_DIR = resolve(PROJECT_ROOT, 'out')
const OUTPUT_PATH = resolve(OUTPUT_DIR, 'veechelz-flier.png')
const DEV_SERVER_URL = 'http://localhost:3002/flier'

async function renderFlier() {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log('🎬 Starting flier render...')
  console.log(`📐 Canvas: 1080x1350px (4:5)`)
  console.log(`🔗 Target: ${DEV_SERVER_URL}`)
  console.log(`💾 Output: ${OUTPUT_PATH}`)

  const browser = await chromium.launch({
    headless: true,
  })

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  })

  const page = await context.newPage()

  try {
    // Navigate to the flier page
    console.log('📄 Loading page...')
    await page.goto(DEV_SERVER_URL, {
      waitUntil: 'networkidle',
      timeout: 30000,
    })

    // Wait for fonts to load
    await page.evaluate(async () => {
      await document.fonts.ready
    })

    // Wait a bit more for any images/animations to settle
    await page.waitForTimeout(1000)

    // Take screenshot
    console.log('📸 Capturing screenshot...')
    await page.screenshot({
      path: OUTPUT_PATH,
      fullPage: false, // We only want the viewport
      clip: {
        x: 0,
        y: 0,
        width: 1080,
        height: 1350,
      },
    })

    console.log('✅ Screenshot saved!')
    console.log(`📁 ${OUTPUT_PATH}`)

    // Verify file exists and has content
    const fs = await import('fs')
    const stats = fs.statSync(OUTPUT_PATH)
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(1)} KB`)

  } catch (error) {
    console.error('❌ Render failed:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

renderFlier()