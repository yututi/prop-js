const fs = require('fs')
const path = require('path')

/**
 * @typedef {Object} Options
 * @property {string} propPath 
 * @property {string} encode 
 */

/**
 * @param {Options} props
 */
function load({
  path: _path,
  encode = "utf8"
}) {
  const propPath = path.resolve(process.cwd(), _path)

  const parsed = parsePropFile(fs.readFileSync(propPath, { encoding: encode }))

  process.msg = parsed
}

const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const NEWLINES_MATCH = /\r\n|\n|\r/

/**
 * 
 * @param {string} src 
 * @returns {Object}
 */
function parsePropFile(src) {

  const obj = {}

  src.toString().split(NEWLINES_MATCH).forEach((line) => {
    const keyValueArr = line.match(RE_INI_KEY_VAL)

    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      const namespaces = key.split(".")
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      // const end = val.length - 1
      // const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      // const isSingleQuoted = val[0] === "'" && val[end] === "'"
      // remove surrounding whitespace
      val = val.trim()

      namespaces.reduce((prev, cur, nameIndex) => {
        const isLastKey = namespaces.length === nameIndex + 1

        if(!isNaN(cur)) {
          cur = "_" + cur
        }

        if (isLastKey) {
          if(prev[cur]) {
            console.log(`"${key}" is already defined in \`process.msg\` and will not be overwritten`)
            return
          }
          return prev[cur] = val
        } else {
          return prev[cur] = prev[cur] || {}
        }

      }, obj)

    }
  })

  return obj
}

module.exports.load = load
