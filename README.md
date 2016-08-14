# SimpleMusicPlayer

## What
いまはなきiOS7時代のシンプルな音楽プレーヤー。

あれを作りたい。

## Memo
### 曲の再生
- `persistentID`をNativeに投げる
- それで再生
- 再生終了イベントをNativeからもらって、js側の並びで次の曲を

### アーティスト > アルバム > 曲の再生
- `persistentID`をNativeに投げる
- それで再生
- 再生終了イベントをNativeからもらって、js側の並びで次の曲を

### アルバム > 曲の再生
- `persistentID`をNativeに投げる
- それで再生
- 再生終了イベントをNativeからもらって、js側の並びで次の曲を

## TODO
- [sw] コントロールの次へ・前へイベント取れるのか
- [sw] 再生終了イベントの通知
- [js] 再生中の曲情報の表示
- [js] 次の曲、前の曲の`persistentID`の取得
- [js] 再生終了イベントの監視
