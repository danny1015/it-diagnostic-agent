# IT Diagnostic Agent 靜態網頁建置與操作手冊

版本：2026-07-03  
專案路徑：`C:\Users\danny.lin\Documents\IT Diagnostic Agent`  
GitHub Repository：`https://github.com/danny1015/it-diagnostic-agent`  
Cloudflare 發布型態：Workers Static Assets

## 1. 文件目的

本手冊整理 IT Diagnostic Agent 從本機維護、GitHub 版本管理、Cloudflare Workers Static Assets 發布，到網頁實際操作的完整流程。

這個專案是純靜態網站，核心檔案包含：

- `index.html`：主要 UI、互動邏輯、AI 設定、編輯器。
- `data/diagnostic-data.js`：發布版預設診斷資料。
- `assets/attachments/`：發布後所有人可讀取的圖片與附件。

## 2. 基本架構

使用者開啟網頁後，網站會先讀取 `data/diagnostic-data.js` 的預設診斷資料。若使用者在瀏覽器內編輯內容，變更會先存到該瀏覽器的 `localStorage`。

因此要讓所有人看到一致版本，必須把瀏覽器內的資料匯出為預設 JS，覆蓋到 `data/diagnostic-data.js`，再推送到 GitHub，最後由 Cloudflare Workers 重新部署靜態資產。

資料同步模式如下：

```text
本機瀏覽器編輯
  -> 匯出預設 JS
  -> 覆蓋 data/diagnostic-data.js
  -> git commit / push
  -> Cloudflare Workers Static Assets 自動部署
  -> 所有人開啟網站看到同一份預設資料
```

目前 Cloudflare 畫面雖然位於「Workers 和 Pages」區域，但專案顯示 Workers 日誌、Workers 追蹤與 `workers.dev` 網域，因此本手冊以 Workers Static Assets 流程為準。

## 3. 本機使用方式

### 3.1 直接開啟

可以直接雙擊：

```text
C:\Users\danny.lin\Documents\IT Diagnostic Agent\index.html
```

直接開啟適合快速查看，但若要測試圖片、附件或瀏覽器安全限制相關行為，建議使用本機 HTTP 預覽。

### 3.2 本機 HTTP 預覽

在專案目錄執行：

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

然後開啟：

```text
http://127.0.0.1:8765/index.html
```

這種方式最接近 Cloudflare Workers Static Assets 發布後的網站行為。

## 4. 網頁操作說明

### 4.1 切換語系

頁面提供中文與英文介面。切換語系後，主畫面與編輯視窗的標籤文字會同步切換。

### 4.2 AI Provider 與 API Key

右上角可設定 AI Provider、模型、Endpoint 與 API Key。API Key 只會儲存在目前瀏覽器的 `localStorage`，不會寫入 GitHub，也不會寫入 Cloudflare。

尚未設定 API Key 時，仍可瀏覽與編輯診斷樹；只有需要 AI 回覆時才需要設定。

### 4.3 進入編輯模式

點擊頁面上的「編輯」按鈕後，可以新增、修改、刪除分類、子分類與項目。

編輯模式下會出現：

- `+ 分類`
- `+ 子分類`
- `匯出 JSON`
- `匯出預設 JS`
- `匯入 JSON`
- `重設`
- 每個分類、子分類、項目旁的 `E` 或 `X`

### 4.4 新增分類

1. 點擊「編輯」。
2. 點擊「+ 分類」。
3. 輸入分類名稱、標題與描述。
4. 點擊「儲存」。

範例：新增「系統問題」。

### 4.5 修改或刪除分類

在編輯模式下：

- 點擊分類旁的 `E` 可修改分類。
- 點擊分類旁的 `X` 可刪除分類。

刪除分類會移除該分類下的項目，操作前請先確認已匯出備份。

### 4.6 新增子分類

1. 點擊「編輯」。
2. 點擊「+ 子分類」。
3. 選擇所屬分類。
4. 輸入子分類名稱。
5. 點擊「儲存」。

新增後，左側功能列會顯示該子分類。點擊子分類後，右側只會顯示該子分類內的項目。

### 4.7 修改或刪除子分類

在左側功能列的子分類旁：

- 點擊 `E` 可修改子分類名稱或所屬分類。
- 點擊 `X` 可刪除子分類。

刪除子分類時，該子分類下的項目會移到「未分類」。

### 4.8 新增項目

1. 點擊「編輯」。
2. 選擇要新增項目的分類或子分類。
3. 點擊「+ 項目」或分類中的新增按鈕。
4. 輸入項目標題、描述、內容。
5. 選擇分類與子分類。
6. 點擊「儲存」。

### 4.9 修改或刪除項目

在編輯模式下：

- 點擊項目卡片上的 `E` 可修改項目內容。
- 點擊項目卡片上的 `X` 可刪除項目。

### 4.10 拖拉排序與跨分類移動

在編輯模式下可以拖拉項目：

- 在同一分類內拖拉，可調整項目順序。
- 拖到左側其他分類，可移動到該分類的未分類區。
- 拖到左側其他子分類，可移動到該子分類。
- 可將「網路問題」的項目拖到「硬體問題」的子分類。

