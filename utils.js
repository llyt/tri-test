function disableScroll() {
  const currentTopScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  window.onscroll = function() {
    window.scrollTo(0, currentTopScrollPosition)
  }
}

function enableScroll() {
  window.onscroll = function() {}
}