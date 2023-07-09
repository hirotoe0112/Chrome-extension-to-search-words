const id = "SaveSearchWordsToNotion"

chrome.contextMenus.onClicked.addListener(search)
chrome.runtime.onMessage.addListener(save)

// コンテキストメニュークリック時の処理
function search(info, tab){
    switch (info.menuItemId) {
        case id:
            // 選択された文字列を取得
            const word = info.selectionText
            // フォーマットする
            const searchWord = formatWord(word)
            // urlの組み立て
            const url = `https://www.ldoceonline.com/jp/dictionary/${searchWord}`
            // ロングマン英英辞典で検索
            chrome.tabs.create({
                url: url
            })
            // content scriptに通知を送信
            chrome.tabs.sendMessage(tab.id, {
                message: "saveWord",
                url: url,
                word: searchWord
            })
            break
        default:
            break
    }
}

function save(req, sender, res){
    res("finish")
}

// インストール時のみコンテキストメニューに追加
chrome.runtime.onInstalled.addListener(function() {
    const menu = chrome.contextMenus.create({
        id: id,
        title: "Search this word and save to Notion",
        contexts: ["all"]
    })
})

// 文字列フォーマット
function formatWord(word) {
    let newWord = word
    // スペースをハイフンに置き換え
    newWord = newWord.replace(/\s+/g,'-')
    // 小文字に変換
    newWord = newWord.toLowerCase()

    return newWord
}