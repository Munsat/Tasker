import renderFriendProfile from './renderFriendProfile.js'
import renderUserProfile from './renderUserProfile.js'
import renderNotes from './renderNotes.js'
import getTasksDueTodayOrUpcoming from './getTasksDueTodayOrUpcoming.js'

const renderHeader = (user) => {
  const header1 = document.getElementById('header-nav')
  const header2 = document.getElementById('lower-nav')

  const display = document.querySelector('.display-bg')
  if (display) {
    display.remove()
  }
  header1.innerHTML = `
    <nav class="navbar nav-1" style="background-color: #fbfded; border-bottom: solid 1px #F9D949">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img id="logo-img" src="./images/tskr-high-resolution-logo-black-on-transparent-background.png" alt="logo"></a>
            <div class="nav-item dropdown px-5">
                <a class="nav-link dropdown-toggle name-display" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${user.user_name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item user-detail" href="#">View Details</a></li>
                    <li><a class="dropdown-item friend" href="#">Friends</a></li>
                    <li><a class="dropdown-item logout-btn" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>  `
  header2.innerHTML = `
    <nav class="navbar navbar-expand-sm nav-2" style="background-color: #2B3467">
        <div class="container-fluid">
        <a href="#"></a>
        <button class="navbar-toggler custom-btn-toggler" style="border-color: white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon custom-toggler"></span>
        </button>        
            <div class="collapse navbar-collapse nav-underline justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item px-5">
                        <a class="nav-link" aria-current="page" href="#" id="sortListByToday">Today</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" id="sortListByUpcoming">Upcoming</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" id="renderNotesPage">Notes</a>
                    </li>
                </ul>
            </div>

        </div>
    </nav>    
    `
  const notes = document.getElementById('renderNotesPage')
  notes.addEventListener('click', () => {
    axios.get('/api/session').then(({ data }) => {
      const user_id = data.user.id
      return renderNotes(user_id)
    })
  })

  const todaysLink = document.getElementById('sortListByToday')
  todaysLink.addEventListener('click', () => {
    axios.get('/api/session').then(({ data }) => {
      getTasksDueTodayOrUpcoming(data.user.id, true, data.user)
    })
  })

  const upcomingLink = document.getElementById('sortListByUpcoming')
  upcomingLink.addEventListener('click', () => {
    axios.get('/api/session').then(({ data }) => {
      getTasksDueTodayOrUpcoming(data.user.id, false, data.user)
    })
  })

  const logoutBtn = document.querySelector('.logout-btn')
  logoutBtn.addEventListener('click', () => {
    axios.delete('/api/session').then((res) => (window.location = '/entry.html'))
  })

  const userDetail = document.querySelector('.user-detail')
  userDetail.addEventListener('click', () => {
    axios.get('/api/session').then(({ data }) => {
      renderUserProfile(user)
    })
  })

  const friendDetail = document.querySelector('.friend')
  friendDetail.addEventListener('click', () => {
    axios.get('/api/session').then(({ data }) => {
      renderFriendProfile(data.user)
    })
  })
}

export default renderHeader
