# 🦀 sawagani

![Version](https://img.shields.io/github/package-json/v/tsukuba-neu/sawagani?style=flat-square)
![tsukuba-neu](https://img.shields.io/badge/tsukuba-neu-blue?style=flat-square)
![Imagine The Future](https://img.shields.io/badge/imagine_the-future-0bf?style=flat-square)

sawaganiは、筑波大学の課外活動団体が財務報告のために提出する収支計算書を、表計算ソフトウェアのデータから作成するためのツールです。

会員登録や導入作業を必要とせず、Webブラウザから誰でも利用できます。データはすべてローカルで処理され、コンピュータから外部に送信されることはありません。

## 👀 試してみる

sawaganiは、ExcelやGoogleスプレッドシートのような表計算ソフトで作成した帳簿を読み込んで処理します。

ここでは、帳簿のサンプルデータを用意しました。

1. 以下のテンプレートを開き、
2. `Ctrl + A` （macOSでは `⌘ + A`）を押して、すべてのセルを選択します。
3. `Ctrl + C` （macOSでは `⌘ + C`）を押して、セルをコピーします。

[![帳簿テンプレートを開く](https://img.shields.io/badge/%E5%B8%B3%E7%B0%BF%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%92%E9%96%8B%E3%81%8F-emerald?style=for-the-badge)](https://docs.google.com/spreadsheets/d/1KirrcWmeYXQ-ao-qk0lQjc7xFgbi0-pzuZhfEIHRec0/edit)

<img width="1176" alt="image" src="https://github.com/user-attachments/assets/4acb2388-6d07-4d33-8743-835d3df9eed7">

次に、いまコピーしたデータをsawaganiに取り込みます。

1. 以下のリンクからsawaganiを開き、
2. ページ上部の「クリップボードからインポート」ボタンをクリックします。クリップボードの読み取り許可を求められる場合は、許可します。

[![sawaganiを開く](https://img.shields.io/badge/sawagani%E3%82%92%E9%96%8B%E3%81%8F-red?style=for-the-badge)](https://tsukuba-neu.github.io/sawagani/) 

<img width="821" alt="image" src="https://github.com/user-attachments/assets/090dff71-81c1-4497-b854-9777f9a09c67">

表示されている収支計算書に数字が入ったら成功です！あとは、表紙に残った団体名や顧問教員名を入力して、最後にブラウザの印刷機能で印刷やPDFへの書き出しをすれば、すぐに提出できる収支計算書が完成します。

<img width="1053" alt="image" src="https://github.com/user-attachments/assets/a2d6f7b4-a5cb-4da6-821c-539d2bf6c4d7">

## 🙋 利用方法

上記「試してみる」のデータをコピーし、自分たちの団体のデータに書き換えてください。

そのほか実際の利用にあたって、役に立つヒントをお伝えします。

- **🖊️ 見出し行の内容はそのままで使ってください。**
  - sawaganiは、帳簿データの1行目を見出しとして認識しています。一方で、列幅や順序は自由に変えても問題ありません。
- **📁 CSVファイルのドラッグ＆ドロップでも読み込みができます。**
  - すなわち、CSVが書き出せれば、どのようなソフトウェアでも帳簿の作成に利用できます。
  - ただし、提供しているサンプルデータは、入力を簡単にするための書式設定がなされています。
    - 特にこだわりがなければ、このテンプレートを利用いただくと簡単ではないでしょうか。
- **🔗 ページのURLで、入力内容の保存や共有ができます。**
  - sawaganiは入力内容をURLに埋め込んで保存しています。入力を終えた時点でページをブックマークすることでデータの保存ができますし、URLを送って入力内容を誰かに引き継ぐこともできます。
  - うっかりページを閉じて入力内容が消えてしまったときも、ブラウザの履歴を辿ってもう一度開くことで、データが復活できることがあります。

> [!CAUTION]
> **出力された書類の内容は必ず検算をしてください。**
> 
> 一般に、会計に用いるITシステムは、数字の取り扱いに特別な注意を払って作られますが、sawaganiはそのような体制では作られておらず、計算結果に間違いが起こることがあります。
