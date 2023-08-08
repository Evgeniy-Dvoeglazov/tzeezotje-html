new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

$(document).ready(function () {
  $("form").submit(function (evt) {
    evt.preventDefault();

      $.ajax({
          type: $(this).attr('method'),
          url: $(this).attr('action'),
          contentType: false,
          cache: false,
          processData: false,
          data: new FormData(this),
          success: function (result) {
              // Вывод текста результата отправки
              alert(result);
          },
          // Вывод статуса ошибки
          error: function (error) {
            console.log(error.status);
          }
      });
      return false;
  });
});

// $(document).ready(function() {

//   $('form').submit(function(event) {

//       event.preventDefault()

//       $.ajax({
//           url: 'send.php',
//           method: 'POST',
//           type: 'POST',
//           data: new FormData(this),
//           accepts: {
//             mycustomtype: 'application/x-some-custom-type'
//           },
//           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//           processData: false,
//           success: function(result) {
//               alert('ок')
//           }
//       })
//       a = new FormData(this)
//       console.log(a)
//   })
// })
