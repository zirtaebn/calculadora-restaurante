// variables
let informationInput = document.querySelector('.information-input');
let serviceBttns = document.querySelectorAll('[data-service]');
let customBttn = document.querySelector('[data-custom]');
let custom_div = document.querySelector('.custom-div');
let customInput = document.createElement('input');
let addBttn = document.querySelector('[data-add-people]');
let calcBttn = document.querySelector('[data-calculate-bill]');
let firstPanel = document.querySelector('.first-panel')
let secondPanel = document.querySelector('.second-panel');
let person = {};
let txt = [];
let number = [];
let service = null;
let total_result = null;
let total = null;


// events
addBttn.addEventListener('click', addPeople);
calcBttn.addEventListener('click', calculateBill);
serviceBttns.forEach(serviceBttn => serviceBttn.addEventListener('click', serviceRate))
customBttn.addEventListener('click', customServiceRate);


// functions
function addPeople(){

    let appendInputText = document.createElement('input');
    appendInputText.setAttribute('class', 'input-text');
    appendInputText.setAttribute('type', 'text');
    appendInputText.setAttribute('placeholder', 'Qual o nome?');

    let appendInputNumber = document.createElement('input');
    appendInputNumber.setAttribute('class', 'input-number');
    appendInputNumber.setAttribute('type', 'number');
    appendInputNumber.setAttribute('placeholder', 'Quanto gastou?');
  
    informationInput.appendChild(appendInputText);
    informationInput.appendChild(appendInputNumber);
}


function calculateBill(){

    let inputText = document.querySelectorAll('.input-text');
    inputText.forEach(getValue);

    let inputNumber = document.querySelectorAll('.input-number');
    inputNumber.forEach(getValue);

    if(service == null){

        return alert('Selecione uma taxa!');
    }
    
    if(inputNumber.innerHTML !== '' || inputText.innerHTML !== ''){

        for(let index = 0; index < txt.length ; index++){

            let result = 0;
    
            person.name = txt[index];
            person.spend = parseFloat(number[index]);
            
            result = (person.spend * service).toFixed(2);
    
            total_result += parseFloat(result);
            total += person.spend * service;
    
            firstPanel.style.display = 'none';
            secondPanel.style.display = 'flex';
    
            let div = document.createElement('div');
            div.innerHTML = `${person.name[0].toUpperCase()+person.name.substr(1)} - R$ ${result}`;
            div.setAttribute('class', 'result-div');
    
            secondPanel.appendChild(div);
    
            if(total !== total_result){
    
                let delta = total - total_result;
    
                document.getElementsByClassName('result-div')[0].innerHTML = `${txt[0][0].toUpperCase()+txt[0].substr(1)} - R$ ${((parseFloat(number[0]) * service) + delta).toFixed(2)}`
            } 
        }
    
        let div = document.createElement('div');
        div.innerHTML = `Total da conta: R$ ${(total).toFixed(2)}`;
        div.setAttribute('class', 'total-div')
        secondPanel.appendChild(div);  
    }else{

        return alert('Preencha todos os campos!')
    }
}


function getValue(element){

    if(element.value == ''){
        
        return ;
    }
  
    if(isNaN(element.value)){

        txt.push(element.value)
    }else{

        number.push(element.value)
    }
}


function serviceRate(event){

    let serviceBoolean = false;

    serviceBttns.forEach(serviceBttn => 
        serviceBttn.style.backgroundColor = 'rgb(13, 92, 81)');
    
    serviceBttns.forEach(serviceBttn => 
        serviceBttn.style.color = 'white');

    if(event.target.innerHTML == '10%'){
        service = 1.10;
      
    }else if(event.target.innerHTML == '11%'){
        service = 1.11;
        
    }else if(event.target.innerHTML == '12%'){
        service = 1.12;
       
    }else{
        service = 1.13; 
    }

    if(!serviceBoolean){

        event.target.style.backgroundColor = 'rgb(57, 182, 182)';
        event.target.style.color = 'rgb(10, 68, 68)';
        serviceBoolean = true;
    }    
}

// function customServiceRate(){

//     customInput.setAttribute('type', 'number');
//     customInput.setAttribute('class', 'custom-input');
//     customInput.setAttribute('placeholder','%');

//     // console.log(customInput.value);

//     custom_div.appendChild(customInput);
// }

