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
  li.innerHTML += `<img id="${msgObj.id}" src="${msgObj.real_name}">`
  ul.appendChild(li)
  const imagebreaker = document.createElement("BR")
  li.appendChild(imagebreaker)
  li.innerHTML += msgObj.message
  const editform = document.createElement("FORM")
  li.appendChild(editform)
  const editlabel1 = document.createElement("label")
  editlabel1.innerHTML = "IMG Url:  "
  editform.prepend(editlabel1)
  const editinput1 = document.createElement("INPUT")
  editinput1.id = "edit-image-input"
  editinput1.type = "text"
  editform.append(editinput1)
  const editbreaker2 = document.createElement("BR")
  editform.append(editbreaker2)
  const editlabel2 = document.createElement("label")
  editlabel2.innerHTML = "Tweet:  "
  editform.append(editlabel2)
  const editinput2 = document.createElement("INPUT")
  editinput2.id = "edit-message-input"
  editinput2.type = "text"
  editform.append(editinput2)
  const editbreaker3 = document.createElement("BR")
  editform.append(editbreaker3)
  const editbutton = document.createElement("INPUT")
  editbutton.setAttribute("type", "submit")
  editbutton.setAttribute("value", "Edit")
  editbutton.setAttribute("id", `Edit-button${msgObj.id}`)
  editform.appendChild(editbutton)
}

//


// const breaker = document.createElement("BR")
// form.append(breaker)
// const label2 = document.createElement("label")
// label2.innerHTML = "Tweet:  "
// form.append(label2)
// const input2 = document.createElement("INPUT")
// input2.id = "img-input"
// input2.type = "text"
// form.appendChild(input2)
// const submitbutton = document.createElement("INPUT")
// submitbutton.setAttribute("type", "submit")
// form.appendChild(submitbutton)

// DATA PUSHER//
form.addEventListener('submit', e => {
      let li = document.createElement("li")
      li.innerHTML += e.target.children[4].value
      ul.prepend(li)
      li.innerHTML += `<img id="${e.target.children[1].value}" src="${e.target.children[1].value}">`
      const new_form = document.createElement("FORM")
      const editbutton = document.createElement("INPUT")
      editbutton.setAttribute("type", "edit")
      new_form.appendChild(editbutton)
      e.preventDefault()
      fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages`, {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message:{message: e.target.children[4].value, real_name: e.target.children[1].value}
      })
    })
})
//

// DATA UPDATER //
document.addEventListener('click', e => {
  if (e.target.id.includes("Edit-button")){
      e.preventDefault()
      var cleaned_id = e.target.id.replace('Edit-button','')
      fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${cleaned_id}`, {
        method: "PATCH",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({message:{message: e.target.parentNode.children[4].value, real_name: e.target.parentNode.children[1].value}
        })
      }).then(res => res.json())
      .then(json => {debugger})
    }
})
//


// DATA DELETER //
document.addEventListener('click', e => {
      if (e.target.id && e.target.localName == "img"){
        let deleteObj = document.getElementById(e.target.id)
        e.target.parentNode.parentNode.removeChild(deleteObj.parentNode)
        fetch(`https://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${e.target.id}`, {
        method: "DELETE",
        headers:{'Content-Type':'application/json'},
      })
      }
})
//
