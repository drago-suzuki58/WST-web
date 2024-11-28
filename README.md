# 🕐️WST-Web

あなたの毎日の起床時間が、世界の新たな基準に！このアプリケーションは、あなただけの標準時を世界に見せびらかすために最高なツールです。

元ネタ：[yada_kaeruさんのツイート](https://x.com/yada_kaeru/status/1861644748580364390)からインスパイアされて勝手に作りました

[English README](README.en.md)

## 🛠️使用方法

1. このリポジトリをクローンまたはフォーク

2. 以下の形式のjsonデータを[data.json](data.json)に書き込んでください

- `time`  
  今日起きた時刻を`HH:mm`形式で入力してください。なんなら-1:00でも25:00でも良いです。
- `timezone`  
  住んでいる国のタイムゾーンをIANA Time Zoneで入力してください。

```json
{
    "time": "1:00",
    "timezone": "Asia/Tokyo"
}
```

3. 依存関係のインストール

```sh
npm install
```

4. お好みの方法でデプロイや起動をしてください

5. 友人に「WST3時に行くわ～」とでも言ってこのサイトを見せびらかしましょう！

## サンプル

サンプルとして私のWSTを大公開しておきます

[https://wst.drsz.org/index.html](https://wst.drsz.org/index.html)
