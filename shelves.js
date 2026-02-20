const shelves = [[], [], [], [], [], []];

function renderShelves() {
  const places = document.getElementsByClassName("place");

  for (let i = 0; i < places.length; i++) {
    places[i].innerText = `場所 ${i + 1} : `;
    const items = shelves[i];

    for (let j = 0; j < items.length; j++) {
      const span = document.createElement("span");
      span.innerText = items[j];
      span.style.cursor = "pointer";
      span.style.marginRight = "10px";
      span.style.backgroundColor = "yellow";
      span.addEventListener("click", function () {
        document.getElementById("itemInput").value = items[j];
        document.getElementById("placeInput").value = i + 1;
      })
      places[i].appendChild(span);
    }
  }
  return;
}

function addItem() {
  const itemInput = document.getElementById("itemInput");
  const item = itemInput.value;
  const placeInput = document.getElementById("placeInput");
  const place = Number(placeInput.value);

  if (item === "") { // ②チェック
    alert("アイテム名を入力してください。");
    return;
  }
  if (place < 1 || place > 6 || Number.isNaN(place)) {
    alert("場所には1～6の数字を入力してください。")
    return;
  }
  if (shelves[place - 1].length >= 20) {
    alert("その場所にはもうアイテムを入れることはできません。")
    return;
  }
  for (const items of shelves) {
    for (const pickItem of items) {
      if (pickItem === item) {
        alert("そのアイテム名はもうすでにあります、別の名前を入力してください。")
        return;
      }
    }
  }
  shelves[place - 1].push(item);
  renderShelves();
  itemInput.value = "";
  placeInput.value = "";
  localStorage.setItem("shelvesData", JSON.stringify(shelves));
  return;
}

function removeItem() {
  const itemInput = document.getElementById("itemInput");
  const item = itemInput.value;
  const placeInput = document.getElementById("placeInput");
  const place = Number(placeInput.value);

  if (item === "") {
    alert("アイテム名を入力してください。");
    return;
  }
  if (place < 1 || place > 6 || Number.isNaN(place)) {
    alert("場所には1～6の数字を入力してください。")
    return;
  }
  const targetItems = shelves[place - 1];
  for (let i = 0; i < targetItems.length; i++) {
    if (targetItems[i] === item) {
      targetItems.splice(i, 1);
      renderShelves();
      itemInput.value = "";
      placeInput.value = "";
      localStorage.setItem("shelvesData", JSON.stringify(shelves));
      return;
    }
  }
  alert("そのアイテムは見つかりませんでした。");
  return;
}

const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

addBtn.addEventListener("click", addItem);
removeBtn.addEventListener("click", removeItem);

window.addEventListener("load", function () {
  const savedData = localStorage.getItem("shelvesData");
  
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    for (let i = 0; i < parsedData.length; i++) {
      shelves[i] = parsedData[i];
    }
    renderShelves();
  }
});
