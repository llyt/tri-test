import smoothscroll from 'smoothscroll-polyfill'
import modal from './plugins/modal/modal'
import calendar from './plugins/calendar/calendar'
import './css/main.css'

smoothscroll.polyfill()

const modalElement = modal()
const calendarElement = calendar()

document.addEventListener('click', function(event) {
  const btnType = event.target.dataset.modal
  if (btnType === 'workout') {
    modalElement.open()
  }
})

document.getElementById('calendar').appendChild(calendarElement)

window.scroll({
  top: 500,
  behavior: 'smooth'
})