import "./styles/tabs.css";

class Tab{
    constructor(trigger){
        this.trigger = trigger;
        this.target = document.querySelector(trigger.getAttribute('data-target'));
    }

    init(){

        this.trigger.addEventListener('click', ()=>{
            const tabActive = document.querySelector('.tabs .trigger.active');
            tabActive.classList.remove('active');
            this.trigger.classList.add('active');

            const targetActive = document.querySelector('.tabs .content.active');
            targetActive.classList.remove('active');
            this.target.classList.add('active');

        })
    }
}

export {Tab as default};