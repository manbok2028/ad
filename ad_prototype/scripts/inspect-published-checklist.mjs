import { chromium } from 'playwright'
import { mkdir,writeFile } from 'node:fs/promises'
import { join } from 'node:path'
const output=process.env.FEEDBACK_REVIEW_OUTPUT
if(!output) throw Error('FEEDBACK_REVIEW_OUTPUT is required')
await mkdir(output,{recursive:true})
const browser=await chromium.launch({channel:'msedge',headless:true})
const report=[]
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'})
    const response=await page.goto('https://ad-prototype-codyssey.vercel.app/',{waitUntil:'domcontentloaded',timeout:30000})
    await page.locator('main').first().waitFor({timeout:15000})
    await page.screenshot({path:join(output,`published-home-${width}.png`)})
    const state=await page.evaluate(()=>({title:document.title,text:document.body.innerText.slice(0,2400),bottomNav:[...document.querySelectorAll('.studio-bottom-nav')].filter(el=>el.checkVisibility()).map(el=>({names:[...el.querySelectorAll('button')].map(b=>b.innerText),position:getComputedStyle(el).position})),scripts:[...document.scripts].map(s=>s.getAttribute('src')).filter(Boolean)}))
    const menu=page.getByRole('button',{name:'메뉴 열기',exact:true})
    if(await menu.count()) {await menu.click();await page.screenshot({path:join(output,`published-menu-${width}.png`)})}
    report.push({width,status:response.status(),url:page.url(),...state})
    await page.close()
  }
  await writeFile(join(output,'published.json'),JSON.stringify(report,null,2))
  console.log(JSON.stringify(report,null,2))
} finally {await browser.close()}
