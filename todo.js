var title, dueDate, description;
var modelItems = [];

var listContainer = document.getElementById('container');
setDefault();
document.getElementById("button").addEventListener("click", (event) => {
  event.preventDefault();
  validateTitle();
});

function setDefault() {
  let defaultChild = document.createElement("div");
  defaultChild.style.color = "#172280";
  defaultChild.textContent = "There are no TO-DOs yet.";
  listContainer.appendChild(defaultChild);
}

function createListItem(data, index) {
  let listItem = document.createElement("li");
  listItem.setAttribute("class", "list-item");
  let serialNumber = document.createElement("div");
  serialNumber.setAttribute("class", "serial-number");
  serialNumber.innerHTML = (index + 1).toString();
  let details = document.createElement("div");
  details.setAttribute("class", "details");
  let itemTitle = document.createElement("div");
  itemTitle.setAttribute("class", "item-title");
  itemTitle.innerHTML = data["title"].toString();
  let subtitle = document.createElement("div");
  subtitle.setAttribute("class", "item-description");
  subtitle.innerHTML = data["description"].toString();
  details.appendChild(itemTitle);
  details.appendChild(subtitle);
  let dueDate = document.createElement("div");
  dueDate.setAttribute("class", "date");
  dueDate.innerHTML = data["date"].toString();
  let itemDelete = document.createElement("div");
  itemDelete.setAttribute("class", "delete");
  let button = document.createElement("i");
  button.setAttribute("class", "fa fa-remove icon");
  itemDelete.appendChild(button);
  itemDelete.addEventListener("click", () => deleteTodo(index));

  listItem.appendChild(serialNumber);
  listItem.appendChild(details);
  listItem.appendChild(dueDate);
  listItem.appendChild(itemDelete);

  return listItem;
}

function validateTitle() {
  title = document.getElementById("title").value;
  if(title === "" || title.length <= 1) {
    alert('Todo title must be filled correctly!');
    return false;
  } else {
    validateDate();
  }
}

function validateDate() {
  dueDate = document.getElementById("date").value;
  if(dueDate === null || dueDate === "") {
    alert("The due date must be filled properly");
    return;
  }
  else {
    let dateList = dueDate.split("-");
    let getTime = new Date(dateList[0], (dateList[1] - 1), dateList[2]).getTime();
    let currentTime = new Date().getTime();
    if(currentTime > getTime) {
      alert("You cannot set a date in the past. Please set the due date correctly.");
      return;
    }
  }
  
  validateDescription();
}

function validateDescription() {
  description = document.getElementById("description").value;
  if(description === "" || description.length <= 1) {
    alert('Todo description must be filled correctly!');
    return false;
  } else {
    createModel();
  }
}

function createModel() {
  let todoTitle = "";
  let todoDescription = "";
  if(title.length > 20) {
    todoTitle = `${title.slice(0, 19)}...`;
  } else {
    todoTitle = title;
  }

  if(description.length > 70) {
    todoDescription = `${description.slice(0, 69)}...`;
  } else {
    todoDescription = description;
  }
  let todoModel = {
    title: todoTitle,
    date: dueDate,
    description: todoDescription,
  }

  modelItems.push(todoModel);

  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";

  renderNode();
}

function deleteTodo(index) {
  modelItems.splice(index, 1);
  renderNode();
}

function renderNode() {
  listContainer.querySelectorAll("*").forEach(n => n.remove());
  modelItems.forEach((item, index) => {
    let listItem = createListItem(item, index);
    listContainer.appendChild(listItem);
  });
  if(modelItems.length < 1) {
    setDefault();
  }
}
