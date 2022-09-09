{
  const overrides = {
    _aClass: [],
    _rClass: {},
    "global": {
      _aField: [],
      _rField: {
        "vec": {
          delete: true
        },
        "animations": {
          type: "table<string,table<string,Animation>>"
        },
        "figuraMetatables": {
          type: "table<string,{__index:table|function,__newindex:function,__tostring:function,__add:funtion,__sub:function,__mul:function,__div:function,__mod:function,__eq:function,__lt:function,__le:function,__unm:function,__len:function}>"
        }
      },
      _aMethod: [
        {
          name: "vec",
          description: "An alias for \"vectors.vec\", since it's used so often.",
          parameters: [
            [
              { name: 'x', type: 'Number' },
              { name: 'y', type: 'Number' }
            ],
            [
              { name: 'x', type: 'Number' },
              { name: 'y', type: 'Number' },
              { name: 'z', type: 'Number' }
            ],
            [
              { name: 'x', type: 'Number' },
              { name: 'y', type: 'Number' },
              { name: 'z', type: 'Number' },
              { name: 'w', type: 'Number' }
            ],
            [
              { name: 'x', type: 'Number' },
              { name: 'y', type: 'Number' },
              { name: 'z', type: 'Number' },
              { name: 'w', type: 'Number' },
              { name: 't', type: 'Number' }
            ],
            [
              { name: 'x', type: 'Number' },
              { name: 'y', type: 'Number' },
              { name: 'z', type: 'Number' },
              { name: 'w', type: 'Number' },
              { name: 't', type: 'Number' },
              { name: 'h', type: 'Number' }
            ]
          ],
          returns: [
            'Vector2',
            'Vector3',
            'Vector4',
            'Vector5',
            'Vector6'
          ],
          static: true
        }
      ],
      _rMethod: {}
    }
  }
  const typeOverrides = {
    "Boolean": "boolean",
    "Integer": "integer",
    "Number": "number",
    "String": "string",
    "Table": "table",
    "Function": "function",
    "Userdata": "userdata",
    "AnyType": "any"
  }
  function doType(type) {
    return typeOverrides[type] ?? type
  }
  function doFunction(name, description, params, returns, static, className) {
    let r = `---${description}\n`
    for (const param of params) {
      r += `---@param ${param.name} ${doType(param.type)}\n`
    }
    r += `---@return ${doType(returns)}\n`

    r += `function `
    if (className)
      r += `${className + (static ? "." : ":")}`
    r += `${name}(`
    let f = true
    for (const param of params) {
      if (!f) {
        r += `, `
      }
      r += param.name
      f = false
    }
    r += `) end\n`
    return r
  }
  function doMethod(method, className) {
    let r = ''
    for (let i = 0; i < method.parameters.length; i++) {
      r += doFunction(method.name, method.description, method.parameters[i], method.returns[i], method.static, className)
    }
    return r
  }
  function doField(field) {
    return `---@field ${field.name} ${doType(field.type)} ${field.description}\n`
  }
  function doClass(clazz, global) {
    global ??= false
    let r = `---${clazz.description}\n---@class ${clazz.name}${clazz.parent ? `:${clazz.parent}` : ""}\n`
    for (const field of clazz.fields)
      r += doField(field)
    if (!global)
      r += `local `
    r += `${clazz.name}={}\n`
    for (const method of clazz.methods)
      r += doMethod(method, clazz.name)
    return r
  }
  function doList(list) {
    let r = `---${list.description}\n---@alias ${list.name}\n`
    for (const entry of list.entries)
      r += `---| '${entry}'\n`
    return r
  }
  function doGlobals(global) {
    let r = ""
    for (const field of global.fields) {
      r += `---${field.description}\n---@type ${doType(field.type)}\n${field.name}={}\n`
    }
    for (const method of global.methods) {
      r += doMethod(method)
    }
    return r
  }
  function createDocs(json) {
    let docs = {
      "global.lua": doGlobals(json.globals),
      "math.lua": doClass(json.math, true)
    }
    let classNameList = {
      name: "Classes",
      description: "List of valid Figura Class names. Used for `type` function and figuraMetatables.",
      entries: []
    }
    for (const global of json.globals.fields) {
      switch (global.type) {
        case "Function": continue
        default: break
      }
      if (global.name == "figuraMetatables") continue
      for (const clazz of global.children) {
        classNameList.entries.push(clazz.name)
        docs[`${clazz.name}.lua`] = `---@diagnostic disable: duplicate-set-field\n${doClass(clazz)}`
      }
    }
    for (const list of json.lists)
      docs[`${list.name}.lua`] = doList(list)
    docs[`${classNameList.name}.lua`] = doList(classNameList)
    return docs
  }
  function unpackDocs(docs) {
    let r = ""
    for (const [fileName, contents] of Object.entries(docs)) {
      r += `${fileName}\n${contents}\n`
    }
    return r
  }
  async function downloadFiles(files, name) {
    //https://github.com/Touffy/client-zip
    let downloadZip = (() => { "stream" in Blob.prototype || Object.defineProperty(Blob.prototype, "stream", { value() { return new Response(this).body } }), "setBigUint64" in DataView.prototype || Object.defineProperty(DataView.prototype, "setBigUint64", { value(e, n, t) { const i = Number(0xffffffffn & n), o = Number(n >> 32n); this.setUint32(e + (t ? 0 : 4), i, t), this.setUint32(e + (t ? 4 : 0), o, t) } }); var f = e => new DataView(new ArrayBuffer(e)), r = e => new Uint8Array(e.buffer || e), a = e => (new TextEncoder).encode(String(e)), s = e => Math.min(4294967295, Number(e)), A = e => Math.min(65535, Number(e)); function u(e, n) { if (void 0 === n || n instanceof Date || (n = new Date(n)), e instanceof File) return { t: n || new Date(e.lastModified), i: e.stream() }; if (e instanceof Response) return { t: n || new Date(e.headers.get("Last-Modified") || Date.now()), i: e.body }; if (void 0 === n) n = new Date; else if (isNaN(n)) throw new Error("Invalid modification date."); if ("string" == typeof e) return { t: n, i: a(e) }; if (e instanceof Blob) return { t: n, i: e.stream() }; if (e instanceof Uint8Array || e instanceof ReadableStream) return { t: n, i: e }; if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return { t: n, i: r(e) }; if (Symbol.asyncIterator in e) return { t: n, i: d(e) }; throw new TypeError("Unsupported input format.") } function d(e) { const n = "next" in e ? e : e[Symbol.asyncIterator](); return new ReadableStream({ async pull(e) { let t = 0; for (; e.desiredSize > t;) { const i = await n.next(); if (!i.value) { e.close(); break } { const n = l(i.value); e.enqueue(n), t += n.byteLength } } } }) } function l(e) { return "string" == typeof e ? a(e) : e instanceof Uint8Array ? e : r(e) } function y(e, n, t) { if (void 0 === n || n instanceof Uint8Array || (n = a(n)), e instanceof File) return { o: n || a(e.name), A: BigInt(e.size) }; if (e instanceof Response) { const i = e.headers.get("content-disposition"), o = i && i.match(/;\s*filename\*?=["']?(.*?)["']?$/i), f = o && o[1] || new URL(e.url).pathname.split("/").pop(), r = f && decodeURIComponent(f), s = t || +e.headers.get("content-length"); return { o: n || a(r), A: BigInt(s) } } if (!n || 0 === n.length) throw new Error("The file must have a name."); return "string" == typeof e ? { o: n, A: BigInt(a(e).length) } : e instanceof Blob ? { o: n, A: BigInt(e.size) } : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? { o: n, A: BigInt(e.byteLength) } : { o: n, A: t > -1 ? BigInt(t) : void 0 } } var w = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABCgJgAABgAn9/AXwDAwIAAQUDAQACBwkCAW0CAAFjAAEIAQAKlQECSQEDfwNAIAEhAEEAIQIDQCAAQQF2IABBAXFBoIbi7X5scyEAIAJBAWoiAkEIRw0ACyABQQJ0IAA2AgAgAUEBaiIBQYACRw0ACwtJAQF/IAFBf3MhAUGAgAQhAkGAgAQgAGohAANAIAFB/wFxIAItAABzQQJ0KAIAIAFBCHZzIQEgAkEBaiICIABJDQALIAFBf3O4Cw"), (e => e.charCodeAt(0))))), { c, m } = w.exports, B = 65536, b = r(m).subarray(B); function I(e, n = 0) { for (const t of function* (e) { for (; e.length > B;)yield e.subarray(0, B), e = e.subarray(B); e.length && (yield e) }(e)) b.set(t), n = c(t.length, n); return n } function g(e, n, t = 0) { const i = e.getSeconds() >> 1 | e.getMinutes() << 5 | e.getHours() << 11, o = e.getDate() | e.getMonth() + 1 << 5 | e.getFullYear() - 1980 << 9; n.setUint16(t, i, 1), n.setUint16(t + 2, o, 1) } function p(e) { const n = f(30); return n.setUint32(0, 1347093252), n.setUint32(4, 754976768), g(e.t, n, 10), n.setUint16(26, e.o.length, 1), r(n) } async function* D(e) { let { i: n } = e; if ("then" in n && (n = await n), n instanceof Uint8Array) yield n, e.u = I(n, 0), e.A = BigInt(n.length); else { e.A = 0n; const t = n.getReader(); for (; ;) { const { value: n, done: i } = await t.read(); if (i) break; e.u = I(n, e.u), e.A += BigInt(n.length), yield n } } } function h(e, n) { const t = f(16 + (n ? 8 : 0)); return t.setUint32(0, 1347094280), t.setUint32(4, e.u, 1), n ? (t.setBigUint64(8, e.A, 1), t.setBigUint64(16, e.A, 1)) : (t.setUint32(8, s(e.A), 1), t.setUint32(12, s(e.A), 1)), r(t) } function v(e, n, t = 0) { const i = f(46); return i.setUint32(0, 1347092738), i.setUint32(4, 755182848), i.setUint16(8, 2048), g(e.t, i, 12), i.setUint32(16, e.u, 1), i.setUint32(20, s(e.A), 1), i.setUint32(24, s(e.A), 1), i.setUint16(28, e.o.length, 1), i.setUint16(30, t, 1), i.setUint16(40, 33204, 1), i.setUint32(42, s(n), 1), r(i) } function Q(e, n, t) { const i = f(t); return i.setUint16(0, 1, 1), i.setUint16(2, t - 4, 1), 16 & t && (i.setBigUint64(4, e.A, 1), i.setBigUint64(12, e.A, 1)), i.setBigUint64(t - 8, n, 1), r(i) } function E(e) { return e instanceof File || e instanceof Response ? [[e], [e]] : [[e.input, e.name, e.size], [e.input, e.lastModified]] } var C = e => function (e) { let n = BigInt(22), t = 0n, i = 0; for (const o of e) { if (!o.o) throw new Error("Every file must have a non-empty name."); if (void 0 === o.A) throw new Error(`Missing size for file "${(new TextDecoder).decode(o.o)}".`); const e = o.A >= 0xffffffffn, f = t >= 0xffffffffn; t += BigInt(46 + o.o.length + (e && 8)) + o.A, n += BigInt(o.o.length + 46 + (12 * f | 28 * e)), i || (i = e) } return (i || t >= 0xffffffffn) && (n += BigInt(76)), n + t }(function* (e) { for (const n of e) yield y(...E(n)[0]) }(e)); return function (e, n = {}) { const t = { "Content-Type": "application/zip", "Content-Disposition": "attachment" }; return ("bigint" == typeof n.length || Number.isInteger(n.length)) && n.length > 0 && (t["Content-Length"] = String(n.length)), n.metadata && (t["Content-Length"] = String(C(n.metadata))), new Response(d(async function* (e) { const n = []; let t = 0n, i = 0n, o = 0; for await (const f of e) { yield p(f), yield f.o, yield* D(f); const e = f.A >= 0xffffffffn, r = 12 * (t >= 0xffffffffn) | 28 * e; yield h(f, e), n.push(v(f, t, r)), n.push(f.o), r && n.push(Q(f, t, r)), e && (t += 8n), i++, t += BigInt(46 + f.o.length) + f.A, o || (o = e) } let a = 0n; for (const e of n) yield e, a += BigInt(e.length); if (o || t >= 0xffffffffn) { const e = f(76); e.setUint32(0, 1347094022), e.setBigUint64(4, BigInt(44), 1), e.setUint32(12, 755182848), e.setBigUint64(24, i, 1), e.setBigUint64(32, i, 1), e.setBigUint64(40, a, 1), e.setBigUint64(48, t, 1), e.setUint32(56, 1347094023), e.setBigUint64(64, t + a, 1), e.setUint32(72, 1, 1), yield r(e) } const u = f(22); u.setUint32(0, 1347093766), u.setUint16(8, A(i), 1), u.setUint16(10, A(i), 1), u.setUint32(12, s(a), 1), u.setUint32(16, s(t), 1), yield r(u) }(async function* (e) { for await (const n of e) { const [e, t] = E(n); yield Object.assign(u(...t), y(...e)) } }(e))), { headers: t }) } })();
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(await downloadZip(files).blob());//new Blob([content], { type: "text/plain" })
    a.download = name;
    a.click();
    a.remove();
  }
  let isDownload = document.createElement("input")
  isDownload.type = "checkbox"
  let textbox = document.createElement("textarea")
  textbox.wrap = "off"
  textbox.spellcheck = false
  textbox.style["overflow-y"] = "hidden"
  textbox.style.width = "-webkit-fill-available"
  let input = document.createElement("input")
  input.type = "file"
  input.onchange = (ev) => {
    let fr = new FileReader()
    fr.onload = function () {
      let json = JSON.parse(fr.result)
      console.log(json)
      a = json
      let docs = createDocs(json)
      if (isDownload.checked) {
        let files=[]
        for (const [fileName, fileContents] of Object.entries(docs)) {
          files.push({
            name:fileName,
            input:fileContents
          })
        }
        downloadFiles(files,"docs.zip")
      }
      textbox.value = unpackDocs(docs)
      textbox.style.height = 'auto';
      textbox.style.height = textbox.scrollHeight + 'px';
      input.value = null
    }
    fr.readAsText(input.files[0])
  }
  document.body.appendChild(isDownload)
  document.body.appendChild(input)
  document.body.appendChild(document.createElement("P"))
  document.body.appendChild(textbox)
}