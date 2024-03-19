
const ticketChartWrapper = document.getElementById('charts-ticket-wrapper')
const statusChartWrapper = document.getElementById('charts-status-wrapper')

const ticketChart = new Chart(ticketChartWrapper, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Views',
      data: [5, 2, 6, 8, 4, 4, 7, 5, 6, 10, 6, 12],
      backgroundColor: 'rgba(70, 10, 255, 0.5)',
      borderColor: 'rgba(70, 10, 255, 1)',
      borderWidth: 2,
      lineTension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
})

const statusChart = new Chart(statusChartWrapper, {
  type: 'bar',
  data: {
    labels: ['a', 'b', 'c'],
    datasets: [
      {
        label: 'pending',
        data: [7, 12, 19],
        borderWidth: 2,
        lineTension: 0.4,
        fill: true
      },
      {
        label: 'completed',
        data: [6, 13, 5],
        borderWidth: 2,
        lineTension: 0.4,
        fill: true
      },
      {
        label: 'canceled',
        data: [16, 9, 4],
        // backgroundColor: ['#ffd900', '#ff3709'],
        borderWidth: 2,
        lineTension: 0.4,
        fill: true
      }
    ]
  },
  options: {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
})