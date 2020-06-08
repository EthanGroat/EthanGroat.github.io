const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

const dob = document.getElementById('dob')
const age = document.getElementById('age')


form.addEventListener('submit', errorListener)

function errorListener(e) {
  let messages = []

  if (name.value === '' || name.value == null) {
    messages.push('Name is required')
  }

  if (email.value === '' || email.value == null) {
    messages.push('Email is required')
  }

  if (password.value.length < 6) {
    if (password.value === '' || password.value == null) {messages.push('Password is required')}
    else {messages.push('Password must be longer')}
  }

  if (password.value === 'password') {
    messages.push('Password cannot be "password", come on, be more creative')
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerHTML = '<div class="alert alert-warning alert-dismissible">' + messages.join('; ') + '</div>'
  }
}


function zeroFill(number, width)  // taken off the IntoNet
{
  let addedWidth = width - number.toString().length;
  if ( addedWidth > 0 )
  {
    return new Array(addedWidth + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

function setAge() {
  let dateParts = dob.value.split('-')
  let today = new Date()
  let birthday = new Date(today.getFullYear(), dateParts[1] - 1, dateParts[2])
  let selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  if (birthday <= today) {
    age.value = today.getFullYear() - selectedDate.getFullYear()
  }
  else {
    age.value = today.getFullYear() - selectedDate.getFullYear() - 1
  }
}

function setDOB() {
  let today = new Date()
  let guessDateParts = []
  if (dob.value === '' || dob.value == null) {
    guessDateParts = [
      today.getFullYear() - age.value,
      zeroFill(today.getMonth() + 1, 2),
      zeroFill(today.getDate(), 2)
    ]
  }
  else {
    let dateParts = dob.value.split('-')
    let birthday = new Date(today.getFullYear(), dateParts[1] - 1, dateParts[2])
    guessDateParts = [
      today.getFullYear() - age.value,
      zeroFill(birthday.getMonth() + 1, 2),
      zeroFill(birthday.getDate(), 2)
    ]
    if (birthday > today) {
      guessDateParts[0] = today.getFullYear() - age.value - 1
    }
  }
  dob.value = guessDateParts.join('-')
  name.value = guessDateParts.join('-')
}



