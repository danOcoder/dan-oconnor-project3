const app = {}

app.flickGallery = function () {
  $('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false
  });
}

app.successFunc = function (data) {
  console.log(data);
}

app.returnInfo = function (func, itemName, index, column) {
  $.ajax({
    url: 'https://sheetsu.com/apis/v1.0su/6dd50df793f9',
    success: app.successFunc
  }).then(function (data) {
    func(itemName, parseInt(data[index][column]) + 1)
  })
}

app.updateUserCount = function (itemName, newVal) {
  $.ajax({
    type: "PATCH",
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "userCount": newVal
    },
    success: app.successFunc
  });
}

app.updateOverRatedCount = function (itemName, newVal) {
  $.ajax({
    type: "PATCH",
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "overatedCount": newVal
    },
    success: app.successFunc
  });
}

app.updateUnderRatedCount = function (itemName, newVal) {
  $.ajax({
    type: "PATCH",
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "underatedCount": newVal
    },
    success: app.successFunc
  });
}

app.updateAccuratelyRatedCount = function (itemName, newVal) {
  $.ajax({
    type: "PATCH",
    url: `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/item/${itemName}`,
    data: {
      "accuratelyRatedCount": newVal
    },
    success: app.successFunc
  });
}

app.buttonClick = function () {
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

app.init = function () {
  app.flickGallery();
  app.buttonClick();
}


$(document).ready(function () {
  app.init()
});