拖拉後資料會儲存在目前瀏覽器的 `localStorage`。若要讓所有人看到變更，仍需執行「匯出預設 JS」與發布流程。

### 4.11 新增圖片與附件

圖片與文件若要發布後所有人可看到，檔案必須放進：

```text
C:\Users\danny.lin\Documents\IT Diagnostic Agent\assets\attachments
```

操作步驟：

1. 將圖片或文件複製到 `assets/attachments/`。
2. 進入網頁並點擊「編輯」。
3. 點擊項目上的 `E`。
4. 在「附件」區塊點擊「+ 新增附件」。
5. 選擇「圖片」或「文件」。
6. 輸入顯示名稱。
7. 輸入相對路徑，例如：

```text
assets/attachments/R760xs-02.png
assets/attachments/IDC申請書.doc
```

8. 點擊「儲存」。

安全限制：附件路徑只接受相對路徑或 `http/https` 網址，不接受其他協定或 `//` 開頭的網址。

## 5. 匯出與匯入

### 5.1 匯出 JSON

「匯出 JSON」適合協作者之間交換資料。匯出的 JSON 代表目前瀏覽器中的診斷樹內容。

使用情境：

- 協作者新增或修改內容後，匯出 JSON 給主要維護者。
- 主要維護者匯入 JSON 檢查內容。
- 確認後再匯出預設 JS 並發布。

### 5.2 匯入 JSON

「匯入 JSON」會把 JSON 內容套用到目前瀏覽器。匯入後只是更新目前瀏覽器的 `localStorage`，不會自動修改 `data/diagnostic-data.js`。

匯入前建議先匯出 JSON 備份。

### 5.3 匯出預設 JS

「匯出預設 JS」會產生可覆蓋 `data/diagnostic-data.js` 的檔案。這是把瀏覽器內資料固化成發布版資料的關鍵步驟。

操作流程：

1. 在網頁確認內容正確。
2. 點擊「匯出預設 JS」。
3. 輸入新的資料版本號。
4. 下載產生的 `diagnostic-data.js`。
5. 覆蓋：

```text
C:\Users\danny.lin\Documents\IT Diagnostic Agent\data\diagnostic-data.js
```

6. 確認附件檔案也已放在 `assets/attachments/`。
7. 使用 GitHub 與 Cloudflare Workers 發布流程。

版本號建議由主要維護者在匯出預設 JS 時填入，例如：

```text
2026.07.03.1
```

不建議手動只改 `window.IT_DIAGNOSTIC_DATA_VERSION`，因為真正需要固化的是整份診斷樹資料，不只是版本字串。

## 6. 多人協作流程

建議使用「協作者匯出 JSON，主要維護者整合後發布」的模式。

```text
協作者
  -> 本機開啟網頁
  -> 編輯分類、子分類、項目、附件路徑
  -> 匯出 JSON
  -> 將 JSON 與附件檔交給主要維護者

主要維護者
  -> 匯入 JSON
  -> 檢查內容與附件
  -> 匯出預設 JS
  -> 覆蓋 data/diagnostic-data.js
  -> git commit / push
  -> Cloudflare Workers Static Assets 發布
```

若多人同時修改同一份資料，建議由主要維護者最後統整，避免互相覆蓋。

## 7. GitHub 版本管理流程

### 7.1 確認變更

在專案目錄執行：

```powershell
git status
git diff
```

確認只包含本次要發布的檔案，例如：

- `data/diagnostic-data.js`
- `index.html`
- `assets/attachments/...`
- `docs/...`
- `output/pdf/...`

### 7.2 加入暫存

```powershell
git add data/diagnostic-data.js index.html assets/attachments docs output/pdf
```

### 7.3 建立 Commit

```powershell
git commit -m "更新診斷資料與操作手冊"
```

### 7.4 推送 GitHub

```powershell
git push origin main
```

### 7.5 建立版本 Tag

若要建立版本標籤：

```powershell
git tag -a v0.6.0 -m "v0.6.0 - 新增附件與操作手冊"
git push origin v0.6.0
```

Tag 註解應包含：

- 與上一版相比新增哪些功能。
- 修改了哪些流程。
- 是否有資料格式變更。
- 是否需要 Cloudflare Workers 重新部署。

## 8. Cloudflare Workers Static Assets 建置流程

### 8.1 目前部署型態

依照目前 Cloudflare 畫面，`it-diagnostic-agent` 是 Workers 類型部署，並使用靜態資產提供網站內容。

畫面上可用以下線索判斷：

- 專案位於「Workers 和 Pages」。
- 專案卡片顯示 Workers 日誌與 Workers 追蹤。
- 右側顯示 `workers.dev` 網域。
- 版本紀錄出現 Cloudflare Workers configuration。
- 指標區提示靜態資產 Workers 不提供部分指標。

### 8.2 GitHub 連動部署

目前流程是 GitHub `main` 分支更新後，由 Cloudflare Workers 自動建立新版本。

操作流程：

