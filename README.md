# prop-js

Spring bootで利用している.propertiesファイルに定義されたメッセージを`process.msg`に展開します。

## インストール

```
npm i -D @yututi/prop-js
```

## 使い方

```properties
# message.propertiesファイル
aaa.bbb.notfound=○○が見つかりません
```

```js
const { load } = require("prop-js")
load({
  path: "path/to/message.properties"
})

console.log(process.msg.aaa.bbb.notfound) // -> ○○が見つかりません
```
