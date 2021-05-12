const { load } = require("./index")

test("load prop", () => {
  load({
    path: "test/test1.properties"
  })

  expect(process.msg.test.aaa.bbb).toBe("テストメッセージ1")
  expect(process.msg.test.aaa.ccc).toBe("テストメッセージ2")
  expect(process.msg.hoge.fuga._111).toBe("number test")
})
