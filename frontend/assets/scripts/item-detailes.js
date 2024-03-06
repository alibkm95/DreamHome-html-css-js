import {
  GetAdDetailes,
  SaveAdHandler,
  RenderPanorama,
  RequestAdHandler
} from './functions/functions.js'

window.SaveAdHandler = SaveAdHandler
window.RenderPanorama = RenderPanorama
window.RequestAdHandler = RequestAdHandler

window.addEventListener('load', async (event) => {
  await GetAdDetailes()
})