const modal = $.modal()

document.addEventListener('click', function(event) {
  const btnType = event.target.dataset.modal
  if (btnType === 'workout') {
    modal.open()
  }
})

const calendar = $.calendar()

document.getElementById('calendar').append(calendar)

window.scroll({
  top: 500,
  behavior: 'smooth'
})