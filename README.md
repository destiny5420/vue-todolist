# vue-todolist
![產品頁面](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/todolist_banner.png)

## 簡介
此為前端知名練習作品之一「TodoList」，主要實踐功能如下：
* 表單的新增、刪除、修正
* 使用 [json-server](https://www.npmjs.com/package/json-server) 做資料儲存功能
* [Vue Router](https://router.vuejs.org) 做「所有清單」與「完成清單」的頁面切換
* 使用 [Vuex](https://vuex.vuejs.org) 做前台資料管理
* 使用 [vue-axios](https://www.npmjs.com/package/vue-axios) 與 [json-server](https://www.npmjs.com/package/json-server) 做資料存取
* 前台sass手刻效果

## 內容
### 所有清單
使用vue router切換來讀取「所有項目」清單
![所有清單](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/all-list.png)

### 完成清單
使用vue router切換來讀取「完成事項」清單
![完成清單](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/done-list.png)

### 新增事項
點選「＋」號來跳出面板, 讓用戶可以在輸入框新增事項
![新增事項](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/create.png)

### 刪除事項
點選該行項目的垃圾桶圖示，可執行「刪除」行為
![刪除事項](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/delete.png)

### 清單事項修正
當用戶對項目名稱「點擊兩次左鍵」，可修正該項目的名稱內容
![清單事項修正](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/editor.png)

# 專案設置
1. 因該項目使用[json-server](https://www.npmjs.com/package/json-server)作為儲存資料的方式，須先確認該電腦環境已安裝json-server
```
npm install -g json-server
```

2. 使用npm install安裝該專案依賴的package
```
npm install
```

3. 此專案json-server預設的port為8888，如該port已被佔用，可至root資料夾下的json-server.json修改，另外在.env.development與.env.production也須修正
![ProjectSetting](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/project-setting.png)

4. 開啟json-server
```
npm run open-db
```

5. 編譯development
```
npm run serve
```

# 結語
這個練習中可以熟悉Vue、Vue-Router、Vuex這三大套件的使用，並使用json-server簡易的練習操作API，因本次的css部分是搭配sass來製作，以及自行手刻所有樣式以及效果，增加不少對於css的熟悉度。

在製作的過程中，遇到一個比較大的問題是在「新增事項」時，因想實作「點擊空白區域時自動關閉輸入面板」功能時，詢問到不同的作法。

比較尷尬的問題是，第一點「+」按鈕會在打開的時候將一個「是否面板打開」的flag做切換，第二點「點擊空白區域關閉」的功能會在面板打開的時候，才去做觸發，第三點剛好「+」號的按鈕也符合「空白區域」的條件。所以會發生當按下+號按鈕時，剛好又觸發了「關閉面板事件」，後來因為面板有做alpha的淡入，所以後來用了alpha來做判斷而解決了這個問題

# 待優化事項
* 更新、刪除尋找對應ID的演算法優化
* 新增使用Local Storage來做儲存資料方式，簡化Demo流程