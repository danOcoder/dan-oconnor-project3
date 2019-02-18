const app = {}

app.flickGallery = () => {
  $('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    draggable: false
  });
}

app.successFunc = (data) => {
  console.log(data);
}

app.returnInfo = (func, itemName, index, column) => {
  $.ajax({
    url: 'https://sheetsu.com/apis/v1.0su/6dd50df793f9',
    success: app.successFunc
  }).then((data) => {
    func(itemName, parseInt(data[index][column]) + 1)
    app.returnPercentage(index, column, data)
  })
}

app.returnPercentage = (index, column, data) => {
  if (column === 'overatedCount') {
    let value = Math.floor(parseFloat(data[index].overatedPercent) * 100).toString();
    $('.result').html(`
    <p>${value}% of people agree with you</p>
    `)
    $('.result-wrap').hide().fadeIn(1600, 'linear')
    app.graph(value)
  } else if (column === 'underatedCount') {
    let value = Math.floor(parseFloat(data[index].underRatedPercent) * 100);
    $('.result').hide().html(`
    <p>${value.toString()}% of people agree with you</p>
    `).fadeIn(1600, 'linear')
  } else if (column === 'accuratelyRatedCount') {
    let value = Math.floor(parseFloat(data[index].accRatedPercent) * 100);
    $('.result').hide().html(`
    <p>${value.toString()}% of people agree with you</p>
    `).fadeIn(1600, 'linear')
  }
}

app.updateUserCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      'userCount': newVal
    },
    success: app.successFunc
  });
}

app.updateOverRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      'overatedCount': newVal
    },
    success: app.successFunc
  });
}

app.updateUnderRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      'underatedCount': newVal
    },
    success: app.successFunc
  });
}

app.updateAccuratelyRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      'accuratelyRatedCount': newVal
    },
    success: app.successFunc
  });
}

app.userChoice = () => {
  $('[data-selection="over-rated"]').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateOverRatedCount, currentItem, currentItemIndex, 'overatedCount')
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, 'userCount')
    app.hideButtonWrap()
    $('.flickity-prev-next-button.next ').fadeIn(1600, 'linear')
  })

  $('[data-selection="under-rated"]').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateUnderRatedCount, currentItem, currentItemIndex, 'underatedCount')
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, 'userCount')
    app.hideButtonWrap()
    $('.flickity-prev-next-button.next ').fadeIn(1600, 'linear')
  })

  $('[data-selection="accurately-rated"]').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateAccuratelyRatedCount, currentItem, currentItemIndex, 'accuratelyRatedCount')
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, 'userCount')
    app.hideButtonWrap()
    $('.flickity-prev-next-button.next ').fadeIn(1600, 'linear')
  })
}

app.hideButtonWrap = () => {
  $('.button-wrap').fadeOut(1400, 'linear')
}

app.showButtonWrap = () => {
  $('.next').on('click', function () {
    $('.button-wrap').fadeIn(1600, 'linear')
    $('.result').html('')
  })
}

app.calcArrowPosition = () => {
  let $halfImgHeight = $('.carousel-img').height() * 0.5
  $('.flickity-prev-next-button.next').hide().css('top', `${$halfImgHeight}px`)
}

app.positionArrow = () => {
  $(window).resize(function () {
    app.calcArrowPosition()
  })
}

app.hideArrow = () => {
  $('.flickity-prev-next-button.next').on('click', function () {
    $('.flickity-prev-next-button.next').fadeOut(1600, 'linear')
  })
}

app.scrollToCarousel = () => {
  $('.down-arrow').on('click', function () {
    $('html, body').animate({
      scrollTop: $('.main-carousel').offset().top
    }, 1600)
  })
}

app.graph = (value) => {
  let $resultHeight = $('.result').height()
  $('.graph').css('min-height', `${$resultHeight}px`)
  $('.graph').animate({
    width: `${value}%`
  }, 1800)
}

app.init = () => {
  app.flickGallery();
  app.userChoice();
  app.showButtonWrap();
  app.calcArrowPosition();
  app.positionArrow();
  app.hideArrow();
  app.scrollToCarousel();
}

$(document).ready(function () {
  app.init();
});
