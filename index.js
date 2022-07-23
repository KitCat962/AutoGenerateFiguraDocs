{
  const illegalParamNames = {
    "function": "_function"
  }
  const typeOverrides = {
    "Boolean": "boolean",
    "Integer": "integer",
    "Number": "number",
    "String": "string",
    "Table": "table",
    "Function": "function",
    "Userdata": "userdata",
    "AnyType": "any",
    "ModelPart": "ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart|table<string,ModelPart>>>>>>>>>>",
    "Vector": "Vector2|Vector3|Vector4|Vector5|Vector6"
  }
  const classOverrides = {
    "globals": {
      global: true
    },
    "math": {
      nonLocal: true
    },
    "EntityPoses": {
      name: "EntityPose"
    },
    "Item RenderTypes": {
      name: "ItemRenderType"
    },
    "KeyIDs": {
      name: "KeyID"
    },
    "Keybinds": {
      name: "KeybindID"
    },
    "LoopModes": {
      name: "LoopMode"
    },
    "ParentTypes": {
      name: "ParentType"
    },
    "PlayStates": {
      name: "PlayState"
    },
    "PostEffects": {
      name: "PostEffect"
    },
    "RenderTypes": {
      name: "RenderType"
    },
    "TextureTypes": {
      name: "TextureType"
    },
    "Matrix2":{
      operator:[
        '---@operator mul(Matrix2|Matrix2):Matrix2\n',
        '---@operator mul(Matrix2|Vector2):Vector2\n',
      ]
    },
    "Matrix3":{
      operator:[
        '---@operator mul(Matrix3|Matrix3):Matrix3\n',
        '---@operator mul(Matrix3|Vector3):Vector3\n',
      ]
    },
    "Matrix4":{
      operator:[
        '---@operator mul(Matrix4|Matrix4):Matrix4\n',
        '---@operator mul(Matrix4|Vector4):Vector4\n',
      ]
    },
    "Vector2": {
      operator: [
        '---@operator add(Vector2|Vector2):Vector2\n',
        '---@operator sub(Vector2|Vector2):Vector2\n',
        '---@operator mul(Vector2|Vector2):Vector2\n',
        '---@operator mul(Vector2|number):Vector2\n',
        '---@operator div(Vector2|Vector2):Vector2\n',
        '---@operator div(Vector2|number):Vector2\n',
        '---@operator mod(Vector2|Vector2):Vector2\n',
        '---@operator mod(Vector2|number):Vector2\n',
      ]
    },
    "Vector3": {
      operator: [
        '---@operator add(Vector3|Vector3):Vector3\n',
        '---@operator sub(Vector3|Vector3):Vector3\n',
        '---@operator mul(Vector3|Vector3):Vector3\n',
        '---@operator mul(Vector3|number):Vector3\n',
        '---@operator div(Vector3|Vector3):Vector3\n',
        '---@operator div(Vector3|number):Vector3\n',
        '---@operator mod(Vector3|Vector3):Vector3\n',
        '---@operator mod(Vector3|number):Vector3\n',
      ]
    },
    "Vector4": {
      operator: [
        '---@operator add(Vector4|Vector4):Vector4\n',
        '---@operator sub(Vector4|Vector4):Vector4\n',
        '---@operator mul(Vector4|Vector4):Vector4\n',
        '---@operator mul(Vector4|number):Vector4\n',
        '---@operator div(Vector4|Vector4):Vector4\n',
        '---@operator div(Vector4|number):Vector4\n',
        '---@operator mod(Vector4|Vector4):Vector4\n',
        '---@operator mod(Vector4|number):Vector4\n',
      ]
    },
    "Vector5": {
      operator: [
        '---@operator add(Vector5|Vector5):Vector5\n',
        '---@operator sub(Vector5|Vector5):Vector5\n',
        '---@operator mul(Vector5|Vector5):Vector5\n',
        '---@operator mul(Vector5|number):Vector5\n',
        '---@operator div(Vector5|Vector5):Vector5\n',
        '---@operator div(Vector5|number):Vector5\n',
        '---@operator mod(Vector5|Vector5):Vector5\n',
        '---@operator mod(Vector5|number):Vector5\n',
      ]
    },
    "Vector6": {
      operator: [
        '---@operator add(Vector6|Vector6):Vector6\n',
        '---@operator sub(Vector6|Vector6):Vector6\n',
        '---@operator mul(Vector6|Vector6):Vector6\n',
        '---@operator mul(Vector6|number):Vector6\n',
        '---@operator div(Vector6|Vector6):Vector6\n',
        '---@operator div(Vector6|number):Vector6\n',
        '---@operator mod(Vector6|Vector6):Vector6\n',
        '---@operator mod(Vector6|number):Vector6\n',
      ]
    }
  }
  const fieldOverrides = {
    "globals": {
      "vec": {
        override:
          `---An alias for "vectors.vec", since it's used so often.\n` +
          `---@param x number\n` +
          `---@param y number\n` +
          `---@return Vector2\n` +
          `---@overload fun(x:number, y:number, z:number):Vector3\n` +
          `---@overload fun(x:number, y:number, z:number, w:number):Vector4\n` +
          `---@overload fun(x:number, y:number, z:number, w:number, t:number):Vector5\n` +
          `---@overload fun(x:number, y:number, z:number, w:number, t:number, h:number):Vector6\n` +
          `function vec(x, y) end\n`
      },
      "animation": {
        name: "animations",
        type: "table<string,Animation>"
      }
    }
  }
  const methodOverrides = {
    "Animation": {
      "getPlayState": {
        return: "PlayState"
      },
      "loop": {
        param: {
          "loop": {
            type: "LoopMode"
          }
        }
      }
    },
    "Entity": {
      "getPose": {
        return: "EntityPose"
      }
    },
    "LivingEntity": {
      "getActiveHand": {
        return: `"OFF_HAND"|"MAIN_HAND"`
      },
      "getPose": {
        return: "EntityPose"
      }
    },
    "Player": {
      "getActiveHand": {
        return: `"OFF_HAND"|"MAIN_HAND"`
      },
      "getPose": {
        return: "EntityPose"
      }
    },
    "ModelPart": {
      "getChildren": {
        return: "ModelPart[]"
      },
      "getParentType": {
        return: "ParentType"
      },
      "setParentType": {
        param: {
          "parentType": {
            type: "ParentType"
          }
        }
      },
      "getPrimaryRenderType": {
        return: "RenderType"
      },
      "setPrimaryRenderType": {
        param: {
          "renderType": {
            type: "RenderType"
          }
        }
      },
      "getSecondaryRenderType": {
        return: "RenderType"
      },
      "setSecondaryRenderType": {
        param: {
          "renderType": {
            type: "RenderType"
          }
        }
      },
      "setPrimaryTexture": {
        param: {
          "textureType": {
            type: "TextureType"
          }
        }
      },
      "setSecondaryTexture": {
        param: {
          "textureType": {
            type: "TextureType"
          }
        }
      },
    },
    "ItemTask": {
      "renderType": {
        param: {
          "renderType": {
            type: "ItemRenderType"
          }
        }
      }
    },
    "KeybindAPI": {
      "create": {
        param: {
          "key": {
            type: "KeybindID"
          }
        }
      },
      "getVanillaKey": {
        param: {
          "id": {
            type: "KeyID"
          }
        },
        return: "KeybindID"
      }
    },
    "Keybind": {
      "getKey": {
        return: "KeybindID"
      },
      "setKey": {
        param: {
          "key": {
            type: "KeybindID"
          }
        }
      }
    },
    "math": {
      "lerp": {
        overload: {
          replace: true,
          overloads: [
            `---@overload fun(a:Vector2,b:Vector2,t:number):Vector2\n`,
            `---@overload fun(a:Vector3,b:Vector3,t:number):Vector3\n`,
            `---@overload fun(a:Vector4,b:Vector4,t:number):Vector4\n`,
            `---@overload fun(a:Vector5,b:Vector5,t:number):Vector5\n`,
            `---@overload fun(a:Vector6,b:Vector6,t:number):Vector6\n`
          ]
        }
      }
    },
    "RendererAPI": {
      "setPostEffect": {
        param: {
          "effect": {
            type: "PostEffect"
          }
        }
      }
    },
  }
  function manageClass(Class) {
    //return string
    let r = ""
    //declare the class if this class doesnt represent global values.
    if (!classOverrides[Class.name]?.global) {
      r +=
        `---${classOverrides[Class.name]?.description ?? Class.description}\n` +
        `---@class ${classOverrides[Class.name]?.name ?? Class.name}`
      //Add the parent class if it exists
      if (Class.parent)
        r += ` : ${classOverrides[Class.parent]?.name ?? Class.parent}`
      r += "\n"
    }
    //Add the fields.
    for (const field of Class.fields) {
      r += fieldOverrides[Class.name]?.[field.name]?.override ?? (
        classOverrides[Class.name]?.global ? (
          //if this is a global class, represent all the fields as objects
          `---${fieldOverrides[Class.name]?.[field.name]?.description ?? field.description}\n` +
          `---@type ${fieldOverrides[Class.name]?.[field.name]?.type ?? typeOverrides[field.type] ?? field.type}\n` +
          `${fieldOverrides[Class.name]?.[field.name]?.name ?? illegalParamNames[field.name] ?? field.name}={}\n`
        ) : (
          //otherwise, represent the fields as fields
          `---@field ${fieldOverrides[Class.name]?.[field.name]?.name ?? illegalParamNames[field.name] ?? field.name} ` +
          `${fieldOverrides[Class.name]?.[field.name]?.type ?? typeOverrides[field.type] ?? field.type} ` +
          `${fieldOverrides[Class.name]?.[field.name]?.description ?? field.description}`
        )
      )
      r += "\n"
    }
    //operators arent a part of the docs, so thay can only be added by override at the moment
    if(classOverrides[Class.name]?.operator)
      for(const operator of classOverrides[Class.name]?.operator)
        r+=operator
    //if this class doesnt represent global values, add an object to attach the class to
    if (!classOverrides[Class.name]?.global)
      r +=
        `${!classOverrides[Class.name]?.nonLocal ? "local " : ""}` +
        `${classOverrides[Class.name]?.name ?? Class.name}={}\n\n`
    for (const method of Class.methods) {
      r += `---${methodOverrides[Class.name]?.[method.name]?.description ?? method.description}\n`
      //add the first overload's parameters as normal
      for (const param of method.parameters[0]) {
        r +=
          `---@param ${methodOverrides[Class.name]?.[method.name]?.param?.[param.name]?.name ?? illegalParamNames[param.name] ?? param.name} ` +
          `${methodOverrides[Class.name]?.[method.name]?.param?.[param.name]?.type ?? typeOverrides[param.type] ?? param.type}\n`
      }
      //add return type for the first overload
      r += `---@return ${methodOverrides[Class.name]?.[method.name]?.return ?? typeOverrides[method.returns[0]] ?? method.returns[0]}\n`
      //add all other overloads when not replacing them
      if (!methodOverrides[Class.name]?.[method.name]?.overload?.replace) {
        for (let overloadIndex = 1; overloadIndex < method.parameters.length; overloadIndex++) {
          r += `---@overload fun(`
          let notFirst = false
          //add parameters of overloads
          for (const param of method.parameters[overloadIndex]) {
            if (notFirst)
              r += `, `;
            r +=
              `${methodOverrides[Class.name]?.[method.name]?.param?.[param.name]?.name ?? illegalParamNames[param.name] ?? param.name}:` +
              `${methodOverrides[Class.name]?.[method.name]?.param?.[param.name]?.type ?? typeOverrides[param.type] ?? param.type}`;
            notFirst = true
          }
          //add the return type of these overloads
          r += `):${methodOverrides[Class.name]?.[method.name]?.return ?? typeOverrides[method.returns[overloadIndex]] ?? method.returns[overloadIndex]}\n`
        }
      }
      //add overloads defined in the overrides
      if (methodOverrides[Class.name]?.[method.name]?.overload?.overloads) {
        for (const overload of methodOverrides[Class.name]?.[method.name]?.overload?.overloads) {
          r += overload
        }
      }
      //declare the main function, using the first overload
      {
        r +=
          `function ${!classOverrides[Class.name]?.global ? `${classOverrides[Class.name]?.name ?? Class.name}.` : ""}` +
          `${methodOverrides[Class.name]?.[method.name]?.name ?? method.name}(`
        let notFirst = false
        let param0 = method.parameters[0]
        for (const param of param0) {
          if (notFirst)
            r += ", ";
          r += methodOverrides[Class.name]?.[method.name]?.param?.[param.name]?.name ?? illegalParamNames[param.name] ?? param.name
          notFirst = true
        }
        r += ") end\n"
      }
      r += "\n"
    }
    return r
  }
  function manageAlias(Class) {
    let r =
      `---${classOverrides[Class.name]?.description ?? Class.description}\n` +
      `---@alias ${classOverrides[Class.name]?.name ?? Class.name}\n`
    for (const entry of Class.entries) {
      r += `---| '"${entry}"'\n`
    }
    r += "\n"
    return r
  }

  function createDocs(json) {
    let docs = {}
    for (const [namespace, classArray] of Object.entries(json)) {
      let out = ""
      for (const Class of classArray) {
        if (!Class.entries)
          out += manageClass(Class)
        else
          out += manageAlias(Class)
      }
      docs[(namespace == "" ? "global" : namespace) + ".lua"] = out
    }
    return docs
  }

  function unpackDocs(docs) {
    let r = ""
    for (const [fileName, contents] of Object.entries(docs)) {
      r += `${fileName}\n${contents}\n`
    }
    return r
  }
  function downloadFile(content, name) {
    console.log(null, name)
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
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
        let i = 0
        for (const [fileName, fileContents] of Object.entries(docs)) {
          setTimeout(downloadFile, i * 500, fileContents, fileName)
          i++
        }
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