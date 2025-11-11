import { makeAutoObservable } from 'mobx'

class UIStore {
  libraryCreateOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleLibraryCreate() {
    this.libraryCreateOpen = !this.libraryCreateOpen
  }

  closeLibraryCreate() {
    this.libraryCreateOpen = false
  }
}

export default new UIStore()
