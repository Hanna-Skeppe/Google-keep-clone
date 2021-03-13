class App {
  constructor() {
    // console.log('app works!')  
    this.notes = []
    this.$placeholder = document.querySelector('#placeholder');
    this.$form = document.querySelector('#form')// query for the form element and put it on our app (creating a reference to our form). $ before 'this' because we are quering for an html-element (and not data)
    this.$notes = document.querySelector('#notes');
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
      const hasNote = title || text
      if (hasNote) {
        this.addNote({ title, text })
      }
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
    this.$noteTitle.value = '';
    this.$noteText.value = '';
  }

  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: '#fff',
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1 // Making an id from the length of the array +1
    }
    this.notes = [...this.notes, newNote]
    // console.log(this.notes)
    this.displayNotes()
    this.closeForm()
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex'

    this.$notes.innerHTML = this.notes.map(note => `
      <div style="background: ${note.color};" class="note">
        <div class="${note.title && 'note-title'}">${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <div class="toolbar-color"></div>
            <svg 
              class="toolbar-delete" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24">
              <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
              <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    `).join("") // join the string of notes that shows on the page (to get rid of comma between each note.)
  }
}

new App()