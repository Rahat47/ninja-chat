//Dom Queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const notificationBox = document.querySelector('.update-msg')
const welcome = document.querySelector('.welcome')
const rooms = document.querySelector('.chat-rooms')
const roomBtn = document.querySelectorAll('.chat-rooms > .btn')
//events
//adding a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = newChatForm.message.value.trim()
    chatroom.addChat(message)
        .then( () => newChatForm.reset())
        .catch(err => console.log(err))
})
//Updating the username
newNameForm.addEventListener('submit', e => {
    e.preventDefault()
    //get the new name
    const newName = newNameForm.name.value.trim()
    //update the name and save to localstorage
    chatroom.updateName(newName)
    //reset the form
    newNameForm.reset()

    //show and hide notification
    notificationBox.innerHTML = `Your name was updated to <span class="new-name">${newName}</span>`
    setTimeout(() => notificationBox.innerHTML = "",3000)
    //show new welcome msg
    welcome.innerHTML = `Welcome ${newName}`
})

//updade rooms
rooms.addEventListener('click', e => {
    if(e.target.nodeName === 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat => chatUI.render(chat))
        roomBtn.forEach(btn => btn.classList.remove('clicked'))
        e.target.classList.add('clicked')
    }
})

//check localstorage for a name 
let username = localStorage.username ? localStorage.username : 'anon'
welcome.innerHTML = `Welcome ${username}`

//class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom(username, 'general')


//get chats and render
chatroom.getChats( data => {
    chatUI.render(data)
})