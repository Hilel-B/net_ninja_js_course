class ChatUI{
    constructor(list){
        this.list = list;
    }

    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix:true}
        )
        this.list.insertAdjacentHTML('beforeend',
        `<li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
        </li>`)
    }
    clear(){
        this.list.innerHTML = '';
    }

}