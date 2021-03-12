class App {
  constructor() {
    // console.log('app works!')  
    this.$form = document.querySelector('#form')// query for the form element and put it on our app (creating a reference to our form). $ before 'this' because we are quering for an html-element (and not data)
    this.$noteTitle = document.querySelector('#note-title')
    this.$noteText = document.querySelector('#note-text')
    this.$formButtons = document.querySelector('#form-buttons')
    this.addEventListeners() // run when app starts
  }    

  addEventListeners() { // --> The place to add eventlisteners for the app. For example that textfield expands when clicked to add a note (handleFormClick).
    document.body.addEventListener('click', event => {
      this.handleFormClick(event)
    })

    this.$form.addEventListener('submit', event => {
      event.preventDefault()
      const title = this.$noteTitle.value
      const text = this.$noteText.value
    })
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target)
    if (isFormClicked) {
      this.openForm()
    } else {
      this.closeForm()
    }
  }

  openForm() {
    this.$form.classList.add('form-open')
    this.$noteTitle.style.display = 'block'
    this.$formButtons.style.display = 'block'
  }

  closeForm() {
    this.$form.classList.remove('form-open')
    this.$noteTitle.style.display = 'none'
    this.$formButtons.style.display = 'none'
  }
}

new App()