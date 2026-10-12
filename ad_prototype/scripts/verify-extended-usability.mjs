import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
const output=process.env.FEEDBACK_REVIEW_OUTPUT
if(!output) throw Error('FEEDBACK_REVIEW_OUTPUT is required')
await mkdir(output,{recursive:true})
const browser=await chromium.launch({headless:true,channel:'msedge'})
const report=[]
const name='우리동네정성가득한카페와베이커리'.repeat(18)
async function screenshot(page,label,width){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:join(output,`${label}-${width}.png`)})}
try {
  for(const width of [320,375,390,430,768,1024,1440]) {
    const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'})
    await page.goto('http://127.0.0.1:5173/')
    await page.getByRole('button',{name:'홍보물 만들기',exact:true}).click()
    await page.getByRole('dialog').getByRole('button',{name:'한 번에 완성',exact:true}).click()
    await page.getByLabel('제품 사진 올리기',{exact:true}).setInputFiles(fileURLToPath(new URL('../public/assets/samples/product-example.png',import.meta.url)))
    await page.getByRole('button',{name:'사진 확인하고 다음',exact:true}).click()
    await page.getByLabel('가게·제품 이름',{exact:true}).fill(name)
    const enteredName=await page.getByLabel('가게·제품 이름',{exact:true}).inputValue()
    const field=page.getByLabel('제품 설명',{exact:true})
    await field.fill('서울에서 매일 아침 직접 만든 빵과 향기로운 커피를 소개합니다.'.repeat(12))
    await page.getByLabel('강조할 특징',{exact:true}).fill('따뜻한 분위기에서 즐기는 신선한 커피와 빵입니다.'.repeat(8))
    const easy=await field.evaluate(el=>({font:parseFloat(getComputedStyle(el).fontSize),height:el.clientHeight,easy:!!el.closest('.easy-mode')}))
    await screenshot(page,'easy-information',width)
    if(width===320 || width===390) {
      await page.setViewportSize({width,height:450})
      for(const label of ['가게·제품 이름','제품 설명','강조할 특징']) {
        await page.getByLabel(label,{exact:true}).focus()
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
        const focus=await page.getByLabel(label,{exact:true}).evaluate(el=>{
          const box=el.getBoundingClientRect(),nav=document.querySelector('.studio-bottom-nav').getBoundingClientRect(),reading=document.querySelector('.studio-reading-bar').getBoundingClientRect()
          return {label:el.getAttribute('aria-label'),top:box.top,bottom:box.bottom,readingBottom:reading.bottom,navTop:nav.top,covered:box.top<reading.bottom || box.bottom>nav.top}
        })
        report.push({width,case:'short-focus',focus})
      }
      const action=page.getByRole('button',{name:'이 내용으로 결과 보기',exact:true})
      await action.focus()
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
      report.push({width,case:'short-action-focus',focus:await action.evaluate(el=>{const box=el.getBoundingClientRect(),nav=document.querySelector('.studio-bottom-nav').getBoundingClientRect(),reading=document.querySelector('.studio-reading-bar').getBoundingClientRect();return {top:box.top,bottom:box.bottom,readingBottom:reading.bottom,navTop:nav.top,covered:box.top<reading.bottom || box.bottom>nav.top}})})
      await page.screenshot({path:join(output,`short-focus-${width}.png`)})
      await page.setViewportSize({width,height:844})
    }
    await page.getByRole('button',{name:width<1024?'전체 메뉴 열기':'메뉴 열기',exact:true}).click()
    await page.getByRole('dialog').getByRole('switch',{name:'간편모드',exact:true}).click()
    await page.keyboard.press('Escape')
    const regular=await field.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))
    await page.getByRole('button',{name:'이 내용으로 결과 보기',exact:true}).click()
    await page.locator('#result-poster img[src^="blob:"]').waitFor()
    await page.getByRole('tab',{name:'영상',exact:true}).click()
    await screenshot(page,'long-video',width)
    const caption=await page.locator('.result-motion-preview > strong').evaluate(el=>{
      const box=el.getBoundingClientRect(), parent=el.parentElement.getBoundingClientRect()
      return {text:el.textContent,top:box.top,bottom:box.bottom,left:box.left,right:box.right,parentTop:parent.top,parentBottom:parent.bottom,parentLeft:parent.left,parentRight:parent.right,clipped:box.top<parent.top || box.bottom>parent.bottom || box.left<parent.left || box.right>parent.right}
    })
    await page.getByRole('tab',{name:'문구',exact:true}).click()
    assert.ok((await page.getByLabel('홍보 문구 원문',{exact:true}).inputValue()).includes(enteredName))
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)
    report.push({width,case:'long-name',easy,regular,caption,overflow})
    await page.getByRole('button',{name:'내용 다시 수정하기',exact:true}).click()
    await page.getByLabel('가게·제품 이름',{exact:true}).fill('')
    await page.getByRole('button',{name:'이 내용으로 결과 보기',exact:true}).click()
    await page.getByRole('tab',{name:'영상',exact:true}).click()
    await screenshot(page,'long-feature-video',width)
    const fallback=await page.locator('.result-motion-preview > strong').evaluate(el=>{const box=el.getBoundingClientRect(),parent=el.parentElement.getBoundingClientRect();return {height:box.height,parentHeight:parent.height,clipped:box.top<parent.top || box.bottom>parent.bottom,text:el.textContent}})
    report.push({width,case:'long-features',easy,regular,caption:fallback,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)})
    await page.close()
  }
  await writeFile(join(output,'extended.json'),JSON.stringify(report,null,2))
  console.log(JSON.stringify(report.map(r=>({width:r.width,case:r.case,easyFont:r.easy?.font,regularFont:r.regular,captionClipped:r.caption?.clipped,covered:r.focus?.covered,overflow:r.overflow})),null,2))
  if(process.env.ASSERT_EXTENDED==='1') for(const row of report){if(row.case.includes('focus')){assert.ok(!row.focus.covered);continue}assert.ok(row.easy.font>row.regular);assert.ok(!row.caption.clipped);assert.ok(!row.overflow)}
} finally {await browser.close()}
