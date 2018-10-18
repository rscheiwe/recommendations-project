// API URL
const API = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

document.addEventListener('DOMContentLoaded', init)

function init() {
  Adapter.readRecommendations()
    .then(renderRecommendations)
}

// API request
const Adapter = {
  readRecommendations: async () => {
    try {
      return await (await fetch(API)).json()
    } catch (e) {
      if (e instanceof TypeError) {
        return []
      }
    }
  }
}

// Function for getting user-defined BROWSER LANGUAGE, called in headerContent
const detectLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0]
  }
  return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
}

const recommendationTemplate = (item) => {
  const categories = item ? item.categories : null
  return (
    `
      <div>
        <a href=${item.url} target='_blank'>
          <div class='img-holder'>
            <img class='img' src=${item.thumbnail[0].url} id=${item.id} alt=${item.name} />
            <p><span>${categories}</span></p>
          </div>
        </a>
        <a href=${item.url} target='_blank'>
          <p class='bold ellipsis'>${item.name}</p>
          <p class='small'>${item.branding}</p>
        </a>
      </div>
    `
  )
}

const headerContent = `
    <li class='bold larger' lang=${detectLanguage()}>You May Like</li>
    <li class='bold' lang=${detectLanguage()}>Sponsored Links by
      <a href='https://taboola.com' target='_blank'>
        Taboola
        <img id='logo' class='logo'/>
      </a>
    </li>
  `

const placeHolder = `
      <div>
        <div class='img-holder'>
          <a href='https://taboola.com' target='_blank'>
            <img class='placeholder' />
          </a>
        </div>
        <h2>Sorry, no data was found</h2>
      </div>
    `

// Maps recommendationTemplate to individual recommendation & calls setRecommendation() for each
function renderRecommendations(data) {
  let template
  setHeader(headerContent)
  template = data.list ? data.list.map(recommendationTemplate).join('') : placeHolder
  setRecommendation(template)
}

function setRecommendation(template) {
  document.querySelector('.container').innerHTML += template
}

function setHeader(content) {
  document.querySelector('.header').innerHTML += content
}
