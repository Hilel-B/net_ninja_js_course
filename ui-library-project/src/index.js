import Tooltip from "./ninja-ui/tooltip";
import Dropdown from "./ninja-ui/dropdown";
import Tab from "./ninja-ui/tabs";
import Snackbar from "./ninja-ui/snackbar";

const tooltip = new Tooltip(document.querySelector('.tooltip'));

tooltip.init();


const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((drop =>{
    const el = new Dropdown(drop);
    el.init();
}))

const tabs = document.querySelectorAll('.tabs .trigger');

tabs.forEach(el =>{
    const tab = new Tab(el);
    tab.init();
});

const snack = new Snackbar();
snack.init();

document.querySelector('.snackbar-trigger').addEventListener('click', ()=>{
    snack.show('heyo');
});