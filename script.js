const formEl = document.querySelector('form');
let amountEl = document.getElementById('expense-amount');
let descriptionEl = document.getElementById('description');
let categoryEl = document.getElementById('category');
const ul = document.querySelector('ul');

function addToLS(amount, description, category ){
  localStorage.setItem(description, JSON.stringify({amount,description,category}));
}

formEl.addEventListener('submit',(e)=>{
  e.preventDefault();

  let li = document.createElement('li');
  li.setAttribute("data-info", descriptionEl.value);
  li.innerHTML = `${amountEl.value} - ${descriptionEl.value} - ${categoryEl.value}   <button class="delete">Delete Expense</button><button class="edit">Edit Expense</button>`;

  addToLS(amountEl.value, descriptionEl.value, categoryEl.value);

  ul.appendChild(li);

  amountEl.value = "";
  categoryEl.value = "";
  descriptionEl.value = "";
})

ul.addEventListener("click", (e) => {
const target = e.target;

if (target.classList.contains("delete")) {
  // Handle delete action
  const listToDelete = target.parentElement;
  const description = listToDelete.dataset.info;
  localStorage.removeItem(description);
  ul.removeChild(listToDelete);
} else if (target.classList.contains("edit")) {
  // Handle edit action
  const listToEdit = target.parentElement;
  const description = listToEdit.dataset.info;
  const LSdata = JSON.parse(localStorage.getItem(description));
  localStorage.removeItem(description);
  ul.removeChild(listToEdit);

  // Populate the form fields with the existing data
  amountEl.value = LSdata.amount;
  descriptionEl.value = LSdata.description;
  categoryEl.value = LSdata.category;
}
});