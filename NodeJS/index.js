/**
 * Usage server example
 *
 * It class is singleton. You can add WClient component to many nodes and have one instance
 *
 * NodeJS 6 or laters
 *
 * @category   WServer
 * @package    WServer
 * @author     Konstantin Ostrovsky <ska_live@mail.ru>
 * @copyright  2019 WebPanda inc.
 * @license    https://raw.githubusercontent.com/CatOstrovsky/websocket-nodejs-unity/master/LICENSE
 * @link       https://github.com/CatOstrovsky/websocket-nodejs-unity
 */

const WServer = require('./WServer'),
ConnectionsPool = require('./WServer/ConnectionsPool'), // You can use it in you projects
port = 3000,
server  = new WServer(port);
console.log(`Server was started on port ${port}`)

server.on('connected', (client) => {
  let socket = client.socket;

  console.log(socket.id+' connected!')

  client.on('disconected', (socket) => {
    console.log(socket.id+" disconected!")
  })

});
