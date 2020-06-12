const { dialog } = require("electron");

const { readdir, stat } = require("fs").promises;
const { join, extname } = require("path");

//icons taken from https://www.iconfinder.com/
const extToIco = {
  mp3: "music",
  wav: "music",
  "7z": "zip",
  zip: "zip",
  gz: "zip",
  csv: "csv",
  xml: "xml",
  exe: "exe",
  py: "py",
  gif: "image",
  ico: "image",
  jpeg: "image",
  jpg: "image",
  svg: "image",
  css: "css",
  js: "js",
  php: "php",
  html: "html",
  htm: "html",
  ppt: "ppt",
  pptx: "ppt",
  c: "c",
  class: "class",
  cpp: "cpp",
  java: "java",
  xls: "xls",
  xlsm: "xls",
  xlsx: "xlsx",
  m4v: "video",
  mkv: "video",
  mpg: "video",
  mpeg: "video",
  wmv: "video",
  doc: "doc",
  docx: "doc",
  pdf: "pdf",
  txt: "txt",
};

const folderSelectDialog = async (event, arg, win) => {
  //taken from https://jaketrent.com/post/select-directory-in-electron/
  const result = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    let returnFiles = {};
    let statQueries = [];
    //TODO handle IO errors
    await readdir(result.filePaths[0]).then((subFiles) => {
      subFiles.forEach((file) => {
        const fullPath = join(result.filePaths[0], file);
        statQueries.push(
          stat(fullPath).then((stats) => {
            if (stats.isFile()) {
              returnFiles[fullPath] = file;
            }
          })
        );
      });
    });
    await Promise.all(statQueries);
    event.reply("dirs-selected", {
      chosenDir: result.filePaths[0],
      files: returnFiles,
      cancelled: false,
    });
  } else {
    event.reply("dirs-selected", {
      chosenDir: undefined,
      files: undefined,
      cancelled: true,
    });
  }
};

const dragToOSHandler = (event, filePath) => {
  const ext = extname(filePath).substring(1);

  let icoName = extToIco[ext];
  if (icoName === undefined) {
    icoName = "unknown";
  }

  const icoPath = join(__dirname, "..", "static", `${icoName}.png`);
  event.sender.startDrag({
    file: filePath,
    icon: icoPath,
  });
};
module.exports = {
  folderSelectDialog,
  dragToOSHandler,
};
