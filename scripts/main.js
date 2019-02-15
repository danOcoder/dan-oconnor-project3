const app = {}

app.flickGallery = () => {
  $('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false
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
    $('.result').append(`
    <h2>${value.toString()}% of people agree with you</h2>
    `)
  } else if (column === 'underatedCount') {
    let value = Math.floor(parseFloat(data[index].underRatedPercent) * 100);
    $('.result').append(`
    <h2>${value.toString()}% of people agree with you</h2>
    `)
  } else if (column === 'accuratelyRatedCount') {
    let value = Math.floor(parseFloat(data[index].accRatedPercent) * 100);
    $('.result').append(`
    <h2>${value.toString()}% of people agree with you</h2>
    `)
  }
}

app.updateUserCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "userCount": newVal
    },
    success: app.successFunc
  });
}


app.updateOverRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "overatedCount": newVal
    },
    success: app.successFunc
  });
}

app.updateUnderRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "underatedCount": newVal
    },
    success: app.successFunc
  });
}

app.updateAccuratelyRatedCount = (itemName, newVal) => {
  $.ajax({
    type: 'PATCH',
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "accuratelyRatedCount": newVal
    },
    success: app.successFunc
  });
}

app.buttonClick = () => {
  $('#over-rated').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateOverRatedCount, currentItem, currentItemIndex, "overatedCount")
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, "userCount")
  })

  $('#under-rated').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateUnderRatedCount, currentItem, currentItemIndex, "underatedCount")
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, "userCount")
  })

  $('#accurately-rated').on('click', function () {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'))
    app.returnInfo(app.updateAccuratelyRatedCount, currentItem, currentItemIndex, "accuratelyRatedCount")
    app.returnInfo(app.updateUserCount, currentItem, currentItemIndex, "userCount")
  })
}

app.init = () => {
  app.flickGallery();
  app.buttonClick();
}

$(document).ready(function () {
  app.init()
});
