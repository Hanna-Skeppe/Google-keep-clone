class App {
  constructor() {
    this.notes = [] // store notes
    this.title = '' // store note titles
    this.text = '' // store note texts
    this.id = '' // store id:s of the notes

    this.$placeholder = document.querySelector('#placeholder');
    this.$form = document.querySelector('#form')// $ before 'this' because quering for an html-element (and not data)
    this.$notes = document.querySelector('#notes');
    this.$noteTitle = document.querySelector('#note-title')
    this.$noteText = document.querySelector('#note-text')
    this.$formButtons = document.querySelector('#form-buttons')
    this.$formCloseButton = document.querySelector('#form-close-button')
    this.$modal = document.querySelector(".modal");
    this.$modalTitle = document.querySelector(".modal-title")
    this.$modalText = document.querySelector(".modal-text")
    this.$modalCloseButton = document.querySelector('.modal-close-button')

    this.addEventListeners()
  }

  addEventListeners() {
    document.body.addEventListener('click', event => {
      this.handleFormClick(event)
      this.selectNote(event) // to select a specific note to edit
      this.openModal(event) // --> this has to be placed after selectNote in order for the modal to be populated accordingly with the text & title values.
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

    this.$formCloseButton.addEventListener('click', event => {
      event.stopPropagation() // To prevent the eventhandler on the form to kick in.
      this.closeForm()
    })

    this.$modalCloseButton.addEventListener('click', event => {
      this.closeModal(event)
    })
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target)

    const title = this.$noteTitle.value
    const text = this.$noteText.value
    const hasNote = title || text

    if (isFormClicked) {
      this.openForm()
    } else if (hasNote) {
      this.addNote({ title, text })
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

  openModal(event) {
    if (event.target.closest('.note')) {
      this.$modal.classList.toggle('open-modal')
      this.$modalTitle.value = this.title // populate the title & text in the modal with existing values
      this.$modalText.value = this.text
    }
  }

  closeModal(event) { // Close modal and edit the content in the note on close
    this.editNote()
    this.$modal.classList.toggle('open-modal');  
  }

  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: '#fff',
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1 // Making an id from the length of the array +1
    }
    this.notes = [...this.notes, newNote]
    this.displayNotes()
    this.closeForm()
  }

  editNote() {
    const title = this.$modalTitle.value
    const text = this.$modalText.value
    this.notes = this.notes.map(note =>
      note.id === Number(this.id) ? { ...note, title, text } : note // if it's the selected note, update the text & title
    )
    this.displayNotes()
  }

  selectNote(event) {
    const $selectedNote = event.target.closest('.note')
    // console.log($selectedNote.children)
    if (!$selectedNote) return // to prevent error if no children exists
    const [$noteTitle, $noteText] = $selectedNote.children // array-destructuring to get the specific note-elements in the selected note
    this.title = $noteTitle.innerText // get the content of the elements set them equal to the values of text / title
    this.text = $noteText.innerHTML
    this.id = $selectedNote.dataset.id // get the data-id from the note (note.id) & update it
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex'

    this.$notes.innerHTML = this.notes.map(note => `
      <div style="background: ${note.color};" class="note" data-id="${note.id}">
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
    `).join("") // join the string of notes (to get rid of comma between each note.)
  }
}

new App()