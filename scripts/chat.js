class Chatroom {
    constructor(username, room) {
        this.username = username
        this.room = room
        this.chats = db.collection('chats')
        this.unsub
    }
    //Method to add a new Chat
    async addChat(message) {
        //format a chat object
        const now = new Date()
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save the chat document
        const response = await this.chats.add(chat)
        return response
    }
    //method to get chat from db
    getChats(callback){
       this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        //update the ui
                        callback(change.doc.data())
                    }
                })
            })
    }
    //method to change the username
    updateName(username) {
        this.username = username
        localStorage.setItem('username', username)
    }
    //method to update the room
    updateRoom(room){
        this.room = room
        console.log('room updated')
        if(this.unsub){
            this.unsub()
        }
    }
}
