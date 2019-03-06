/**
 * Show or hide element when user connected and disconnected of Websocket Server
 *
 * Unity 16 and laters
 *
 * @category   WClient
 * @package    ShowOnlyWS
 * @author     Konstantin Ostrovsky <ska_live@mail.ru>
 * @copyright  2019 WebPanda inc.
 * @license    https://raw.githubusercontent.com/CatOstrovsky/websocket-nodejs-unity/master/LICENSE
 * @link       https://github.com/CatOstrovsky/websocket-nodejs-unity
 */

﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShowOnlyWS : MonoBehaviour
{
    public bool showOnlyConnectedOrDisconnected = true;
    public GameObject[] ShowThisElse = null;

    /**
     * Running when instance was created
     * @void
     */
    void Start()
    {
      if(WClient.IsConnected() == true)
        OnConnected();
      else
        OnDisconnected();

      WClient.On(WClient.CONNECTED, OnConnected);
      WClient.On(WClient.CONNECTION_LOST, OnDisconnected);
    }

    /**
     * Called when user connected to WS
     * string event message (empty)
     * @void
     */
    private void OnConnected(string m = "") {
      gameObject.SetActive(true);

      if(ShowThisElse != null)
        foreach(GameObject obj in ShowThisElse) obj.SetActive(false);

    }

    /**
     * Called when user disconnected of WS
     * string event message (empty)
     * @void
     */
    private void OnDisconnected(string m = "") {
      gameObject.SetActive(false);

      if(ShowThisElse != null)
        foreach(GameObject obj in ShowThisElse) obj.SetActive(true);
    }
}
