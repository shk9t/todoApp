const todo = document.querySelector('ul')
const input = document.getElementById('enter')
const All = document.querySelector('.all')
const clearComplete = document.querySelector('.clearComplete')
const completeAll = document.querySelector('.completeAll')
const qtTask = document.querySelector('p')

let todoArr = []

if(localStorage.getItem('todo')){
  todoArr = JSON.parse(localStorage.getItem('todo'))
  displayMessage()
}

input.addEventListener('keydown', e => {
  if(e.keyCode == 13){ //исправить keycode
    const obj = {
      todo: input.value,
      checked: false,
      important: false
    }
  
    todoArr.unshift(obj)
    displayMessage()
    localStorage.setItem('todo', JSON.stringify(todoArr))
  }

})

function displayMessage(){
  let message = ''
  todoArr.forEach(function(item, i){
    message+=`
    <li>
      <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
      <label for='item_${i}'>${item.todo}</label>
    </li>
    `
    todo.innerHTML = message
    input.value = ''
    qtTask.innerHTML = `${todoArr.length} tasks`
  })
}

todo.addEventListener('change', event => {
  let idInput = event.target.getAttribute('id')
  let forLabel = todo.querySelector('[for=' + idInput + ']')
  let valueLabel = forLabel.innerHTML

  todoArr.forEach(item => {
    if(item.todo === valueLabel){
      item.checked = !item.checked
      localStorage.setItem('todo', JSON.stringify(todoArr))
    }
  })
})

completeAll.addEventListener('click', () => {
  todoArr.forEach(item => {
    item.checked = !item.checked
    localStorage.setItem('todo', JSON.stringify(todoArr))
    displayMessage()
  })
})

clearComplete.addEventListener('click', () => {
  todoArr.forEach((item, index) => {
    if(item.checked == true){
      todoArr.splice(index, 1)
      displayMessage()
      localStorage.setItem('todo', JSON.stringify(todoArr))
      console.log('kkkkkkk')
    }
  })
})
