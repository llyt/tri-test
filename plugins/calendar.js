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
      dayDivision = 0
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
      weekNum: ROW_COUNT - i === 5 ? null : ROW_COUNT - i,
      startDate: i === 0 ? startDate : startDate.add(7, 'days'),
      currentDate
    })
    $calendar.append(row)
  }
  return $calendar
}