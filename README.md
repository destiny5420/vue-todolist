# vue-todolist

![產品頁面](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/todolist_banner.png)

## Demo

[夢想清單 2.0](destiny5420.github.io/vue-todolist/)

## 簡介

此為前端知名練習作品之一「TodoList」，主要實踐功能如下：

- 表單的新增、刪除、修正
- 使用 [json-server](https://www.npmjs.com/package/json-server) 做資料儲存功能
- 使用 [firebase](https://firebase.google.com/)的做資料儲存
- [vue-router]](https://router.vuejs.org) 做「所有清單」與「完成清單」的頁面切換
- 使用 [vuex](https://vuex.vuejs.org) 做前台資料管理
- 使用 [vue-axios](https://www.npmjs.com/package/vue-axios) 做 ajax
- 前台 sass 手刻效果

## 內容

### 所有清單

使用 vue router 切換來讀取「所有項目」清單
![所有清單](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/all-list.png)

### 完成清單

使用 vue router 切換來讀取「完成事項」清單
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

### Json server configure

1. 因該項目使用[json-server](https://www.npmjs.com/package/json-server)作為儲存資料的方式，須先確認該電腦環境已安裝 json-server

```
npm install -g json-server
```

2. 使用 npm install 安裝該專案依賴的 package

```
npm install
```

3. 此專案 json-server 預設的 port 為 8888，如該 port 已被佔用，可至 root 資料夾下的 json-server.json 修改，另外在.env.development 與.env.production 中，VUE_APP_HOST 的 port 也須修正一致。且須將 VUE_APP_DATABASE_TYPE 設置為 JsonServer

![jsonserver-configure](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/project-setting-json-server.png)

4. 開啟 json-server

```
npm run open-db
```

5. 編譯 development

```
npm run serve
```

### Firebase server configure

1. 須將在.env.development 與.env.production 的 VUE_APP_DATABASE_TYPE 設置為 Firebase

2. 須將 VUE_APP_HOST 設定為 Server 的路徑，此專案的預設為 Firebase 的設定

![firebase-configure](https://github.com/destiny5420/vue-todolist/blob/develop/page_source/project-setting-firebase-server.png)

# 結語

這個練習中可以熟悉 Vue、Vue-Router、Vuex 這三大套件的使用，並使用 json-server 簡易的練習操作 API，因本次的 css 部分是搭配 sass 來製作，以及自行手刻所有樣式以及效果，增加不少對於 css 的熟悉度。

在製作的過程中，遇到一個比較大的問題是在「新增事項」時，因想實作「點擊空白區域時自動關閉輸入面板」功能時，詢問到不同的作法。

比較尷尬的問題是，第一點「+」按鈕會在打開的時候將一個「是否面板打開」的 flag 做切換，第二點「點擊空白區域關閉」的功能會在面板打開的時候，才去做觸發，第三點剛好「+」號的按鈕也符合「空白區域」的條件。所以會發生當按下+號按鈕時，剛好又觸發了「關閉面板事件」，後來因為面板有做 alpha 的淡入，所以後來用了 alpha 來做判斷而解決了這個問題

[點擊『空白區域實作』關閉面板](https://codepen.io/paper_hsiao/pen/KKzVYXy?fbclid=IwAR2bQ5hrcuIh_ThHY_du5iTEKXsJbiwwsHN9N729P7AEbST9PP9ruAJEtSM)

在後續也使用了 Node.js 寫了一個簡易的 Server，搭配 Google 的 Firebase 當作資料庫，並佈署到 Google 的 GCP 平台上，讓使用者不用再下載專案即可使用此專案的功能。

# 待優化事項

- [ ] 更新、刪除尋找對應 ID 的演算法優化
- [x] 使用 Node.js 建置 Server，並使用 Firebase 當作資料庫
