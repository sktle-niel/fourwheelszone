const URL = process.argv[2] || "http://localhost:5173/"
const OUT = process.argv[3] || ".fullpage.png"
const selector = process.argv[4]
const CDP = "http://127.0.0.1:9222"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const res = await fetch(`${CDP}/json/new?${encodeURIComponent(URL)}`, { method: "PUT" })
const target = await res.json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
function rpc(method, params = {}) {
  return new Promise((resolve) => {
    const msgId = ++id
    const onMsg = (ev) => {
      const d = JSON.parse(ev.data)
      if (d.id === msgId) { ws.removeEventListener("message", onMsg); resolve(d.result) }
    }
    ws.addEventListener("message", onMsg)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}

const VW = Number(process.env.W || 1366)
await rpc("Page.enable")
await rpc("Runtime.enable")
await rpc("Emulation.setDeviceMetricsOverride", { width: VW, height: 900, deviceScaleFactor: 1, mobile: VW < 600 })
await rpc("Page.navigate", { url: URL })
await sleep(3500)
await rpc("Runtime.evaluate", {
  awaitPromise: true,
  expression: `(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));const h=document.body.scrollHeight;for(let y=0;y<=h;y+=350){window.scrollTo(0,y);await s(70)}window.scrollTo(0,0);await s(900)})()`,
})

let clip
if (selector) {
  const { result } = await rpc("Runtime.evaluate", {
    returnByValue: true,
    expression: `(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return null;const r=el.getBoundingClientRect();return{x:0,y:r.top+window.scrollY,width:window.innerWidth,height:r.height}})()`,
  })
  clip = result.value
}
if (!clip) {
  const { cssContentSize } = await rpc("Page.getLayoutMetrics")
  clip = { x: 0, y: 0, width: Math.ceil(cssContentSize.width), height: Math.ceil(cssContentSize.height) }
}
clip.scale = 1
const { data } = await rpc("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip })
const fs = await import("node:fs")
fs.writeFileSync(OUT, Buffer.from(data, "base64"))
console.log(`saved ${OUT} (${clip.width}x${clip.height})`)
ws.close()
process.exit(0)
