function successFunc(data) {
  console.log(data);
}

let updateUseraccount

const userCount = () => {
  var url = "https://sheetsu.com/apis/v1.0su/6dd50df793f9/search";
  var params = {
    "item": "ketchupHotdog"
  };
  $.ajax({
    url: url,
    data: params,
    success: successFunc
  }).then(function (res) {
    console.log(res[0].userCount);
    updateUseraccount = parseInt(res[0].userCount);
    updateUseraccount++
    console.log(updateUseraccount);
  })

  return updateUseraccount
}

const update = function (param1, param2, param3) {

  var url = `https://sheetsu.com/apis/v1.0bu/6dd50df793f9/${param1}/${param2}`;
  var params = {
    userCount: param3
  };
  $.ajax({
    type: "PATCH",
    url: url,
    data: params,
    success: successFunc
  })

}

$('.over-rated').on('click', function () {
  update('item', 'ketchupHotdog', userCount())
})

$('.main-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true
});
