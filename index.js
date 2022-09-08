{
  /*const overrides = {
    "globals": {
      global: true,
      field: {
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
          type: "table<string,table<string,Animation>>"
        }
      }
    },
    "math": {
      nonLocal: true,
      method: {
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
      }
    },
    "Animation": {
      method: {
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
      }
    },
    "Entity": {
      method: {
        "getPose": {
          return: "EntityPose"
        }
      }
    },
    "ItemTask": {
      method: {
        "renderType": {
          param: {
            "renderType": {
              type: "ItemRenderType"
            }
          }
        }
      }
    },
    "KeybindAPI": {
      method: {
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
      }
    },
    "Keybind": {
      method: {
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
      }
    },
    "LivingEntity": {
      method: {
        "getActiveHand": {
          return: `"OFF_HAND"|"MAIN_HAND"`
        },
        "getPose": {
          return: "EntityPose"
        }
      }
    },
    "ModelPart": {
      field: {
        fields: [
          `---@field [string] ModelPart\n`
        ]
      },
      method: {
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
      }
    },
    "Player": {
      method: {
        "getActiveHand": {
          return: `"OFF_HAND"|"MAIN_HAND"`
        },
        "getPose": {
          return: "EntityPose"
        }
      }
    },
    "RendererAPI": {
      method: {
        "setPostEffect": {
          param: {
            "effect": {
              type: "PostEffect"
            }
          }
        }
      }
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
    "Matrix2": {
      operator: {
        operators: [
          '---@operator mul(Matrix2|Matrix2):Matrix2\n',
          '---@operator mul(Matrix2|Vector2):Vector2\n',
        ]
      }
    },
    "Matrix3": {
      operator: {
        operators: [
          '---@operator mul(Matrix3|Matrix3):Matrix3\n',
          '---@operator mul(Matrix3|Vector3):Vector3\n',
        ]
      }
    },
    "Matrix4": {
      operator: {
        operators: [
          '---@operator mul(Matrix4|Matrix4):Matrix4\n',
          '---@operator mul(Matrix4|Vector4):Vector4\n',
        ]
      }
    },
    "Vector2": {
      operator: {
        operators: [
          '---@operator add(Vector2|Vector2):Vector2\n',
          '---@operator sub(Vector2|Vector2):Vector2\n',
          '---@operator mul(Vector2|Vector2):Vector2\n',
          '---@operator mul(Vector2|number):Vector2\n',
          '---@operator div(Vector2|Vector2):Vector2\n',
          '---@operator div(Vector2|number):Vector2\n',
          '---@operator mod(Vector2|Vector2):Vector2\n',
          '---@operator mod(Vector2|number):Vector2\n',
        ]
      }
    },
    "Vector3": {
      operator: {
        operators: [
          '---@operator add(Vector3|Vector3):Vector3\n',
          '---@operator sub(Vector3|Vector3):Vector3\n',
          '---@operator mul(Vector3|Vector3):Vector3\n',
          '---@operator mul(Vector3|number):Vector3\n',
          '---@operator div(Vector3|Vector3):Vector3\n',
          '---@operator div(Vector3|number):Vector3\n',
          '---@operator mod(Vector3|Vector3):Vector3\n',
          '---@operator mod(Vector3|number):Vector3\n',
        ]
      }
    },
    "Vector4": {
      operator: {
        operators: [
          '---@operator add(Vector4|Vector4):Vector4\n',
          '---@operator sub(Vector4|Vector4):Vector4\n',
          '---@operator mul(Vector4|Vector4):Vector4\n',
          '---@operator mul(Vector4|number):Vector4\n',
          '---@operator div(Vector4|Vector4):Vector4\n',
          '---@operator div(Vector4|number):Vector4\n',
          '---@operator mod(Vector4|Vector4):Vector4\n',
          '---@operator mod(Vector4|number):Vector4\n',
        ]
      }
    },
    "Vector5": {
      operator: {
        operators: [
          '---@operator add(Vector5|Vector5):Vector5\n',
          '---@operator sub(Vector5|Vector5):Vector5\n',
          '---@operator mul(Vector5|Vector5):Vector5\n',
          '---@operator mul(Vector5|number):Vector5\n',
          '---@operator div(Vector5|Vector5):Vector5\n',
          '---@operator div(Vector5|number):Vector5\n',
          '---@operator mod(Vector5|Vector5):Vector5\n',
          '---@operator mod(Vector5|number):Vector5\n',
        ]
      }
    },
    "Vector6": {
      operator: {
        operators: [
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
  }*/
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
  function doType(type){
    return typeOverrides[type]??type
  }
  function doFunction(name,description,params,returns,static,className){
    let r=`---${description}\n`
    for(const param of params){
      r+=`---@param ${param.name} ${doType(param.type)}\n`
    }
    r+=`---@return ${doType(returns)}\n`

    r+=`function `
    if(className)
      r+=`${className+(static?".":":")}`
    r+=`${name}(`
    let f=true
    for(const param of params){
      if(!f){
        r+=`, `
      }
      r+=param.name
      f=false
    }
    r+=`) end\n`
    return r
  }
  function doMethod(method,className){
    let r=''
    for(let i=0;i<method.parameters.length;i++){
      r+=doFunction(method.name,method.description,method.parameters[i],method.returns[i],method.static,className)
    }
    return r
  }
  function doField(field){
    return `---@field ${field.name} ${doType(field.type)} ${field.description}\n`
  }
  function doClass(clazz,global){
    global??=false
    let r=`---${clazz.description}\n---@class ${clazz.name}${clazz.parent?`:${clazz.parent}`:""}\n`
    for(const field of clazz.fields)
      r+=doField(field)
    if(!global)
      r+=`local `
    r+=`${clazz.name}={}\n`
    for(const method of clazz.methods)
      r+=doMethod(method,clazz.name)
    return r
  }
  function doList(list){
    let r=`---${list.description}\n---@alias ${list.name}\n`
    for(const entry of list.entries)
      r+=`---| '${entry}'\n`
    return r
  }
  function doGlobals(global){
    let r=""
    for(const field of global.fields){
      r+=`---${field.description}\n---@type ${doType(field.type)}\n${field.name}={}\n`
    }
    for(const method of global.methods){
      r+=doMethod(method)
    }
    return r
  }
  function createDocs(json) {
    let docs = {
      "global.lua":doGlobals(json.globals),
      "math.lua":doClass(json.math,true)
    }
    for(const global of json.globals.fields){
      switch(global.type){
        case "Function":continue
        default:break
      }
      if(global.name=="figuraMetatables")continue
      for(const clazz of global.children)
        docs[`${clazz.name}.lua`]=`---@diagnostic disable: duplicate-set-field\n${doClass(clazz)}`
    }
    for(const list of json.lists)
      docs[`${list.name}.lua`]=doList(list)
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
          setTimeout(downloadFile, i * 200, fileContents, fileName)
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