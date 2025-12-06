CREATE TABLE `talents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `icon_url` VARCHAR(255) DEFAULT NULL,
  `youtube_profile` varchar(512) NOT NULL DEFAULT '',
  `official_profile` text NOT NULL,
  `youtube_channel_id` varchar(100) NOT NULL DEFAULT '',
  `twitch_user_id` varchar(100) NOT NULL DEFAULT '',
  `twitch_login` VARCHAR(50) NOT NULL DEFAULT '',
  `youtube_url` varchar(250) NULL,
  `twitch_url` VARCHAR(255) NULL,
  `x_url` VARCHAR(255) NULL,
  `x_sub_url` VARCHAR(255) NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `archives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `outer_link` varchar(255) NOT NULL DEFAULT '',
  `talent_id` int NOT NULL,
  `video_title` varchar(255) NOT NULL,
  `video_thumbnail` varchar(255) NOT NULL,
  `open_date` datetime(6),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `nowstreamings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `outer_link` varchar(255) NOT NULL DEFAULT '',
  `talent_id` int NOT NULL,
  `video_title` varchar(255) NOT NULL,
  `video_thumbnail` varchar(512) NOT NULL,
  `open_date` datetime(6),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `talents` (`name`, `icon_url`, `youtube_profile`, `official_profile`,`youtube_channel_id`,`twitch_user_id`,`twitch_login`,`youtube_url`,`twitch_url`,`x_url`,`x_sub_url`) VALUES
('花芽すみれ','http://localhost:4000/talent-icons/kagasumire.jpg','おいす～花芽すみれです。 ゲームが好きです👾💤','花芽姉妹の姉。普段は落ち着いているが、たまにハイテンションで無邪気な一面も。なんでもそつなくこなす器用な女の子。「ぶいすぽっ！」の天才(?)兼ポンコツ担当。FPSゲームでは持ち前のエイムを生かした爽快感抜群のプレーを見せる。','UCyLGcqYs7RsBb3L0SJfzGYA','695556933','kagasumire','https://www.youtube.com/@KagaSumire','https://www.twitch.tv/kagasumire','https://x.com/sumire_kaga','https://x.com/Sumire_00'),
('花芽なずな','http://localhost:4000/talent-icons/kaganazuna.jpg','ぶいすぽ所属最年少!5歳可愛い担当花芽なずな好きなゲームはFPS全般!↓主にプレイするゲーム【COD、PUBG、APEX、R6s、VALORANT、CSGO、スプラトゥーン、シャドーバース】よかったらチャンネル登録してね☆','きゃっほー☆きらりんぶぃ!ゲームの中でも特にFPSが大好きで、FPS系ゲームのプレイ時間は全VTuberの中でもトップクラス。本人はいたって真面目だが、いつもおちゃらけているように見られる。自称「ぶいすぽっ!」の姫','UCiMG6VdScBabPhJ1ZtaVmbw','790167759','nazunakaga','https://www.youtube.com/@nazunakaga','https://www.twitch.tv/nazunakaga/schedule','https://x.com/nazuna_kaga','https://x.com/nazupiii'),
('小雀とと','http://localhost:4000/talent-icons/kogaratoto.jpg','はじめまして✨ぶいすぽっ！の小雀ととです☺ゲームをメインに、歌ったりしながら活動してます！仲良くしてくれると嬉しいです～！','LVGで1番のマイペース。癒やし系の声が特徴で、いつもまったりとした雰囲気に包まれている。どのFPSでもスナイパー系の武器が大の得意で、敵に吸い付くようなエイムが見ていて癖になる。','UCgTzsBI0DIRopMylJEDqnog','','','https://www.youtube.com/@totokogara','','https://x.com/toto_kogara',''),
('一ノ瀬うるは','http://localhost:4000/talent-icons/ichinoseuruha.jpg','はじめまして、一ノ瀬うるはです。2019.4/19VTuberになりました。よろしくお願いします。(@Vspo77)所属。✦ゲームが好きです。FPSも好きだけどパズルゲームとかも好き、頭のひらめきは悪い。話すもの好きです。なんでもない話を一生します。','LVG唯一のツッコミ担当。それゆえに花芽姉妹の暴走を止めることも多い。歯に衣着せぬ物言いに定評がある。極度の人見知りで、口癖は「マジ」と「ガチ」。','UC5LyYg6cCA4yHEYvtUsir3g','582689327','uruhaichinose','https://www.youtube.com/@uruhaichinose','https://www.twitch.tv/uruhaichinose','https://x.com/uruha_ichinose','https://x.com/uruhasub'),
('胡桃のあ','http://localhost:4000/talent-icons/kuruminoa.jpg','','よく笑いよく泣く僕っこVTuberで、天真爛漫な声と性格は周りの人を笑顔にする。ゲームへの向上心が高く、常に上達を目指し取り組んでいる。','UCIcAj6WkJ8vZ7DeJVgmeqKw','600770697','963noah','https://www.youtube.com/@963Noah','https://www.twitch.tv/963noah','https://x.com/n0ah_kurumi','https://x.com/963Noah_sub'),
('兎咲ミミ','http://localhost:4000/talent-icons/tosakimimi.jpg','はじめまして、ぶいすぽ所属の兎咲ミミです。ゲーム配信をメインにいろいろな活動をしていきたいな～って思ってます。よかったらチャンネル登録してね！','大きなウサミミ型の髪飾りが特徴。物静かでおとなしい性格をしているが、胸に秘めた思いは強い。ありとあらゆる種類のゲームをプレイしている。','UCnvVG9RbOW3J6Ifqo-zKLiw','','','https://x.com/mimi_tosaki','','https://x.com/mimi_tosaki',''),
('空澄セナ','http://localhost:4000/talent-icons/asumisena.jpg','空高く羽ばたきたい。ぶいすぽっ！ の 所属Vtuberの空澄セナ(Asumi Sena)です。ゲーム.雑談.歌いろんな事します。活動を通して成長していきたいので、面倒みてやってください。','異国の美少女小悪魔ライバー。活動的な性格で、やると決めた事は納得いくまでやる努力家。自称「ぶいすぽっ！」の儚い担当で、人を喜ばせることが大好き。','UCF_U2GCKHvDz52jWdizppIA','776751504','asumisena','https://www.youtube.com/@asumi_sena','https://www.twitch.tv/asumisena','https://x.com/sena_asumi','https://x.com/Asumi__sub'),
('橘ひなの','http://localhost:4000/talent-icons/tachibanahinano.jpg','💜Twitterhttps://twitter.com/hinano_tachiba7୨୧･･･････････････････････････････୨୧୨୧･･･････････････････････････････୨୧','ゲームと歌が大好きな、寂しがり屋な女の子。「Apex Legends」の腕前は「ぶいすぽっ！」でも随一で、ゲーム内の最高ランクに到達したこともある。','UCvUc0m317LWTTPZoBQV479A','568682215','hinanotachiba7','https://www.youtube.com/@hinanotachiba7','https://www.twitch.tv/hinanotachiba7','https://x.com/hinano_tachiba7','https://x.com/hinano__otaku'),
('英リサ','http://localhost:4000/talent-icons/hanabusalisa.jpg','💐バーチャルお嬢様の英(はなぶさ)リサです！💐6月3日生まれ 身長160㎝ 趣味：お絵かき、ゲーム、おいしい食事貯蓄：5000000億見ている人が楽しくなるような配信を目指しています！よかったらTwitterとyoutubeのフォロー、チャンネル登録お願いします','お絵かき、ゲーム、おいしいご飯が大好きなバーチャルお嬢様。食べ物の話をしているときは目が輝いている。元気で真面目な性格をしているが、ポンコツな一面も…。','UCurEA8YoqFwimJcAuSHU0MQ','777700650','lisahanabusa','https://www.youtube.com/@lisahanabusa','https://www.twitch.tv/lisahanabusa','https://x.com/Lisa_hanabusa','https://x.com/hanalisa_sub'),
('如月れん','http://localhost:4000/talent-icons/kisaragiren.jpg','ぶいすぽっ！Iris Black games所属 如月れん配信タグ:#放れん送ファンアートタグ（活動に使用させていただく場合がございます）:#れん絡帳察しろ:#ポリエチれんファンネーム:#れん帯責任推しマーク:⏰','「ぶいすぽっ！」では貴重なクールキャラ。ゲームはあまり得意ではないが、仲間と共に上達していきたいという意志を持っている。','UCGWa1dMU_sDCaRQjdabsVgg','722162135','ren_kisaragi__','https://www.youtube.com/@ren_kisaragi__','https://www.twitch.tv/ren_kisaragi__','https://x.com/ren_kisaragi__','https://x.com/sleeping_ren'),
('神成きゅぴ','http://localhost:4000/talent-icons/kaminariqpi.jpg','˗ˋˏ ぶいすぽっ！所属 ˎˊ˗神成きゅぴ🌩(Kaminari Qpi）↳ 褐色ギャルVtuber 5/18生まれ みんなに少しでも元気をお届けできたら神成はそれで幸せ～！仲良くしてね🤞','エナドリを愛する褐色ギャル。お調子者だが根は真面目で努力は惜しまない。','UCMp55EbT_ZlqiMS3lCj01BQ','550676410','kaminariqpi','https://www.youtube.com/@KaminariQpi','https://www.twitch.tv/kaminariqpi','https://x.com/KaminariQpi',''),
('八雲べに','http://localhost:4000/talent-icons/yakumobeni.jpg','皆さん初めまして💄♡ぶいすぽっ！所属の 八雲べに（yakumo beni ）です〜〜！！オシャレとゲームと甘いものが大好き💗皆さんと、楽しい時間を過ごしていきたいですっ！よろしくお願いします٩(^‿^)۶💚誕生日：9/25身長：158cm好きな食べ物：チョコミント　うな重','甘いものが大好き、おしゃれでクールな女の子。しかしゲームに対する考え方は甘くない。勝ち負けにこだわり、練習量で他に差をつけていくスタイル。密かにぶいすぽのセクシー枠を狙っているらしい…','UCjXBuHmWkieBApgBhDuJMMQ','','','https://www.youtube.com/@%E5%85%AB%E9%9B%B2%E3%81%B9%E3%81%AB','','https://x.com/beni_yakumo','https://x.com/896_beni'),
('藍沢エマ','http://localhost:4000/talent-icons/aizawaema.jpg','ぶいすぽ所属の藍沢エマです🌸誕生日：1/31　水瓶座 ♒趣　味：ねこすい好きな食べ物：パンよろしくお願いします！','パンと猫がすきな女の子。ゲームの腕を上げる為に日々奮闘中。清楚キャラを目指しているが果たして…？','UCPkKpOHxEDcwmUAnRpIu-Ng','848822715','emtsmaru','https://www.youtube.com/@AizawaEma','https://www.twitch.tv/emtsmaru','https://x.com/Ema_Aizawa','https://x.com/subzawa_ovo'),
('紫宮るな','http://localhost:4000/talent-icons/sinomiyaruna.jpg','はじめまして！ぶいすぽっ！所属の 紫宮るな(shinomiya runa)です🌙一緒に楽しいことしたいです！よろしくお願いします🙇‍♀️誕生日：2月22日身長：147cm好きなもの：ゲーム　猫　アイドル','ぶいすぽ1小さなおとなしい女の子。か弱い見た目とは裏腹にFPSのセンスは抜群。ゲームが好きで時間を忘れて没頭してしまう。配信時間の長さはぶいすぽトップクラス。','UCD5W21JqNMv_tV9nfjvF9sw','773185713','shinomiya_runa','https://www.youtube.com/@shinomiyaruna','https://www.twitch.tv/shinomiya_runa','https://x.com/Runa_shinomiyA','https://x.com/SRuna_sub'),
('猫汰つな','http://localhost:4000/talent-icons/nekotatuna.jpg','ぶいすぽっ！所属の 猫汰つな(nekota tsuna)です！','天真爛漫で情熱的な女の子。好きなことにはとことん夢中になれる性格。圧倒的な練習量とセンスから生み出されるゲームプレイは人を惹きつける。実はきゅうりが苦手。','UCIjdfjcSaEgdjwbgjxC3ZWg','858359105','tsuna_nekota','https://www.youtube.com/@tsuna_nekota','https://www.twitch.tv/tsuna_nekota','https://x.com/tsuna_nekota','https://x.com/neko_tatsuna'),
('白波らむね','http://localhost:4000/talent-icons/shiranamiramune.jpg','ぶいすぽっ！所属Vtuberの 白波らむね(Shiranami Ramune)です！！！誕生日：３月２１日身長：１５３ｃｍ好きな物：海、たこ焼き、映画','天性の人懐っこさを持っている陽気な女の子。いつも楽しそうにゲームをしていて、ぶいすぽに対する憧れや情熱は人一倍強い。','UC61OwuYOVuKkpKnid-43Twg','858359149','ramuneshiranami','https://www.youtube.com/@shiranamiramune','https://www.twitch.tv/ramuneshiranami','https://x.com/Ramune_Shirana3','https://x.com/withshiratama'),
('小森めと','http://localhost:4000/talent-icons/komorimeto.jpg','小森めとです','宇宙から放り投げられてやってきた、ぶいすぽの引きこもりニート担当候補。数々のFPSタイトルをプレイしてきており、培われたゲームセンスは一級品。','UCzUNASdzI4PV5SlqtYwAkKQ','801682194','met_komori','https://www.youtube.com/@Met_Komori','https://www.twitch.tv/met_komori','https://x.com/Met_Komori','https://x.com/No1NEEEEET'),
('夢野あかり','http://localhost:4000/talent-icons/yumenoakari.jpg','Twitter🍼https://twitter.com/AKARINdaooo ,Twitch🍼https://www.twitch.tv/akarindao','あかりん星のトップ、元気いっぱいの女の子。何事にも真っ直ぐ真剣に取り組むが、空回りしてしまう不憫な一面が見えることもしばしば…。','UCS5l_Y0oMVTjEos2LuyeSZQ','584184005','akarindao','https://www.youtube.com/@akarindao','https://www.twitch.tv/akarindao','https://x.com/AKARINdaooo',''),
('夜乃くろむ','http://localhost:4000/talent-icons/yanokuromu.jpg','','子供っぽく見られがちだが、実は芯の強いしっかり者。ファッションやお絵描きが好きでクリエイター気質な一面も。将来の夢は素敵な大人のおねいさん。','UCX4WL24YEOUYd7qDsFSLDOw','1250148772','kuromuyano','https://www.youtube.com/@YanoKuromu','https://www.twitch.tv/kuromuyano','https://x.com/kuromu_yano','https://x.com/kuromu_y_sub'),
('紡木こかげ','http://localhost:4000/talent-icons/tsumugikokage.jpg','ぶいすぽっ！所属、紡木こかげです📘💧FPSと食べ物が大好き！','素直で涙もろい女の子。FPSだけは飽きずに続けられたという無類のゲーム好き。食べることも大好きで、アニメを見ながらご飯を食べている時間が人生で一番幸せらしい｡','UC-WX1CXssCtCtc2TNIRnJzg','1184405770','kokagetsumugi','https://www.youtube.com/@Kokage_Tsumugi','https://www.twitch.tv/kokagetsumugi','https://x.com/kokage_tsumugi','https://x.com/tumuohakusai'),
('千燈ゆうひ','http://localhost:4000/talent-icons/sendoyuuhi.jpg','ぶいすぽっ！所属、女子高生(?)担当、千燈ゆうひ(Sendo Yuuhi)です！あさ9時頃～よる18時間に配信をすることを得意としています🐠たまに夜にも配信するよ　日曜日は基本おやすみ！皆さんと一緒に楽しい時間を共有したいと思っています😳よろしくお願いいたします🌇身長 → 159cm誕生日 → 12月3日好きなもの → LoL、いろんなゲームカラーコード → # ED784A','ネットの海から這い上がってきた女の子。FPSから逃げ、これまでの人生のほとんどをMOBAに費やしてきた。女子高校生の可能性がある。','UCuDY3ibSP2MFRgf7eo3cojg','1097252496','sendo_yuuhi','https://www.youtube.com/@SendoYuuhi','https://www.twitch.tv/sendo_yuuhi','https://x.com/yuuhi_sendo','https://x.com/1010U1_'),
('蝶屋はなび','http://localhost:4000/talent-icons/choyahanabi.jpg','','元気さと誠実さを兼ね備えた、文武両道ガール。何事にも全力、猪突猛進スタイル。好きな食べ物はめっちゃたこ焼き','UCL9hJsdk9eQa0IlWbFB2oRg','','','https://www.youtube.com/@HanabiChoya','','https://x.com/Hanabi_Choya','https://x.com/Hanabi_C_sub'),
('甘結もか','http://localhost:4000/talent-icons/amayuimoka.jpg','','格闘ゲームに人生を捧げる女の子。穏やかな話し方の反面、好きなことに対しては納得がいくまで突き詰めるストイックな性格。集中しすぎるあまりそれ以外のことは頭から抜けてしまうことも。','UC8vKBjGY2HVfbW9GAmgikWw','','','https://www.youtube.com/@Moka_Amayui','','https://x.com/Amayui_Moka','https://x.com/hachimitsuWaro');