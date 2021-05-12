# prop-js

Spring bootで利用している.propertiesファイルに定義されたメッセージを`process.msg`に展開します。

```properties
aaa.bbb.notfound=○○が見つかりません
```

```js
const { load } = require("prop-js")
load({
  path: "path/to/message.properties"
})

console.log(process.msg.aaa.bbb.notfound) // -> ○○が見つかりません
```
