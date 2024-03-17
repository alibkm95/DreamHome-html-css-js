
const viewChartWrapper = document.getElementById('charts-view-wrapper')
const requestChartWrapper = document.getElementById('charts-request-wrapper')

const viewsChart = new Chart(requestChartWrapper, {
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
    scales: {
      y: {
        min: 0
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
})

const requestChart = new Chart(viewChartWrapper, {
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

const primaryPriceHelp = tippy('#primary-price-help', {
  content: `
    <p>
      + default value is (0) and considered as negotiable
    </p>
    <p>
      + if ad type is mortgage and rent this value considered as mortgage price otherwise it's represents the property's total price
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const secondaryPriceHelp = tippy('#secondary-price-help', {
  content: `
    <p>
      + default value is (0) and considered as negotiable
    </p>
    <p>
      + if ad type is mortgage and rent this value considered as rent price otherwise it's represents the property's price per square meter
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const coverImageHelp = tippy('#cover-image-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + maximum size of the image file must be less than 10MB
    </p>
    <p>
      + as soon as the cover image uploaded, this field automatically fills with uploaded images direct link
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const panoramaImageHelp = tippy('#panorama-image-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + maximum size of the image file must be less than 10MB
    </p>
    <p>
      + as soon as the panorama image uploaded, this field automatically fills with uploaded images direct link
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const roomsHelp = tippy('#rooms-help', {
  content: `
    <p>
      + this field is required
    </p>
    <p>
      + for properties that do not have rooms, consider the value (0)
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const yocHelp = tippy('#YOC-help', {
  content: `
    <p>
      + (0) is default and considered as unknown
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const locationHelp = tippy('#location-help', {
  content: `
    <p>
      + if you do not send a value to this field, it will be treated as unknown
    </p>
  `,
  placement: 'top',
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})

const floorHelp = tippy('#floor-help', {
  content: `
    <p>
      + default value for both floor level and total floors fields is (0)
    </p>
    <p>
      + The value 0 will be considered as the ground floor
    </p>
  `,
  placement: 'top',
  zIndex: 100000,
  arrow: true,
  animation: 'fade',
  theme: 'light-border',
  trigger: 'click',
  allowHTML: true,
})