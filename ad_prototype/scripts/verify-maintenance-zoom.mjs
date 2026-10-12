import { chromium } from 'playwright'
import { mkdir,writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
const output=process.env.FEEDBACK_REVIEW_OUTPUT
if(!output) throw Error('FEEDBACK_REVIEW_OUTPUT is required')
await mkdir(output,{recursive:true})
const reports=[]
for(const zoom of [100,200]) {
  const profile=join(output,`browser-profile-${zoom}`)
  await mkdir(join(profile,'Default'),{recursive:true})
  await writeFile(join(profile,'Default','Preferences'),JSON.stringify({partition:{default_zoom_level:{x:Math.log(zoom/100)/Math.log(1.2)}}}))
  const context=await chromium.launchPersistentContext(profile,{channel:'msedge',headless:true,viewport:null,args:['--window-size=1440,1000'],reducedMotion:'reduce'})
  try {
    const page=await context.newPage()
    // Native browser zoom is not a Playwright deviceScaleFactor override.
    // Capture the compositor surface without a CSS-pixel clip, which can crop it.
    const cdp=await context.newCDPSession(page)
    const capture=async name=>{
      const screenshot=await cdp.send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false})
      await writeFile(join(output,`${name}-${zoom}.png`),Buffer.from(screenshot.data,'base64'))
    }
    await page.goto('http://127.0.0.1:5173/')
    const metrics=await page.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio}))
    await capture('home')
    await page.getByRole('button',{name:'홍보물 만들기',exact:true}).click()
    await page.getByRole('dialog').getByRole('button',{name:'한 번에 완성',exact:true}).click()
    await page.locator('#product-photo').setInputFiles(fileURLToPath(new URL('../public/assets/samples/product-example.png',import.meta.url)))
    await page.getByRole('button',{name:'사진 확인하고 다음',exact:true}).click()
    await page.getByLabel('가게·제품 이름',{exact:true}).fill('우리동네 빵집')
    await page.getByLabel('제품 설명',{exact:true}).fill('정성을 담아 만든 빵')
    await page.getByLabel('강조할 특징',{exact:true}).fill('따뜻한 동네 가게')
    await capture('information')
    await page.getByRole('button',{name:'이 내용으로 결과 보기',exact:true}).click()
    await page.getByRole('tab',{name:'문구',exact:true}).click()
    const copy=page.getByRole('button',{name:'문구 전체 복사하기',exact:true})
    await copy.focus()
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
    const visibility=await copy.evaluate(el=>{const r=el.getBoundingClientRect(),nav=document.querySelector('.studio-bottom-nav').getBoundingClientRect(),reading=document.querySelector('.studio-reading-bar').getBoundingClientRect();return {top:r.top,bottom:r.bottom,upper:reading.bottom,lower:nav.height?nav.top:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth}})
    assert.ok(!visibility.overflow)
    assert.ok(visibility.top>=visibility.upper && visibility.bottom<=visibility.lower)
    await capture('copy-action')
    reports.push({zoom,metrics,visibility})
  } finally {await context.close()}
}
assert.ok(reports[1].metrics.dpr>reports[0].metrics.dpr*1.8)
assert.ok(reports[1].metrics.width<reports[0].metrics.width*.6)
await writeFile(join(output,'zoom.json'),JSON.stringify(reports,null,2))
console.log(JSON.stringify(reports,null,2))
