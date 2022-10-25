import { makeAutoObservable } from "mobx"

class AppState {
  userLoggedIn = false

  constructor() {
      makeAutoObservable(this)
  }

  setLoginState(newLoginState: boolean) {
      this.userLoggedIn = newLoginState;
  }
}

const appState = new AppState();
export default appState;