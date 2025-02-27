//1. Get DOM elements

const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');

//2. load items from localstorage or initialize empty array

let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

//3. function to save items to localstorage

function saveItems() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));

}

//4. function to render the shopping list

function renderItems() {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            items.splice(index, 1);
            saveItems();
            renderItems();

        };

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    });
}

//5. function to add a new item

function addItem() {
    const itemText = itemInput.value.trim();

    if (!itemText) {
        alert('Please enter an item!');
        return;
    }

    items.push(itemText);
    saveItems();
    renderItems();
    itemInput.value = '';

    //6. event listener for entry key

    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });
}

//7. initial render

renderItems();