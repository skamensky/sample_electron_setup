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

module.exports = {
  handleDropEvent,
  handleDragover,
  handleDragEnter,
  handleDragLeave,
};
