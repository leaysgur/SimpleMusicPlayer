# SimpleMusicPlayer

## What
いまはなきiOS7時代のシンプルな音楽プレーヤー。

あれを作りたい。

## TODO
- [sw] 再生中の曲情報の表示
  - 再生秒数
    - `getCurrentPlaybackTime`をSwiftで用意したので、rAFで叩きに行く
    - うまくplay/pauseで無駄な処理を省きたい
    - Promiseでやってるせいか迷子になるのでコールバックスタイルにする
- [js] playbackコントロール
  - volume
  - seek
    - Sliderコンポーネントを使ってみる
- [ot] デザインの調整
- [ot] タブのアイコン
- [ot] Splashの画像
- [ot] 本番用ビルド
- [ot] プロジェクト名

## ExTODO
- [sw] なぜか再生できないアルバムがある（待てばいける・・？
- [js] そのタブを表示中にそのタブを押すとそのタブのトップに
- [sw] ボリューム二度押しで曲送り
- [sw] アプリ終了で音を止める
- [sw] cloudのアイテムを除外
- [sw] なぞのWarnings `Unable to simultaneously satisfy constraints`
