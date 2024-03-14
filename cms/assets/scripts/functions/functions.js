

export const ToggleSidebarMenu = (rotateElem, applicable) => {
  applicable.classList.toggle('active')

  if (applicable.classList.contains('active')) {
    rotateElem.style.transform = 'rotate(90deg)'
  } else {
    rotateElem.style.transform = 'rotate(0deg)'
  }

  applicable.addEventListener('click', () => {
    ToggleSidebarMenu(rotateElem, applicable)
  })
}