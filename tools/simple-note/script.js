const noteTitle = document.querySelector('.card-title')
const noteCreatedAt = document.querySelector('.card-subtitle')
const noteBody = document.querySelector('.card-text')
const noteTags = document.querySelector('.card-link')

fetch('http://localhost:3000/api/notes')
    .then((res) => {
        return res.json()
    })
    .then((result) => {
        const { notes } = result.data
        console.log(notes)
        const noteColumn = document.getElementById('note-column')

        notes.forEach((note) => {
            const div = document.createElement('div')
            div.setAttribute('class', 'col-lg-4 py-2 px-1')
            div.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <h6 class="card-subtitle mb-3 text-body-secondary small">Created at ${note.createdAt.toLocaleString()}</h6>
                        <p class="card-text">${note.body.length > 350 ? note.body.substring(0, 350) + '...' : note.body}</p>
                       <a href="#" class="card-link">${note.tags}</a>
                    </div>
                </div>`

            noteColumn.appendChild(div)
        })
    })
