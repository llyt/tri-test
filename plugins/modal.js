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
      $modal.classList.add('open')
      disableScroll()
    },
    close() {
      $modal.classList.remove('open')
      enableScroll()
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