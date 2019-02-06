# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

### Added

- 販売者サービスを追加

### Changed

- イベントサービスのインターフェースをCinerinoに統一

### Deprecated

### Removed

- 組織サービスを廃止
- 場所サービスを廃止

### Fixed

### Security

## v5.0.0 - 2019-01-28

### Added

- 上映イベントシリーズインターフェースを追加
- transactionサービスのエイリアスとしてtxnを追加

### Changed

- 人物インターフェースを拡張
- @cinerino/api-abstract-clientを可能な範囲で継承するように調整
- 決済方法タイプを拡張
- 予約インターフェースを価格属性を除いてChevreに統一
- 個々の上映イベントのイベントタイプを変更
- 決済方法承認アクションインターフェースを強化
- 注文番号で返品取引を開始できるように変更
- install @motionpicture/sskts-factory@6.0.0

## v4.4.0 - 2018-12-11

### Changed

- 上映イベント検索条件強化

## v4.3.0 - 2018-12-10

### Added

- タスクサービスを追加
- 取引検索インターフェースを追加

### Changed

- 注文検索条件強化
- update sskts-factory

## v4.2.0 - 2018-10-08

### Added

- ユーザープールサービスを追加。

## v4.1.1 - 2018-10-07

### Changed

- 会員検索強化。

## v4.1.0 - 2018-10-07

### Added

- 会員検索を追加。
- 
## v4.0.1 - 2018-10-06

### Changed

- 注文検索条件を強化。

## v3.3.1 - 2018-07-31

### Changed

- ポイント口座に口座タイプを追加。

## v3.3.0 - 2018-06-13

### Changed

- 注文検索条件を拡張。

## v3.2.0 - 2018-06-12

### Changed

- 注文検索条件を拡張。

## v3.1.0 - 2018-06-09

### Added

- 会員プログラム検索エンドポイントを追加。
- 汎用的な所有権検索エンドポイントを追加。
- Pecorino口座オーソリ取消エンドポイントを追加。
- 口座解約エンドポイントを追加。
- Pecorinoインセンティブ承認エンドポイントを追加。
- 会員プログラム登録エンドポイントを追加。
- 会員プログラム登録解除エンドポイントを追加。
- 注文検索エンドポイントを追加。
- Pecorino口座サービスを追加。

### Changed

- Pecorino口座開設エンドポイントを調整。
- 注文取引確定時の属性にメール送信有無とインセンティブ属性を追加。

## v3.0.0 - 2018-03-01
### Added
- Pecorino口座関連のエンドポイントを追加。
- 注文返品取引サービスを追加。

### Removed
- サービスクラスインスタンス作成ファクション(前バージョンでdeprecatedであったもの)を削除。

### Fixed
- IE11でes6コードが動作しない問題を解消。

## v2.1.4 - 2018-02-15
### Fixed
- クライアントサイドではUser-Agentを手動でセットできないので、パッケージ情報をUser-Agentに付加する処理を、DefaultTransporterから取り除く対応。

## v2.1.3 - 2017-12-06
### Fixed
- 注文取引サービスのレスポンス型を修正。

## v2.1.2 - 2017-11-28
### Changed
- install [@motionpicture/sskts-factory@2.3.1](https://www.npmjs.com/package/@motionpicture/sskts-factory)
- 注文取引開始のパラメーターを調整(許可証トークンを追加 & 取引期限をISO 8601フォーマットで送信するように変更)。

## v2.1.1 - 2017-11-24
### Fixed
- Date型のクエリーパラメーターがISO 8601フォーマットの文字列としてリクエストに渡されるように対応。

## v2.1.0 - 2017-11-23
### Changed
- install [@motionpicture/sskts-factory@2.3.0](https://www.npmjs.com/package/@motionpicture/sskts-factory)(イベント検索の検索条件にプロパティ追加)

### Security
- テスト網羅率100%化。

## v2.0.0 - 2017-10-21
### Changed
- 座席予約の供給情報インターフェースを変更。

### Security
- [tslint](https://www.npmjs.com/package/tslint)をアップデート。

## v1.2.0 - 2017-10-19
### Added
- 座席予約承認アクションに対して供給情報を更新するサービスを追加。

## v1.1.1 - 2017-09-27
### Changed
- transfer repository to organization.

### Security
- update dependencies.

## v1.1.0 - 2017-09-25
### Changed
- 取引承認アクションのエンドポイントを変更。

## v1.0.0 - 2017-09-25
### Added
- v1.0.0をリリース。
