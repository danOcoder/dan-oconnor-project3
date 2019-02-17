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
    let value = Math.floor(parseFloat(data[index].overatedPercent) * 100);
    $('.result').hide().html(`
    <p>${value.toString()}% of people agree with you</p>
    `).fadeIn(1600, 'linear')
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
  })

  $('[data-selection="under-rated"]').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateUnderRatedCount, currentItem, currentItemIndex, 'underatedCount')
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, 'userCount')
    app.hideButtonWrap()
  })

  $('[data-selection="accurately-rated"]').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateAccuratelyRatedCount, currentItem, currentItemIndex, 'accuratelyRatedCount')
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, 'userCount')
    app.hideButtonWrap()
  })
}

app.hideButtonWrap = () => {
  $('.button-wrap').fadeOut(1600, 'linear')
}

app.showButtonWrap = () => {
  $('.next').on('click', function () {
    $('.button-wrap').fadeIn(1600, 'linear')
    $('.result').html('')
  })
}

app.calcArrowPosition = () => {
  let $halfImgHeight = $('.carousel-img').height() * 0.5
  $('.flickity-prev-next-button.next ').css('top', `${$halfImgHeight}px`)
}

app.positionArrow = () => {
  $(window).resize(function () {
    app.calcArrowPosition()
  })
}

app.init = () => {
  app.flickGallery();
  app.userChoice();
  app.showButtonWrap();
  app.calcArrowPosition();
  app.positionArrow();
}

$(document).ready(function () {
  app.init();
});
