# AutoGenerateFiguraDocs
Generates EmmyLua documentation from the exported docs of Figura.

How to use:
- download the html file from latest release
- double click to open.
  - if a web browser doesnt open by default, drag and drop the html file onto an open web browser
- on the opened web page, click on the `Download?` checkbox
- open Minecraft with figura installed and run the command `/figura export_docs`
- back on the web page, select `Choose File` and select the exported `.json` file
- A zip file containing `.lua` files will be downloaded.
  - These are files compatible with any IDE with a Lua Language Server
  
The following is a way to get these files working for VSCode.
- Install the [Lua Language Server extension by sumneko](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
- Open the avatar's folder in VSCode
  - Right click the folder in File Explorer and select Open With Code
  - Alternativly, Launch VSCode Normally->File->Open Folder->Select avatar folder
- Create a new folder called `.docs`
  - Figura ignores any folder that starts with a `.` when loading avatars
- Extract the documentation files into the folder.
Tada. Done.
