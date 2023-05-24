import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged

} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQhIyg8FUaCnrMU2kPoeqTv8FGp7vbDz8",
  authDomain: "udemy-javascript-project-38f6c.firebaseapp.com",
  projectId: "udemy-javascript-project-38f6c",
  storageBucket: "udemy-javascript-project-38f6c.appspot.com",
  messagingSenderId: "1005107545280",
  appId: "1:1005107545280:web:f82388c126e9c152d91925",
  measurementId: "G-3Q87HZTR8P"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);

const db = getFirestore();

const colRef = collection(db, 'books');

const q = query(colRef, orderBy('created_at'));


const unsubCol = onSnapshot(q, snapshot =>{
    let books = [];
        snapshot.docs.forEach(doc =>{
            books.push({...doc.data(), id:doc.id});
        })
        console.log(books);
})


const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', e=>{
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        created_at: serverTimestamp()
    })
    .then(()=>{
        addBookForm.reset();
    })


});

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', e =>{
    e.preventDefault();

        const docRef = doc(db, 'books', deleteBookForm.id.value);
        deleteDoc(docRef).then(()=>{
            deleteBookForm.reset();
        })

});

const docRef = doc(db, 'books', '6ud5Pyh8avlGExrQdYyd');

// getDoc(docRef)
//     .then(doc =>{
//         console.log(doc.data())
//     });

const unsubDoc = onSnapshot(docRef, doc =>{
        console.log(doc.data(), doc.id)
});

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', e=>{
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);
    updateDoc(docRef, {
        title: 'www'
    }).then(()=>{
        updateForm.reset();
    })
})

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(cred=>{
        console.log('user created',cred);
        signupForm.reset();
    })
    .catch(err=>console.log(err));
});

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', e=>{
    signOut(auth)
    .then(()=>{
        // console.log('logged out');
    })
    .catch(err => console.log(err));
})


const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', e =>{
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then(cred =>{
        // console.log('logged in', cred);
    })
    .catch(err =>console.log(err));
})


const unsubAuth = onAuthStateChanged(auth, user=>{
    console.log('user status changed:',user);
})

const unsub = document.querySelector('.unsub');
unsub.addEventListener('click', ()=>{
    console.log('unsubbed');
    unsubCol();
    unsubDoc();
    unsubAuth();
})



