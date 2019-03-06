/**
 *
 * Generate unique key for ConnectionPool
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

module.exports =  class KeyGenerator {

  constructor() {
    this.lastKey = 0
    this.instance = this;
  }

  static getInstance() {
    if(!this.instance) this.instance = new KeyGenerator();
    return this.instance;
  }

  getKey() {
    return ++this.lastKey;
    // return `salt_with_key_${++this.lastKey}`;
  }
}
