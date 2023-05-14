let todoList = ['1','12','3','4'];
const List = document.querySelector('.todos');
const search = document.querySelector('.search');
const add = document.querySelector('.new');


displayCards();

add.addEventListener('submit', e => {
    e.preventDefault();
    let value = e.target.new.value.trim();
    if(value){
        todoList.push(value);
        displayCards();
        add.reset();
    }
    

});

List.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        todoList = todoList.filter(todo => todo != e.target.parentElement.innerText);
        displayCards();

    }
});


search.addEventListener('keyup', (e) =>{
    const regex = new RegExp(e.target.value.toLowerCase());
    const result = todoList.filter(todo =>{
            return regex.test(todo.toLowerCase());
    });
    displayCards(result);
});



function displayCards(display = todoList){
    let toDisplay = '';
    display.map(todo => {
        toDisplay += `<li class="list-group-item">${card(todo)}</li>`;
    });
    List.innerHTML = toDisplay;
}

function card(item){
    return `<li class="list-group-item d-flex justify-content-between align-item-centered text-light">
    ${item}<i class="fas fa-trash-alt delete"></i>
    </li>`;
}