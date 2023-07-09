chrome.runtime.onMessage.addListener(async function(req, sender, res) {
    if(req.message === "saveWord"){
        // ロングマンのURLにアクセス
        const res = await fetch(req.url)
        const text = await res.text()
        const dom = new DOMParser().parseFromString(text, "text/html")
        // 定義部分を全取得
        //const defs = dom.querySelectorAll(`#${req.word}__1 .DEF`)
        const defs = dom.querySelectorAll(`.DEF`)
        // innerTextのみ配列にする
        const defTexts = []
        for(const def of defs){
            defTexts.push(def.innerText)
        }
        console.log(defTexts)
        chrome.runtime.sendMessage({body: defTexts},
            function(response){})
    }
})