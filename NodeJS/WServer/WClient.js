/**
 *
 * Single client ws object (class)
 *
 * NodeJS 6 or laters
 *
 * @category   WServer
 * @package    ConnectionsPool
 * @author     Konstantin Ostrovsky <ska_live@mail.ru>
 * @copyright  2019 WebPanda inc.
 * @license    https://raw.githubusercontent.com/CatOstrovsky/websocket-nodejs-unity/master/LICENSE
 * @link       https://github.com/CatOstrovsky/websocket-nodejs-unity
 */

const EventEmitter  = require('events'),
KeyGenerator = require('./KeyGenerator'),
PongManager = require('./PongManager'),
ConnectionsPool = require('./ConnectionsPool');

class WSClientEmmiter extends EventEmitter {}

module.exports = class WClient {

  constructor(socket) {
    this.destroyed = false;
    this.USER_DISCONECTED = "disconected"
    this.ON_ERROR  = "onerror"
    socket.id = KeyGenerator.getInstance().getKey()
    this.socket = socket

    this.eventManager = new WSClientEmmiter();

    socket.on('close', () => this.onClose(socket))
    socket.on('error', error => this.onError(error))
    socket.on('data', message => this.onMessage(message))

    this.pong = new PongManager(this);
    this.pong.on("timeout", () => this.onClose(this.socket));
  }

  on(event = "", method = ()=>{} ) {
    this.eventManager.on(event, method);
  }

  emit(method = "", message = "") {
    if(this.destroyed) return;
    if(typeof(message) == "object") message = JSON.stringify(message);

    if(message && method) {
      this.socket.send(`${method}|${message}`);
    }else if(method) {
      this.socket.send(`${method}`);
    }else if(message) {
      this.socket.send(`${message}`);
    }else{
      console.error("Not setted message or method!");
    }
  }

  onMessage(message = "") {
    let stringMessage = message.toString();
    if(stringMessage == "pong") {
      this.pong.pinged();
    }else{
      if(stringMessage.length) {
        let [method, message] = stringMessage.split('|');
        if(method && message) {
          this.eventManager.emit(method, message);
        }else if(method) {
          this.eventManager.emit(method, null);
        }else{
          console.log("Error width input data :", stringMessage);
        }
      }
    }
  }

  onClose(socket) {
    this.destroyed = true;
    socket.destroy();
    this.pong.destroy();
    this.eventManager.emit(this.USER_DISCONECTED, socket);
    ConnectionsPool.getInstance().remove(socket.id);
  }

  onError(error) {
    console.error(error);
    this.eventManager.emit(this.ON_ERROR, error);
  }

}
