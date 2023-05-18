const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');




const addRecipe = (recipe, id)=>{
    let time = recipe.created_at.toDate();
    list.insertAdjacentHTML("beforeend",`
    <li data-id="${id}">
        <div>
        ${recipe.title}
        </div>
        <div>
        ${time}
        </div>
        <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
    `);
};

const removeRecipe = (id) => {
    const recipe = list.querySelector(`[data-id=${id}]`);
    recipe.remove();

};

const unsub = db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(el => {

        switch (el.type){
            case 'added':
                addRecipe(el.doc.data(), el.doc.id)
                break;
            case 'removed':
                removeRecipe(el.doc.id);
                break;
        }

    });
})


form.addEventListener('submit', e =>{
    e.preventDefault();

    let now = new Date();

    db.collection('recipes').add({
        title: e.target.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }).then(()=>{
        console.log('recipe added');
    }).catch(err =>{
        console.log('error', err);
    });

    form.reset();
});

list.addEventListener('click', e => {
    if(e.target.innerText == 'delete'){
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('recipes').doc(id).delete().then(()=>{
            console.log('recipe deleted');
        }).catch(err=>{
            console.log(err);
        })
    }
});

button.addEventListener('click', e=>{
    unsub();
    console.log('unsub');
});