1. 本機確認功能正常。
2. 將要發布的檔案 commit。
3. Push 到 GitHub `main`。
4. 到 Cloudflare 的 `it-diagnostic-agent` 專案。
5. 進入「部署」或「版本」檢查最新版本。
6. 確認最新版本對應剛剛 GitHub 的 commit message。
7. 開啟正式網域確認內容更新。

### 8.3 新部署與版本回復

Cloudflare Workers 會保留部署版本。若新版本有問題，可以在 Cloudflare 的版本紀錄中選擇先前版本進行回復。

回復前建議先確認：

- 回復版本的 commit message。
- 回復後是否會移除剛新增的診斷資料。
- 附件檔案是否仍存在於該版本。

### 8.4 自訂網域 dannylin.cc

目前正式網域可使用：

```text
itdiag.dannylin.cc
```

在 Cloudflare Workers 中，自訂網域通常會出現在「網域與路由」或「設定」相關頁面。

檢查方式：

1. 進入 Cloudflare。
2. 進入 Workers 和 Pages。
3. 選擇 `it-diagnostic-agent`。
4. 找到「網域與路由」或「設定」。
5. 確認自訂網域為 `itdiag.dannylin.cc`。
6. 確認該網域指向目前 Worker。

若要新增其他子網域，建議使用獨立子網域，例如：

```text
itdiag.dannylin.cc
```

避免影響主網域 `dannylin.cc` 的其他用途。

### 8.5 何時需要 Wrangler

目前若 Cloudflare 已經與 GitHub 連動，日常發布不需要在本機執行 Wrangler。

只有在以下情況才需要考慮 Wrangler：

- 要從本機手動部署 Worker。
- 要修改 Workers 專案設定檔。
- 要新增 Worker 端邏輯。

在目前純靜態網站情境下，最簡單流程仍是 GitHub push 後由 Cloudflare 自動部署。

## 9. Cloudflare 存取安全建議

若網站只給內部或指定人員使用，建議使用 Cloudflare Zero Trust Access。

最簡單的保護方式：

1. 進入 Cloudflare Zero Trust。
2. 建立 Access Application。
3. Application type 選 Self-hosted。
4. Domain 填入正式網域，例如 `itdiag.dannylin.cc`。
5. 建立 Policy，只允許指定 Email 或網域登入。

這種方式不需要改 `index.html`，也不需要自己維護登入系統。

注意：前端 API Key 不應放在網頁程式碼或 GitHub。若未來要集中管理 API Key，需要新增後端代理服務，不能只靠靜態網頁安全保存。

## 10. 發布前檢查清單

發布前請確認：

- 本機頁面可開啟。
- 分類、子分類、項目可新增、修改、刪除。
- 拖拉排序與跨分類移動正常。
- 附件圖片可以預覽。
- 文件附件可以開啟。
- 已匯出預設 JS 並覆蓋 `data/diagnostic-data.js`。
- 新增附件檔案已放在 `assets/attachments/`。
- `git status` 只包含預期檔案。
- Cloudflare Workers 最新版本部署成功。
- 正式網址可看到最新資料。

## 11. 常見問題

### 11.1 為什麼本機直接開 index.html 看不到我在預覽頁新增的項目？

因為不同網址來源會有不同的 `localStorage`。例如：

- `file:///C:/.../index.html`
- `http://127.0.0.1:8765/index.html`
- `https://itdiag.dannylin.cc`

這三個來源的瀏覽器儲存空間彼此獨立。要讓所有來源看到一致內容，必須匯出預設 JS、覆蓋 `data/diagnostic-data.js` 並發布。

### 11.2 覆蓋 data/diagnostic-data.js 後，所有人都會看到更新嗎？

會，但前提是：

- 已把檔案 commit 並 push 到 GitHub。
- Cloudflare Workers 已完成最新部署。
- 使用者重新整理頁面，必要時清除快取。

### 11.3 協作者給我 JSON，我是否要手動合併 tree？

最簡單安全的方式是先在網頁匯入 JSON，確認內容正確後，再用「匯出預設 JS」產生完整的 `diagnostic-data.js`。不建議手動複製大量 `tree` 內容，除非只是在處理很小的單筆修改。

### 11.4 圖片與附件發布後看不到怎麼辦？

請檢查：

- 檔案是否真的存在於 `assets/attachments/`。
- 項目內填寫的是相對路徑，例如 `assets/attachments/R760xs-02.png`。
- 檔案是否已 commit 並 push。
- Cloudflare Workers 是否已重新部署成功。
- 檔名大小寫是否一致。

### 11.5 需要自己寫登入頁嗎？

如果只是限制誰可以看網站，優先使用 Cloudflare Zero Trust Access。自己寫登入頁對純靜態網站不夠完整，因為沒有後端就無法真正保護靜態檔案。

## 12. 建議維護原則

- 內容修改先在本機測試。
- 對外發布前先匯出 JSON 備份。
- 要讓所有人看到的資料，一律固化到 `data/diagnostic-data.js`。
- 附件檔案一律放在 `assets/attachments/`。
- 大版本功能變更建立 Git Tag。
- Cloudflare Workers 從 GitHub `main` 分支部署。
- 不把任何私人 API Key 寫進 Repository。
