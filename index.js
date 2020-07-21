const modal = $.modal()

document.addEventListener('click', function(event) {
  const btnTYpe = event.target.dataset.modal
  if (btnTYpe === 'workout') {
    modal.open()
  }
})

const calendar = $.calendar()

document.getElementById('calendar').append(calendar)

window.scroll({
  top: 670,
  behavior: 'smooth'
})