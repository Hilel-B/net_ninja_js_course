import './styles/snackbar.css'

class Snackbar{
    constructor(){
        this.snackbar = document.createElement('div');
    }
    init(){
        this.snackbar.classList.add('snackbar');
        document.querySelector('body').appendChild(this.snackbar);
    }
    show(message){
        this.snackbar.classList.add('active');
        this.snackbar.innerText = message;

        setTimeout(()=>{
            this.snackbar.classList.remove('active');
        }, 3000);
    }
}

export {Snackbar as default};