let addBtn = document.querySelector('.add-btn')
let notes = JSON.parse(localStorage.getItem('notes'))

notes.forEach(note => createNote(note))

addBtn.addEventListener('click', () => createNote())

function createNote(text = '') {
        let noteContainer = document.createElement('div')
        noteContainer.classList.add('note-container')

        noteContainer.innerHTML = `
                <div class="header">
                        <button class="edit-btn"><img src="assets/imgs/pen-to-square-solid.svg" alt=""></button>
                        <button class="remove-btn"><img src="assets/imgs/trash-can-solid.svg" alt=""></i></button>
                </div>

                <div class="note ${text ? '' : 'hidden'}"></div>
                <textarea class="note ${text ? 'hidden' : ''}"></textarea>
        `

        document.body.appendChild(noteContainer)

        let removeBtn = noteContainer.querySelector('.remove-btn')
        let editBtn = noteContainer.querySelector('.edit-btn')

        let note = noteContainer.querySelector('.note')
        let textarea = noteContainer.querySelector('textarea')

        if (!text) {
                textarea.focus()
        }

        textarea.value = text
        formatNote(text, note)
        removeBtn.addEventListener('click', () => {
                noteContainer.remove()
                updateLS()
        })
        editBtn.addEventListener('click', () => {
                note.classList.toggle('hidden')
                textarea.classList.toggle('hidden')
        })

        textarea.addEventListener('input', (e) => {
                let { value } = e.target 

                //note.innerHTML = value


                formatNote(value, note)
                updateLS()
        })

        
}

function formatNote(value, note) {
        let notas = value.split('\n')
        console.log(notas)

        note.innerHTML = ''

        notas.forEach(nota => {
                let li = document.createElement('li')
                li.innerText = nota
                note.appendChild(li)
        })
}

function updateLS() {
        let text = document.querySelectorAll('textarea')
        let notes = []

        text.forEach(text => notes.push(text.value))

        localStorage.setItem('notes', JSON.stringify(notes))
}