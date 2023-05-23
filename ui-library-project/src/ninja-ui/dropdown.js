import "./styles/dropdown.css"

class Dropdown{
    constructor(element){
        this.trigger = element.querySelector('.trigger');
        this.content = element.querySelector('.content');

    }
    init(){
        this.trigger.addEventListener('click', e => {
            this.trigger.classList.toggle('active');
            this.content.classList.toggle('active');
        });
    }

}

export {Dropdown as default};