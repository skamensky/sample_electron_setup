const { ipcRenderer } = require("electron");

const handleDropEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const dragArea = document.getElementById("dragArea");
  if (event.path.includes(dragArea)) {
    document.getElementById("dragArea").classList.remove("droppable");
    for (const f of event.dataTransfer.files) {
      const div = document.createElement("div");
      div.textContent = f.name;
      dragArea.appendChild(div);
    }
  }
};

const handleDragover = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const dragArea = document.getElementById("dragArea");
  if (event.path.includes(dragArea)) {
    document.getElementById("dragArea").classList.add("droppable");
    document.getElementById("dragArea").classList.remove("initialLoad");
  }
};

const handleDragEnter = (event) => {
  const dragArea = document.getElementById("dragArea");

  if (event.relatedTarget === dragArea) {
    document.getElementById("dragArea").classList.add("droppable");
    document.getElementById("dragArea").classList.remove("initialLoad");
  } else {
    document.getElementById("dragArea").classList.remove("droppable");
  }
};

const handleDragLeave = (event) => {
  const dragArea = document.getElementById("dragArea");
  if (event.fromElement === dragArea) {
    document.getElementById("dragArea").classList.remove("droppable");
  }
};

const listFiles = () => {
  ipcRenderer.once("dirs-selected", (event, result) => {
    const { files, cancelled, chosenDir } = result;
    if (!cancelled) {
      const fileResultsDiv = document.getElementById("fileResults");
      fileResultsDiv.innerHTML = "";
      const infoDiv = document.createElement("div");

      infoDiv.className = "fileListingInfo";

      if (!Object.keys(files).length) {
        infoDiv.textContent = `No Files in ${chosenDir}`;
      } else {
        infoDiv.textContent =
          "Drag a file from here to the OS to copy it. You should see the correct icon for most common files 📂";
      }

      fileResultsDiv.appendChild(infoDiv);
      for (const filePath in files) {
        const div = document.createElement("div");
        div.textContent = filePath;
        div.className = "filePath";
        div.draggable = true;
        div.addEventListener("dragstart", dragFilePathHandler);
        div.addEventListener("selectstart", (event) => {
          event.preventDefault();
        });
        fileResultsDiv.appendChild(div);
      }
    }
  });
  ipcRenderer.send("select-dirs");
};

const dragFilePathHandler = (event) => {
  event.preventDefault();
  const filePath = event.target.textContent;
  ipcRenderer.send("ondragstart", filePath);
};

module.exports = {
  handleDropEvent,
  handleDragover,
  handleDragEnter,
  handleDragLeave,
  listFiles,
};
