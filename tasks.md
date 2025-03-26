## 予定(箇条書き)

### 配信ページ

- 過去配信一覧

  - youtube
    - 全体ページ用に全員から計30件
  - twitch
    - 全体ページ用に全員から計30件
  - FEページ作成

- タレント詳細ページ
  - youtube
    - 個人ページは30取得GET
  - twitch
    - 個人ページは30取得GET
  - FEページ作成
    - css
- 配信予定一覧

  - ライブ配信
    - youtube
    - twitch
  - 配信予定枠
    - youtube
    - twitch
  - FEページ作成
    - css

- タレント一覧

  - DBから全タレントの情報を取得
  - FEページ作成
    - css

- 検索結果ページ

  - youtube
  - twitch
  - FEページ作成
    - css
  - 検索機能､youtubeAPIを叩くか､DBにいれるか要検討

- DB各項目登録(1日)
- AWS
- ページ遷移作成
- 検索機能追加

- youtubeapi各チャネルからのアーカイブライブ配信取得
  curl \
   'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCIjdfjcSaEgdjwbgjxC3ZWg&eventType=completed&maxResults=25&q=VSPO!%20SHOWDOWN&type=video&key=[YOUR_API_KEY]' \
   --header 'Accept: application/json' \
   --compressed
