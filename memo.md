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

- DB各項目登録
- AWS
- ページ遷移作成
- 検索機能追加

## 外部API

- 外部API結果のDBテーブル設計
- youtubeから一時間ごとに取得
  - APIの結果をDBにINSERTする
    - INSERTした値へのAPI作成
- Twitchから一時間ごとに取得
  - APIの結果をDBにINSERTする
    - INSERTした値へのAPI作成

## テストコード実装

- フロントエンド側(どこまで書くか検討)
- バックエンド側(どこまで書くか検討､単体テストが理想)

## めも

- youtubeapi各チャネルからのアーカイブライブ配信取得
  curl \
   'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCIjdfjcSaEgdjwbgjxC3ZWg&eventType=completed&maxResults=25&q=VSPO!%20SHOWDOWN&type=video&key=[YOUR_API_KEY]' \
   --header 'Accept: application/json' \
   --compressed
- youtubeAPIを使用時､検索キーワードと関連がない結果が返却される
  - 返却された値から必要なチャンネルをチャンネルIDで絞り込み
  - youtubeを使わない
  - 上記対策の結論→ぶいすぽで検索(1時間に1回)→取得したものから自身のDBの保持しているチャンネルIDを持っているものだけをDBの挿入FEにはDBに対してSELECTするyoutubeコストは2400に抑えれる
- ゲームテーブルいる?必要と思ったのは検索機能のためいらない理由配信タイトルにゲーム名が記載されているためdbから検索したらヒットするタレントゲームテーブルも必要ない?タレントyoutubeIDテーブルの2個あれば十分では?
- Twitch､youtubeからの値を入れるテーブルカラム構成にプラットフォーム欄作成
- ぶいすぽメンバーのチャンネルIDをカラムに追加
- 合計23タスク3ヶ月(12周)
- TwitchAPI でのアクセストークンを保有するためのテーブルがいるのでは?

- twitchIDの取得用curl
  curl -s "https://api.twitch.tv/helix/users?login=sendo_yuuhi" \
   -H "Client-Id: ausz28vzv65omy4jf7nh1paredyf9t" \
   -H "Authorization: Bearer wxb7zp52t4qh0e3xrkaat6dvff8p8i
  "
