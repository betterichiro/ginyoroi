$(function(){

  $('html').addClass('wf-active'); //webフォント読み込みのブレをなくす為の記述

  const window_width = $(window).width(); //画面の横幅
  const place_max = $('.l-sidebar__nav a').length; //詳細ページの総数
  const place_id = location.search.replace('?id=', ''); //URLのページid
  const change_time = 1500; // PCのTOPページの画像が明るくなる秒数
  let thumbnail_position = 0; // スマホTOPページのスライド位置
  let thumbnail_count = 1; // スマホTOPページのスライド番目

  //スマホTOPページのスライド関数
  function mySlide(type) {
    if(type === 'prev') {
      thumbnail_position -= window_width;
      thumbnail_count--;
      if(thumbnail_count === 1) {
        $('[data-slide="prev"]').fadeOut();
      }
    }
      if(type === 'next') {
        thumbnail_position += window_width;
        thumbnail_count++;
        if(thumbnail_count <= place_max) {
          $('[data-slide="prev"]').fadeIn();
        }else{
          thumbnail_position = 0;
          thumbnail_count = 1;
          $('[data-slide="prev"]').fadeOut();
        }
      }
      $('.l-main').animate({
        scrollLeft:thumbnail_position
      });
      $('.l-sidebar__nav a').removeClass('is-active');
      $('.l-sidebar__nav a').eq(thumbnail_count-1).addClass('is-active');
  }

  //スマホ時のみ適応
    if(window_width <= 768) {
      $('[data-slide]').on('click',function(){
        let slide_type = $(this).attr('data-slide');
        mySlide(slide_type);
      });
    }else{
      if($('body').attr('id') === 'page-index') {
        // setInterval(function(){
      //   const random = Math.floor( Math.random() * place_max);
      //   $('.l-main__thumbnail li').removeClass('is-active');
      //   $('.l-main__thumbnail li').eq(random).addClass('is-active');
      // },change_time);
        let rand_arr = [1,2,3,4,5,6,7,8].sort(function(){
         Math.random() - 0.5
      });

      //配列自体がランダムになっているので順に取り出してliクラスに付与
      for( let i = 0; i < rand_arr.length; i++) {
        const n = rand_arr[i];
        $('.l-main__thumbnail li').eq(i).addClass('pos' + n);
        console.log(n);
      }
    }
  }

    //placeページのみ適応
    if($('body').attr('id') === 'page-place') {
      $('.p-place__place-img img').attr('src','/img/place/' + place_id + '.jpg');
      $('[data-place]').each(function(index, el){
        let place_key = $(this).attr('data-place');

        if($(this)[0].tagName == 'A'){
          $(this).attr('href', place[place_id - 1][place_key]);
        }else{
          $(this).text(place[place_id - 1][place_key]);
        }
      });
      setTimeout(function(){
        $('.c-loader-wrap').remove();
      },1000)
    }
});
