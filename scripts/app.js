//dom queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const updateNameForm = document.querySelector('.new-name')
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = newChatForm.message.value.trim()
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
})

//update username
updateNameForm.addEventListener('submit', e => {
    e.preventDefault()
    // update name via chatroom
    const newName = updateNameForm.name.value.trim()
    chatroom.updateName(newName)
    // reset the form
    updateNameForm.reset()
    // show then hide the update message
    updateMssg.innerHTML = `Your name was updated to: <span class="text-bold">${newName}</span>`
    setTimeout(() => updateMssg.innerText = "", 3000)
})
//update the chat room
rooms.addEventListener('click', e => {
    // console.log(e)
    if(e.target.nodeName === 'BUTTON'){
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChat(chat => chatUI.render(chat))
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon'

// class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username)



//get the chat and render
chatroom.getChat( data => chatUI.render(data))

