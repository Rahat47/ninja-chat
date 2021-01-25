class ChatUI{
    constructor(list){
        this.list = list
    }
    //method to render chats in the dom
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        )
        const html = `
            <li class="list-group-item">
                <span class="username"> ${data.username}: </span>
                <span class="message"> ${data.message} </span>
                <div class="time"> ${when}</div>
            </li>
        `

        setTimeout(()=> {
            this.list.innerHTML += html
            chatList.scrollTop = chatList.scrollHeight
        }, 1000)
        
    }
    clear() {
        this.list.innerHTML = ""
    }
}