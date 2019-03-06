/**
 *
 * Ping-pong manager for connection
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

const EventEmitter  = require('events');

module.exports =  class pong extends EventEmitter {

  constructor(socket) {
    super();
    this.timeout = 0;
    this.pingedClient = true;
    this.socket = socket;
    this.intervalCheck = 5000;
    this.fastIntervalCheck = 1000;
    this.lostCount = 0;
    this.maxLostCount = 2;
    this.destroyed = false

    this.check();
  }

  pinged() {
    this.pingedClient = true;
    this.lostCount = 0;
    this.pong();
    // console.log("pong")
  }

  pong(fast = false) {
    clearTimeout(this.timeout);
    this.pingedClient = false;

    this.timeout = setTimeout(() => {
        this.socket.emit("ping");
        // console.log("ping")
        setTimeout(() => {
          this.check()
        }, 600);
    }, (fast) ? this.fastIntervalCheck : this.intervalCheck);

  }

  check() {
    if(this.destroyed) return;

    if(this.pingedClient == false) {
      if(this.lostCount >= this.maxLostCount) {
        this.destroy();
        this.emit("timeout");
      }else{
        this.lostCount++;
        this.pong(true);
      }
    }else{
      this.pong();
    }
  }

  destroy() {
    this.destroyed = true;
    clearTimeout(this.timeout)
  }

}
