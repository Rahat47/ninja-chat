// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username){
        this.room = room
        this.username = username
        this.chats = db.collection('chats')
        this.unsub
    }

    //add new chat
    async addChat(message) {
        //format a chat object for firebase
        const now = new Date()
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save the chat to the database
        const response = await this.chats.add(chat)
        return response
    }
    //getting chat from the db
    getChat(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        // update the UI
                        callback(change.doc.data())
                    }
                })
            })
    }
    //updating the name
    updateName(username) {
        this.username = username
        localStorage.setItem('username', username)
    }

    //update the chat room 
    updateRoom(room) {
        this.room = room
        if(this.unsub) {
            this.unsub()
        }
    }
}



