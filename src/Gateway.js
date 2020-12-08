/**
 * @module Gateway
 */

const WebSocket = require('ws');

class Gateway {
    constructor () {
        this.observers = [];
        this.webSocket = this.connect();
        this.webSocket.on('message', (msg) => this.notifyAll(msg));
        this.webSocket.on('error', (error) => this.errorHandler(error));
    }

    connect () {
        try {
            let ws = new WebSocket(`ws://megachess.herokuapp.com/service?authtoken=2e0a8cea-b613-4c61-901a-0e257e0b8e34`);
            ws.on('open', () => console.log('>>>> Connected to Megachess Server'));

            return ws;
        } 
        catch (error) {
            this.errorHandler(error);
        }
    }

    send (message) {
        try {
            let jsonString = JSON.stringify(message);
            this.webSocket.send(jsonString);
        } 
        catch (error) {
            this.errorHandler(error);    
        }
    }

    notifyAll = (message) => {
        let jsonMessage = null;

        try {
            jsonMessage = JSON.parse(message);
        } 
        catch (error) {
            this.errorHandler(error);
        }

        // Notify all susbcribers
        this.observers.forEach(observer => {
            observer.newMessage(jsonMessage);
        });
    }

    subscribe (observer) {
        this.observers.push(observer);
    }

    unsubscribe (observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

    errorHandler (error) {
        throw new Error(`${error.message}`);
    }
}

module.exports = Gateway;