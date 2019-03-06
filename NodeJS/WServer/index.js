/**
 *
 * Main websocket server class
 *
 * Usage examples:
 * new WServer(3000)
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

const Server = require('simple-websocket/server'),
ConnectionPool = require('./ConnectionsPool'),
EventEmitter = require('events'),
WClient = require('./WClient');

class WSEmmiter extends EventEmitter {}

module.exports = class WServer {

  constructor(port = 3000) {
      this.ON_USER_CONNECTED = "connected";

      this.server = new Server({ port: port })
      this.server.on('connection', socket => this.onConnection(socket))
      this.eventManager = new WSEmmiter();
      return this;
  }

  /**
   * On received message from client
   * @param  {string} event
   * @param  {Function} method
   * @return void
   */
  on(event, method) {
    this.eventManager.on(event, method);
  }

  /**
   * On client connected to server
   * @param  {object} socket
   * @return void
   */
  onConnection(socket) {

    let client = new WClient(socket);
    ConnectionPool.getInstance().add(client.socket.id, client);
    this.eventManager.emit(this.ON_USER_CONNECTED, client);
  }

}
