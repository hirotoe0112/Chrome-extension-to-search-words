const id = "SaveSearchWordsToNotion"

chrome.contextMenus.onClicked.addListener(search)

function search(info){
    switch (info.menuItemId) {
        case id:
            // 選択された文字列を取得
            const word = info.selectionText
            // フォーマットする
            const searchWord = formatWord(word)
            // ロングマン英英辞典で検索
            chrome.tabs.create({
                url: `https://www.ldoceonline.com/jp/dictionary/${searchWord}`
            })
            break
        default:
            break
    }
}

chrome.runtime.onInstalled.addListener(function() {
    const menu = chrome.contextMenus.create({
        id: id,
        title: "Search this word and save to Notion",
        contexts: ["all"]
    })
})

function formatWord(word) {
    let newWord = word
    // スペースをハイフンに置き換え
    newWord = newWord.replace(/\s+/g,'-')

    return newWord
}