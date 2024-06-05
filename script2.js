const form_id = document.querySelector('#form');
let percent = 0;

form_id.addEventListener('submit', (e)=>{
    e.preventDefault();
    let salary_input = document.querySelector('#salary');

    let total_percent = (+salary_input.value * percent) / 100;

    let total_price = total_percent + +salary_input.value;

    console.log(total_price);

})

function Price(val){
    percent  = val
}