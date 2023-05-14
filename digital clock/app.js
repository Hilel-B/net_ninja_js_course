const clock = document.querySelector('.clock');
let time = new Date();

// console.log(new Date());

setInterval(()=>{
    time = new Date();
    clock.innerText = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
},100);