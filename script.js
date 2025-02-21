let ingredients = [];
let steps = [];

const recipeObj = {
  constructor(name, steps = []) {
    this.name = name;
    this.steps = steps;
  },
};

function stepObj(step, minuteCost = 0, description = "", ingredients = []) {
  this.step = step;
  this.minuteCost = minuteCost;
  this.description = description;
  this.ingredients = ingredients;
}

function ingredientObj(name = "", measurement = null, amount = 0) {
  this.name = name;
  this.measurement = measurement;
  this.amount = amount;
}

function sidebar_open() {
  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("mySidebar").style.display = "block";
}

function sidebar_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("opensidebar").style.display = "inline-block";
}

console.log(document.getElementById("opensidebar"));
document.getElementById("opensidebar").addEventListener("click", () => {
  if (
    !document.getElementById("opensidebar").classList.contains("sidebar_opened")
  ) {
    sidebar_open();
  } else {
    sidebar_close();
  }
  document.getElementById("opensidebar").classList.toggle("sidebar_opened");
});

function renderList(list, containerId, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear the container

  for (let i = 0; i < list.length; i++) {
    const newRow = document.createElement("tr");
    newRow.classList.add(type);

    if (type === "steps") {
      newRow.innerHTML = `
        <td>${i + 1}</td>
        <td onclick="modifyItem(${i}, '${type}')">${list[i].step}</td>
        <td onclick="modifyItem(${i}, '${type}')">${list[i].minuteCost}</td>
        <td onclick="modifyItem(${i}, '${type}')">${list[i].ingredients.join(
        ", "
      )}</td>
        <td>
          <button class="twoDbutton no-shadow" onclick="modifyItem(${i}, '${type}')">✍️</button>
          <button class="twoDbutton no-shadow" onclick="deleteItem(${i}, '${type}')">❌</button>
        </td>`;
    } else {
      newRow.innerHTML = `
        <td onclick="modifyItem(${i}, '${type}')">${list[i].name}</td>
        <td onclick="modifyItem(${i}, '${type}')">${list[i].amount}</td>
        <td>
          <select name="measurement" id="measurementSelect">
            <option value="tsp">tsp.</option>
            <option value="tbsp">tbsp.</option>
            <option value="cup">cup</option>
            <option value="pint">pint</option>
            <option value="quart">quart</option>
            <option value="gallon">gallon</option>
          </select>
        </td>
        <td>
          <button class="twoDbutton no-shadow" onclick="modifyItem(${i}, '${type}')">✍️</button>
          <button class="twoDbutton no-shadow" onclick="deleteItem(${i}, '${type}')">❌</button>
        </td>`;
    }

    container.appendChild(newRow);
  }
}

function handleButtonClick(buttonId, inputId, type) {
  document.getElementById(buttonId).addEventListener("click", () => {
    const inputValue = document.getElementById(inputId).value;
    if (inputValue !== "") {
      addItem(inputValue, type);
    }
    document.getElementById(inputId).value = "";
  });

  document
    .getElementById(inputId)
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById(buttonId).click();
      }
    });
}

function modifyStepIndex(index) {}
function modifyMinuteCost(index) {}
function modifyStepIngredients(index) {}
function modifyDescription(index) {}

function modifyIngredientName(index) {}
function modifyIngredientMeasurement(index) {}
function modifyIngredientAmount(index) {}

function modifyItem(index, type) {
  const container = document.getElementById(
    type === "ingredients" ? "ingredientList" : "stepList"
  );
  const item = container.children[index];
  if (type === "steps") {
    modifyStepIndex(index);
    modifyMinuteCost(index);
    modifyStepIngredients(index);
    modifyDescription(index);
  } else {
    modifyIngredientName(index);
    modifyIngredientMeasurement(index);
    modifyIngredientAmount(index);
  }
}

// const currentValue =
//   type === "ingredients" ? ingredients[index].name : steps[index].step;

// const inputBox = document.createElement("input");
// inputBox.type = "text";
// inputBox.value = currentValue;
// inputBox.classList.add("editInput");

//   if (type === "steps") {
//     const minuteInput = document.createElement("input");
//     minuteInput.type = "number";
//     minuteInput.placeholder = "예상 소요 시간 (분)";
//     minuteInput.classList.add("input");
//     minuteInput.value = steps[index].minuteCost;

//     const ingredientInput = document.createElement("input");
//     ingredientInput.type = "text";
//     ingredientInput.placeholder = "재료";
//     ingredientInput.classList.add("input");
//     ingredientInput.value = steps[index].ingredients.join(", ");

//     item.innerHTML = "";
//     item.appendChild(inputBox);
//     item.appendChild(minuteInput);
//     item.appendChild(ingredientInput);

//     minuteInput.addEventListener("blur", () => {
//       steps[index].minuteCost = minuteInput.value;
//     });

//     ingredientInput.addEventListener("blur", () => {
//       steps[index].ingredients = ingredientInput.value.split(", ");
//     });
//   } else {
//     const amountInput = document.createElement("input");
//     amountInput.type = "number";
//     amountInput.placeholder = "필요한 양";
//     amountInput.classList.add("input");
//     amountInput.value = ingredients[index].amount;

//     item.innerHTML = "";
//     item.appendChild(inputBox);
//     item.appendChild(amountInput);

//     amountInput.addEventListener("blur", () => {
//       ingredients[index].amount = amountInput.value;
//     });
//   }

//   inputBox.addEventListener("blur", () => {
//     const newValue = inputBox.value;
//     if (type === "ingredients") {
//       ingredients[index].name = newValue;
//       renderList(ingredients, "ingredientList", "ingredients");
//     } else {
//       steps[index].step = newValue;
//       renderList(steps, "stepList", "steps");
//     }
//   });

//   inputBox.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       inputBox.blur();
//     }
//   });

//   inputBox.focus();
// }

function deleteItem(index, type) {
  if (type === "ingredients") {
    ingredients.splice(index, 1);
    renderList(ingredients, "ingredientList", "ingredients");
  } else {
    steps.splice(index, 1);
    renderList(steps, "stepList", "steps");
  }
}

function addItem(item, type) {
  if (type === "ingredients") {
    const newIngredient = new ingredientObj(item);
    ingredients.push(newIngredient);
    renderList(ingredients, "ingredientList", "ingredients");
  } else {
    const newStep = new stepObj(item);
    steps.push(newStep);
    renderList(steps, "stepList", "steps");
  }
}

// Initial render
renderList(steps, "stepList", "steps");
renderList(ingredients, "ingredientList", "ingredients");
handleButtonClick("stepAddButton", "stepInput", "steps");
handleButtonClick("ingredientAddButton", "ingredientInput", "ingredients");
