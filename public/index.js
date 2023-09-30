
// import {text} from  "body-parser";
// { text } = require("body-parser");
// import bodyParser from;
const textArea = document.getElementById("text-input");
const coordInput = document.getElementById("coord");
const valInput = document.getElementById("val");
const errorMsg = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  fillpuzzle(textArea.value);
});

textArea.addEventListener("input", () => {
  fillpuzzle(textArea.value);
});

function fillpuzzle(data) {
  console.log('data '+data);
  let len = data.length < 81 ? data.length : 81;
  for (let i = 0; i < len; i++) {
    let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
    let col = (i % 9) + 1; 
    if (!data[i] || data[i] === ".") {
      document.getElementsByClassName(rowLetter + col)[0].innerText = " ";
      continue;
    }
    document.getElementsByClassName(rowLetter + col)[0].innerText = data[i];
  }
  return;
}

async function getSolved(event) {
  event.preventDefault(); 
  console.log('hai bai');
  const stuff = {"puzzle": textArea.value}
  console.log(textArea.value);
  
  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(stuff)
    });
    
    if (!response.ok) {
      throw new Error('input string should be 81 characters long and should not contain any characters other than digits[1-9] and .');
    }
    
    const data = await response.json();
    fillpuzzle(data);
    // Handle data here
  } catch (error) {
    console.error('Error:', error.message);
    errorMsg.innerHTML = `<code>${JSON.stringify(error.message, null, 2)}</code>`;
  }
}



async function getChecked(event) {
  event.preventDefault(); 
  const stuff = {"puzzle": textArea.value, "coordinate": coordInput.value, "value": valInput.value}
    try{
      const data = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(stuff)

      });
      if (data.ok) {
        
      const res = await data.json();
       if(res){
        errorMsg.innerHTML = `<code>${JSON.stringify(res, null, 2)}</code>`;
       }
      }
      
    }catch(error){
      errorMsg.innerHTML = `<code>${JSON.stringify(error.message, null, 2)}</code>`;
    }
 
  
}


document.getElementById("solve-button").addEventListener("click", getSolved)
document.getElementById("check-button").addEventListener("click", getChecked)