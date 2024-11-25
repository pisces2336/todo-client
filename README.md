# todo-client

- [serverリポジトリ](https://github.com/pisces2336/todo-server)

## 概要

- vue3 (vuetify) で作成したtodoアプリのクライアントサイドリポジトリです。

https://github.com/user-attachments/assets/408b2ff3-b07b-4dda-a4d8-f76cdae6fb28

## 大変だったところ

- cookieを用いた認証維持を中心としたapiリクエストの整理

## こだわったところ

- viewがfatにならないようコンポーネントへの切り出しを心がけた
- 認証情報をcookieに入れることで有効期間内はログイン状態を継続できるようにした
- セッション管理やapiリクエストを積極的にラップし、宣言的に活用できるようにした
