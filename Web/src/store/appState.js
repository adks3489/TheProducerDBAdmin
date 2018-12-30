import { observable, computed, action } from 'mobx';
import Cookies from 'js-cookie';

class AppState {
  //@observable
  @observable CurrentTabKey = "1";

  constructor() {
  }

  @action
  onTabChange = (key) => {
    this.CurrentTabKey = key;
  }

  checkLogin() {
    let sid = Cookies.get('connect.sid');
    return sid;
  }
}

export default AppState;