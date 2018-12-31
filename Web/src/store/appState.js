import { observable, computed, action, reaction, toJS } from 'mobx';
import Cookies from 'js-cookie';

class AppState {
  apiUrl = "http://localhost";
  @observable CurrentTabKey = "1";
  @observable scripts = [];
  @observable currentScriptKey = null;
  @observable.ref currentScript = null;

  constructor() {
    if (!this.checkLogin()) {
      document.location.href = 'login';
    }
    this.LoadData();

    reaction(() => this.currentScriptKey, (key, reaction) => {
      this.currentScript = this.scripts.find(o => o.key == key);
    });
  }

  checkLogin() {
    let sid = Cookies.get('connect.sid');
    return sid;
  }

  LoadData = () => {
    fetch(`${this.apiUrl}/script`).then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    }).then(resp => {
      this.scripts = resp;
      this.currentScriptKey = "3";
    });
  }

  @action
  onTabChange = (key) => {
    this.CurrentTabKey = key;
  }

  sendScriptUpdate = () => {
    return fetch(`${this.apiUrl}/script/${this.currentScriptKey}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(toJS(this.currentScript))
    }).then(resp => {

    });
  }
}

export default AppState;