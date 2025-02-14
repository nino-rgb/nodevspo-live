CREATE TABLE `talents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `youtube_profile` varchar(150) text NOT NULL,
  `official_profile` varchar(150) text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `talents_games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `talents_id` int(50) NOT NULL,
  `games_id` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (talents_id) REFERENCES product_master (id) ON DELETE CASCADE,
  FOREIGN KEY (games_id) REFERENCES customer_master (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `talents` (`title`, `youtube_profile`, `official_profile`) VALUES
(`花芽すみれ`,`おいす～花芽すみれです。 ゲームが好きです👾💤`,`花芽姉妹の姉。普段は落ち着いているが、たまにハイテンションで無邪気な一面も。なんでもそつなくこなす器用な女の子。「ぶいすぽっ！」の天才(?)兼ポンコツ担当。FPSゲームでは持ち前のエイムを生かした爽快感抜群のプレーを見せる。`);