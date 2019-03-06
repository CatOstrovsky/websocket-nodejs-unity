/**
 *
 * Stack of websocket clients
 *
 * Usage examples:
 *
 * ConnectionsPool.getInstance().get({id})
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

module.exports =  class ConnectionsPool {

  constructor() {
    this.stack = new Map;
    this.instance = this;
  }

  /**
   * Get pool instance
   * @return {ConnectionsPool}
   */
  static getInstance() {
    if(!this.instance) this.instance = new this;
    return this.instance;
  }

  /**
   * Append client to stack
   * @param {string} key
   * @param {object} value connection instance
   */
  add(key, value) {
    this.stack.set(key, value);
  }

  /**
   * Remove client from stack
   * @param  {Number}
   * @return {boolean}
   */
  remove(id = 0) {
    return this.stack.delete(id);
  }

  /**
   * Get client from stack
   * @param  {Number} id stack key
   * @return {object} connection object
   */
  get(id = 0) {
    let item = this.stack.get(id);
    if(!item) return { emit: () => {}, on: () => {} }
    return item;
  }

  /**
   * Get full stack object
   * @return {Map}
   */
  getStack() {
    return this.stack;
  }

}
