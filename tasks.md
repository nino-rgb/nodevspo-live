# やることリスト

ぶいすぽライブを開発するに当たり､必要なタスクの洗い出し､スケジュール作成する際の指針とするため

## 機能一覧

### 配信予定or配信中の一覧を表示する

- 対象は全てのぶいすぽメンバーを含めた､上位30件を表示する
- 最大1ページ30件表示､ページング可能
- 表示順序は配信開始時間の降順とする(未来時間含む)
- 行がクリックされた場合､Twitch or youtubeに遷移する
- キーワードでの絞り込みが可能(あいまい検索)

### 配信済み一覧を表示する

- 対象は全てのぶいすぽメンバーを含めた､上位30件を表示する
- 最大1ページ30件表示､ページング可能
- 表示順序は配信開始時間の降順とする
- 行がクリックされた場合､Twitch or youtubeに遷移する
- キーワードでの絞り込みが可能(あいまい検索)

### 配信検索結果一覧を表示する

- キーワードでの絞り込みが可能(あいまい検索)
  - タレント名､ゲームタイトルetc
- 最大1ページ30件表示､ページング可能
- 行がクリックされた場合､Twitch or youtubeに遷移する

### タレント一覧を表示する

- デフォルトでは､デビューが早い順で表示
- 最大1ページ15件表示､ページング可能
- タレント名での絞り込みが可能(前方一致)

### タレントの詳細を表示する

- 以下の情報を表示する
  - タレント名
  - タレントのサムネイル
  - 公式紹介文
  - 各SNSアカウントへのリンク
- タレントの配信動画の一覧を表示する
  - 最大1ページ15件表示､ページング可能

## タスク一覧

### 配信予定or配信中の一覧を表示する

#### 外部API

- 外部APIの技術検証 10日
- 配信テーブルの作成 1日
- 1時間毎に外部APIにリクエストし結果を格納する youtube7日､Twitch7日
- APIの結果をDBに保存する 4日

#### BE

- 「配信予定or配信中」取得APIの作成 3日

#### FE

- 「配信予定or配信中」画面の作成 7日

### 配信済み一覧を表示する

#### BE

- 「配信済み一覧」取得APIの作成 3日

#### FE

- 「配信済み一覧」画面の作成 5日

### 配信検索結果一覧を表示する

#### BE

- 「配信検索結果一覧」取得APIの作成 3日

#### FE

- 「配信検索結果一覧」画面の作成 5日

### タレント一覧を表示する

#### BE

- 「タレント一覧」取得APIの作成 3日
- 「タレント一覧」検索APIの作成 3日

#### FE

- 「タレント一覧」画面の作成 6日

### タレントの詳細を表示する

#### BE

- 「タレント詳細」取得APIの作成 3日
- タレント個人の配信一覧を取得するAPIの作成 3日

#### FE

- 「タレント詳細」画面の作成 6日

### インフラの作成

- AWSアカウントの作成
- VPC､ネットワークテーブルの設定
- EC2の立ち上げ
- S3パケットの作成
- RDSの設定
- スケジューラーの設定（場合によっては不要）
- デプロイ
