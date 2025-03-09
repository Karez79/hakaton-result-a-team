import "./styles.css";
import { ContextMenu } from "./menu";

const menu = new ContextMenu("#menu");

menu.init();

let counterDB = 0;
let counter = 0;

let flag = false;


document.body.addEventListener('dblclick', ()=> {
    console.log('dbclick!')  
    if(flag)  {
        counter--;
        flag = !flag
    }
    counterDB++
    console.log(counterDB)
    console.log(counter, 'db')

})
document.body.addEventListener('click', ()=> {
    console.log('click!')
    flag = true
    counter++
    console.log(counter)
})