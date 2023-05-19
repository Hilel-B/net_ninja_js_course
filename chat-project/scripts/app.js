const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newUsername = document.querySelector('.new-name');
const chatrooms = document.querySelector('.chat-rooms');
const updateMsg = document.querySelector('.update-msg');

// class instances
const chatUI = new ChatUI(chatList)
const username = JSON.parse(localStorage.getItem('chat-username')) || 'anon';
const chatroom = new Chatroom('general', username);


//get chats and render
chatroom.getChats(data =>{
    chatUI.render(data)
})


newChat.addEventListener('submit', e =>{
    e.preventDefault();

    // console.log(e.target.message.value);
    const message = e.target.message.value.trim();
    if(message){
        chatroom.addChat(message).then(()=>{
            e.target.reset();
        }).catch(err=>{
            console.log(err);
        });
    }
    

});

newUsername.addEventListener('submit', e => {
    e.preventDefault();
    const newName = e.target.name.value;

    chatroom.updateName(newName);
    e.target.name.value ='';

    updateMsg.innerText = `Your username was updated to ${newName}`;
    updateMsg.classList.toggle('d-none');
    setTimeout(()=>{
        updateMsg.classList.toggle('d-none');
    }, 3000);

});

chatrooms.addEventListener('click', e => {
    if(e.target.classList.contains('btn')){
        chatroom.updateRoom(e.target.id);
        chatUI.clear();
        chatroom.getChats(data => {
            chatUI.render(data);
        });
    }
});