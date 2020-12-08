/**
 * @module Gateway
 */

const WebSocket = require('ws');

/**
 *  This class will act as a message gateway for the entire application.
 *  It will connect to the server and notify when a new message has arrived.
 *  Acts as the OBSERVED in the observer pattern.
 */

class Gateway {
    constructor () {
        this.observers = [];
        this.webSocket = this.connect();
        this.webSocket.on('message', (msg) => this.notifyAll(msg));
        this.webSocket.on('error', (error) => this.errorLogger(error));
    }

   /**
    *   @method connect Establish connection with the server.
    *   @returns {Object} The websocket connection object. 
    */
    connect () {
        try {
            let ws = new WebSocket(`ws://megachess.herokuapp.com/service?authtoken=2e0a8cea-b613-4c61-901a-0e257e0b8e34`);
            ws.on('open', () => console.log('>>>> Connected to Megachess Server'));

            return ws;
        } 
        catch (error) {
            this.errorLogger(error);
        }
    }

   /**
    *   @method send Send a message to the server.
    *   @param {Object} message The message to be sended.
    */
    send (message) {
        try {
            let jsonString = JSON.stringify(message);
            this.webSocket.send(jsonString);
        } 
        catch (error) {
            this.errorLogger(error);    
        }
    }

   /**
    *   @method notifyAll Fetch the new messages arriving from the server to the subscribers.
    *   @param {Object} message A message from the server.
    */
    notifyAll = (message) => {
        let jsonMessage = null;

        try {
            jsonMessage = JSON.parse(message);
        } 
        catch (error) {
            this.errorLogger(error);
        }

        // Notify all susbcribers
        this.observers.forEach(observer => {
            observer.newMessage(jsonMessage);
        });
    }

   /**
    *   @method subscribe Add a new observer to the list.
    *   @param {Object} observer The observer.
    */
    subscribe (observer) {
        this.observers.push(observer);
    }

   /**
    *   @method unsubscribe Remove an observer from the list.
    *   @param {Object} observer The observer class.
    */
    unsubscribe (observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

   /**
    *   @method errorLogger Bruh do you really need me to explain this?
    *   @param {Error} error Error to be showed.
    */
    errorLogger (error) {
        throw new Error(`${error.message}`);
    }
}

module.exports = Gateway;