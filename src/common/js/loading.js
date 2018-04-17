let count = 0
let loading = false
const LOADERCLASS = 'loader'

function createTpl () {
  return ' <div class="loader-inner ball-clip-rotate-pulse"><div></div><div></div></div>'
}

export default {
  showLoading (isloading) {
    count++
    if (isloading && !loading) {
      loading = true
      let el = document.querySelector(`.${LOADERCLASS}`)
      if (el) {
        el.style.display = 'block'
      } else {
        let loading = document.createElement('div')
        loading.innerHTML = createTpl()
        loading.setAttribute('class', LOADERCLASS)
        document.body.appendChild(loading)
      }
    }
  },
  hideLoading () {
    count--
    if (count <= 0) {
      loading = false
      let el = document.querySelector(`.${LOADERCLASS}`)
      if (el) {
        el.style.display = 'none'
      }
    }
  }
}
