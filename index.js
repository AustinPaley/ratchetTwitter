//GLOBAL VARIABLES//
const ul = document.createElement("ul")
document.getElementsByTagName('BODY')[0].appendChild(ul)
const form = document.querySelector('#new-gif-form')
const input = document.querySelector('#new-gif-input')
const label1 = document.createElement("label")
label1.innerHTML = "IMG Url:  "
form.prepend(label1)
const breaker = document.createElement("BR")
form.append(breaker)
const label2 = document.createElement("label")
label2.innerHTML = "Tweet:  "
form.append(label2)
const input2 = document.createElement("INPUT")
input2.id = "img-input"
input2.type = "text"
form.appendChild(input2)
const submitbutton = document.createElement("INPUT")
submitbutton.setAttribute("type", "submit")
form.appendChild(submitbutton)

//

// GETTING THE DATA FROM THE API //
fetch ('https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages')
.then(response => response.json())
.then(jsondata => jsondata.forEach( msgObj => {create(msgObj)} ))
//

// MASTER RENDERING//
function create(msgObj){
  let li = document.createElement("li")
  li.innerHTML += msgObj.message
  ul.appendChild(li)
  let img = document.createElement("img")
  li.innerHTML += `<img src="${msgObj.real_name}">`
  li.appendChild(img)
  console.log(msgObj)
}
//

// DATA PUSHER//
form.addEventListener('submit', e => {
  debugger
    e.preventDefault()
      fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages`, {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message:{message: e.target.children[4].value, real_name: e.target.children[1].value}
      })
    })
})
// //
