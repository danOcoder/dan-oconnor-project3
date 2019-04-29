const app = {};

app.flickGallery = () => {
  $('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    draggable: false
  });
};

app.successFunc = data => {
  console.log(data);
};

// Makes a call to API to return data
app.returnInfo = (index, column) => {
  $.ajax({
    url: 'https://sheetsu.com/apis/v1.0su/6dd50df793f9',
    success: app.successFunc
  })
    .then(data => {
      // Calling function to return data on users who have made the same choice
      app.returnPercentage(index, column, data);
    })
    .catch(res => {
      // If status code is anything other than 200 or 201 call app.result with a random number to ensure something is displayed to user
      if (res.status != 200 || res.status != 201) {
        let randomNumber = Math.floor(Math.random() * 99) + 1;
        app.result(randomNumber);
      }
    });
};

// Converts data returned on historical user choices to % & displays on DOM
app.returnPercentage = (index, column, data) => {
  let percentage;
  if (column === 'overatedCount') {
    percentage = 'overatedPercent';
  } else if (column === 'underatedCount') {
    percentage = 'underRatedPercent';
  } else {
    percentage = 'accRatedPercent';
  }
  let value = Math.floor(parseFloat(data[index][percentage]) * 100).toString();
  app.result(value);
};

// display result on the page
app.result = value => {
  $('.result').html(`
    <p>${value}% of respondents agree with you</p>
    `);
  $('.result-wrap')
    .hide()
    .fadeIn(1600, 'linear');
  app.graph(value);
  app.showArrow();
};

// Stores event listeners on user options
app.userChoice = () => {
  $('[data-selection="over-rated"]').on('click', function() {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'));
    app.returnInfo(currentItem, currentItemIndex, 'overatedCount');
    app.hideButtonWrap();
  });

  $('[data-selection="under-rated"]').on('click', function() {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'));
    app.returnInfo(currentItem, currentItemIndex, 'underatedCount');
    app.hideButtonWrap();
  });

  $('[data-selection="accurately-rated"]').on('click', function() {
    const currentItem = $(this).attr('class');
    const currentItemIndex = parseInt($(this).attr('data-index'));
    app.returnInfo(currentItem, currentItemIndex, 'accuratelyRatedCount');
    app.hideButtonWrap();
  });
};

// Hides option buttons after user choice
app.hideButtonWrap = () => {
  $('.button-wrap').fadeOut(400, 'linear', function() {});
};

// Shows buttons at next slide
app.showButtonWrap = () => {
  $('.next').on('click', function() {
    $('.button-wrap').fadeIn(1600, 'linear');
    $('.result-wrap').hide();
    $('.result').html('');
    $('.graph').css('width', '0%');
  });
};

// Positions arrow in the middle..ish of the img container
app.calcArrowPosition = () => {
  let $halfImgHeight = $('.carousel-img').height() * 0.5;
  $('.flickity-prev-next-button.next')
    .hide()
    .css('top', `${$halfImgHeight}px`);
};

// Ensures arrow is positioned correctly as screen changes
app.positionArrow = () => {
  $(window).resize(function() {
    app.calcArrowPosition();
  });
};

// Hides arrow after user choice
app.hideArrow = () => {
  $('.flickity-prev-next-button.next').on('click', function() {
    $('.flickity-prev-next-button.next').fadeOut(1600, 'linear');
  });
};

// Shows arrow after results displayed
app.showArrow = () => {
  $('.flickity-prev-next-button.next ').fadeIn(1600, 'linear');
};

// Smooth scroll from landing page to carousel
app.scrollToCarousel = () => {
  $('.down-arrow').on('click', function() {
    $('html, body').animate(
      {
        scrollTop: $('.main-carousel').offset().top
      },
      1600
    );
  });
};

// Sets empty graph div to height of the result div & animates the width to the percentage of other user who made the same choice
app.graph = value => {
  let $resultHeight = $('.result').height();
  $('.graph').css('min-height', `${$resultHeight}px`);
  $('.graph').animate(
    {
      width: `${value}%`
    },
    900
  );
};

// Initialize event listeners & apps to be called at page load
app.init = () => {
  app.flickGallery();
  app.userChoice();
  app.showButtonWrap();
  app.calcArrowPosition();
  app.positionArrow();
  app.hideArrow();
  app.scrollToCarousel();
};

// Blast off!!
$(document).ready(function() {
  app.init();
});
