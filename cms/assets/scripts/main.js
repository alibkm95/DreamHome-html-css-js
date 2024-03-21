import {
  CreateChart,
  GetAllViewsData,
  GetAllRequests,
  GetAllTickets,
  GetAllUsers,
  ToggleGlobalLoader
} from './functions/functions.js'

window.addEventListener('load', async () => {

  ToggleGlobalLoader('loading ...')

  const viewChartWrapper = document.getElementById('charts-view-wrapper')
  const viewAnalysticWrapper = document.getElementById('viwe-analystic-wrapper')
  const requestChartWrapper = document.getElementById('charts-request-wrapper')
  const requestAnalysticWrapper = document.getElementById('request-analystic-wrapper')
  const ticketChartWrapper = document.getElementById('charts-ticket-wrapper')
  const ticketAnalysticWrapper = document.getElementById('ticket-analystic-wrapper')
  const userAnalysticWrapper = document.getElementById('user-analystic-wrapper')

  const viewsData = await GetAllViewsData()

  if (viewsData && viewsData.length) {

    let totalViewsCount = 0

    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))

    const filteredData = viewsData.map((item) => {
      if (new Date(item[0]) >= thirtyDaysAgo && new Date(item[0]) <= today) {
        return item
      }
    })

    filteredData.forEach(item => {
      totalViewsCount += item[1]
    })

    let chartConfigs = {
      type: 'line',
      data: {
        labels: filteredData.map(data => data[0]),
        datasets: [{
          label: 'Views (last 30 days)',
          data: filteredData.map(data => data[1]),
          backgroundColor: 'rgba(70, 10, 255, 0.5)',
          borderColor: 'rgba(70, 10, 255, 1)',
          borderWidth: 2,
          lineTension: 0.4,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            min: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }

    viewAnalysticWrapper.innerHTML = `${totalViewsCount.toLocaleString()} <i class="fa-regular fa-eye"></i>`
    CreateChart(viewChartWrapper, chartConfigs)
  } else {
    viewAnalysticWrapper.innerHTML = '0 <i class="fa-regular fa-eye"></i>'
    viewChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }

  const requestsData = await GetAllRequests({ itemPerPage: 100 })

  if (requestsData && requestsData.requests?.length) {

    const statusCounts = {
      completed: 0,
      canceled: 0,
      pending: 0,
    }

    requestsData.requests.forEach(request => {
      const status = request.status;
      statusCounts[status]++
    })

    let chartConfigs = {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          label: 'Requests (top 100)',
          data: Object.values(statusCounts),
          borderWidth: 2,
          lineTension: 0.4,
          fill: true
        }]
      }
    }

    requestAnalysticWrapper.innerHTML = `${statusCounts.pending.toLocaleString()} <i class="fa-solid fa-share-from-square"></i>`

    CreateChart(requestChartWrapper, chartConfigs)

  } else {
    requestAnalysticWrapper.innerHTML = '0 <i class="fa-solid fa-share-from-square"></i>'
    requestChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }

  const ticketsData = await GetAllTickets({ itemPerPage: 100 })

  if (ticketsData && ticketsData.tickets?.length) {

    const statusCounts = {
      answered: 0,
      closed: 0,
      pending: 0,
    }

    ticketsData.tickets.forEach(ticket => {
      const status = ticket.ticketStatus
      statusCounts[status]++
    })

    let chartConfigs = {
      type: 'pie',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          label: 'tickets (top 100)',
          data: Object.values(statusCounts),
          borderWidth: 2,
          lineTension: 0.4,
          fill: true
        }]
      }
    }

    ticketAnalysticWrapper.innerHTML = `${statusCounts.pending.toLocaleString()} <i class="fa-solid fa-ticket"></i>`
    CreateChart(ticketChartWrapper, chartConfigs)
  } else {
    ticketAnalysticWrapper.innerHTML = `0 <i class="fa-solid fa-ticket"></i>`
    ticketChartWrapper.insertAdjacentHTML('beforebegin', `
    <div class="alert alert-secondary">there is no data to show</div>
    `)
  }

  const usersData = await GetAllUsers({ itemPerPage: 4 })

  if (usersData && usersData.users?.length) {

    userAnalysticWrapper.innerHTML = ''
    usersData.users.forEach(user => {
      userAnalysticWrapper.insertAdjacentHTML('beforeend', `
      <li class="last-users__item">
        <a href="./user-detailes.html?user=${user._id}" class="last-users__link border">
          <img class="d-block" src="${user.profile}" alt="user">
        </a>
      </li>
      `)
    })

  } else {
    userAnalysticWrapper.innerHTML = `
    <span class="badge bg-danger">no user to show</span>
    `
  }

    ToggleGlobalLoader()

})
