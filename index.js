// Core
const $ = {}

// Modal
function _createModal() {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window">
        <div class="modal-header">
          <div class="modal-header__left">
            <span class="modal-header__caption">Велосипед - Понедельник, 13 августа 2019 г.</span>
            <span class="modal-header__title">Вело 120 (Серый волк +2)</span>
          </div>
          <div class="modal-header__right">
            <span class="modal-header__close" data-close="true">&times;</span>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-body__graph"></div>
          <div class="modal-body__content">
            <strong>Описание</strong>
            <span>Разминка:</span>
            <ul class="modal-body__list">
              <li class="modal-body__list-item">Первые 5 минут с пульсом от 100 до 137 уд.</li>
              <li class="modal-body__list-item">10 минут с пульсом 140 уд.</li>
            </ul>
            <span>Основная работа:</span>
            <ul class="modal-body__list">
              <li class="modal-body__list-item">4х 5 минут на пульсе от 165 уд с 5 минутами отдыха после каждого на 140 уд.</li>
            </ul>
            <span>Заминка:</span>
            <ul class="modal-body__list">
              <li class="modal-body__list-item">10 минут с пульсом 140 уд.</li>
              <li class="modal-body__list-item">Спокойно 5 минут с пульсом до 130 уд.</li>
            </ul>
            <strong>Цели</strong>
            <p>Задача организации, в особенности же постоянное информационно- пропагандистское обеспечение нашей деятельности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт постоянный количественный рост задач. Задача организации, в особенности же постоянное информационно- пропагандистское обеспечение нашей деятельности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт постоянный количественный рост задач.</p>
            <p>Задача организации, в особенности же постоянное информационно- пропагандистское обеспечение нашей деятельности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт постоянный количественный рост задач.</p>
            <p>Задача организации, в особенности же постоянное информационно- пропагандистское обеспечение нашей деятельности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. </p>
          </div>
          <div class="modal-body__graph"></div>
        </div>
      </div>
    </div>
  `)
  document.body.prepend(modal)
  return modal
}

$.modal = function(options) {
  const $modal = _createModal(options)

  const modal = {
    open() {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      $modal.classList.add('open')
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollWidth}px`
    },
    close() {
      $modal.classList.remove('open')
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = 0
    },

  }

  const listener = function(event) {
    const closing = event.target.dataset.close
    if (closing) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
    }
  })
}

// Calendar

function _createCalendarCell(options) {
  const cell = document.createElement('div')
  cell.classList.add('calendar-cell')
  if (options.isHead) {
    cell.classList.add('head')
    cell.insertAdjacentHTML('afterbegin', `
      <div class="calendar-cell__body">
        ${options.week ? options.week + ' нед' : 'Текущая неделя'}
      </div>
    `)
  } else {
    const cls = ['calendar-cell__day']
    if (options.today) {
      cls.push('today')
    }
    cell.insertAdjacentHTML('afterbegin', `
      <div class="calendar-cell__body">
        <div class="${cls.join(' ')}">${options.day}</div>
        <div class="calendar-cell__workout" data-modal="workout">Workout</div>
      </div>
    `)
  }
  return cell
}

function _createCalendarRow(options) {
  const CELL_COUNT = 8
  const row = document.createElement('div')
  row.classList.add('calendar-row')

  for (let i = 0; i < CELL_COUNT; i += 1) {
    const startDay = options.startDate.clone()
    const day = startDay.add(i - 1, 'days')
    const today = options.currentDate.isSame(day, 'day')
    const cell = _createCalendarCell({
      isHead: i === 0,
      day: day.format('DD MMMM'),
      week: options.weekNum,
      today
    })

    row.append(cell)
  }
  return row
}

function getStartDate(date) {
  const dayName = date.format('dddd')
  let dayDivision;
  switch (dayName) {
    case 'вторник':
      dayDivision = 1
      break
    case 'среда':
      dayDivision = 2
      break
    case 'четверг':
      dayDivision = 3
      break
    case 'пятница':
      dayDivision = 4
      break
    case 'суббота':
      dayDivision = 5
      break
    case 'воскресенье':
      dayDivision = 6
      break
    default:
      dayDivision = 6
  }
  return date.subtract(dayDivision, 'days')
}

$.calendar = function() {
  const ROW_COUNT = 9
  const currentDate = moment()
  const monthAgoDate = moment().subtract(1, 'month')
  const startDate = getStartDate(monthAgoDate)
  const $calendar = document.createElement('div')
  $calendar.classList.add('calendar-wrapper')
  for (let i = 0; i < ROW_COUNT; i += 1) {
    const row = _createCalendarRow({
      weekNum: ROW_COUNT - i === 4 ? null : ROW_COUNT - i,
      startDate: i === 0 ? startDate : startDate.add(7, 'days'),
      currentDate
    })
    $calendar.append(row)
  }
  return $calendar
}

// Main

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