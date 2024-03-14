const viewChartWrapper = document.getElementById('charts-view-wrapper')
const requestChartWrapper = document.getElementById('charts-request-wrapper')
const ticketChartWrapper = document.getElementById('charts-ticket-wrapper')

const userChart = new Chart(viewChartWrapper, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Views',
      data: [5,2,6,8,4,4,7,5,6,10,6,12],
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
})

const visitChart = new Chart(requestChartWrapper, {
  type: 'doughnut',
  data: {
    labels: ['a', 'b'],
    datasets: [{
      label: 'Requests',
      data: [25, 62],
      backgroundColor: ['#ffd900', '#ff3709'],
      borderWidth: 2,
      lineTension: 0.4,
      fill: true
    }]
  }
})

const messagesChart = new Chart(ticketChartWrapper, {
  type: 'pie',
  data: {
    labels: ['x', 'y'],
    datasets: [{
      label: 'users',
      data: [25, 48],
      backgroundColor: ['rgba(70, 10, 255, 0.5)', 'rgba(255, 10, 10, 0.5)'],
      borderColor: ['rgba(70, 10, 255, 1)', 'rgba(255, 10, 10, 1)'],
      borderWidth: 2,
      lineTension: 0.4,
      fill: true
    }]
  }
})