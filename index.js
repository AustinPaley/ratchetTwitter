//GLOBAL VARIABLES//
const ul = document.createElement("ul")
document.getElementsByTagName('BODY')[0].appendChild(ul)

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

// //DATA PUSHER//
form.addEventListener('keydown', e => {
    e.preventDefault()
    fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages`, {
    method: "POST",
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({message:{message: e.target.children[0].value}
    })
  })
})
// //
