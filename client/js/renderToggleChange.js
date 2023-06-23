const toggleButton = document.getElementById('toggle-button')
const chevronIcon = toggleButton.querySelector('i')

toggleButton.addEventListener('click', function () {
  if (chevronIcon.classList.contains('fa-chevron-left')) {
    chevronIcon.classList.remove('fa-chevron-left')
    chevronIcon.classList.add('fa-chevron-right')
  } else {
    chevronIcon.classList.remove('fa-chevron-right')
    chevronIcon.classList.add('fa-chevron-left')
  }
})
