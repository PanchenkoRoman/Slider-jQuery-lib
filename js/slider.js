(function($){
  jQuery.fn.Slider = function(options){
    options = $.extend({
        slideNow : 1,
        slideCount : $(this).find('ul').children('li').length,
        translateWidth :-$(this).width() * (options.slideNow),
        slideInterval : 2000,
        autoPlay: true,
        arrows: true,
        navBtnId : options.slideNow,
        pagination: true,
        swipeAble: true
    }, options);
    
    var make = function(){
        
        //стили для слайдера   
        $(this).addClass('wrapper');  
        $(this).find('ul').filter( ':first' ).attr({'id':'slidewrapper'});
        $('#slidewrapper').find('li').addClass('slide'); 
        $('.slide').children('img').addClass('slide-img');

        var wrapper = $(this); //создаем ссылку на обьект обгортку слайдера

        /*(function(){
            $('#slidewrapper').css({
            'transform': 'translate(' + -wrapper.width() * options.slideNow + 'px, 0)'
        });
        }());*/
        
        // для адаптивности
        $('#slidewrapper').css({
            'width': 'calc(100% *' + options.slideCount + ')',
         })

        $('.slide').css({
            'width': 'calc(100% /' + options.slideCount + ')'
        })

        // во избежание дублирования кода
        function transition(){
           $('#slidewrapper').css({
                'transform': 'translate(' + options.translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + options.translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + options.translateWidth + 'px, 0)',
            }); 
        }

        if (options.autoPlay) {
        var switchInterval = setInterval(nextSlide, options.slideInterval);
        $(this).hover(function() {
            clearInterval(switchInterval);
        }, function() {
            switchInterval = setInterval(nextSlide, options.slideInterval);
        });
    }

        if(options.arrows){
            $(this).find('ul').after('<div id="prev-next-btns"><div id="prev-btn"></div><div id="next-btn"></div></div>');
            $('body').on('click', '#next-btn', function(){
                nextSlide();
            });
            $('body').on('click', '#prev-btn', function(){
                prevSlide();
            });
        }

        if(options.swipeAble){
            $(this).on("swipeleft",function(){
                nextSlide();
            });
            $(this).on("swiperight",function(){    
                prevSlide();
            });
        }

        if(options.pagination){
            $(this).find('ul').after('<ul id="nav-btns"><li class="slide-nav-btn"></li></ul>');
            for(var i = 0; i < options.slideCount - 1; i++){
                $('#nav-btns .slide-nav-btn:last-child').after('<li class="slide-nav-btn"></li>');
            }

            $('body').on('click', '.slide-nav-btn', function(){
                options.navBtnId = $(this).index();
                $(this).siblings().removeClass('slide-nav-btn-active');
                $(this).addClass('slide-nav-btn-active');

                if (options.navBtnId + 1 != options.slideNow) {
                    options.translateWidth = -$('#slidewrapper').parents("div").width() * (options.navBtnId);
                    transition();
                    options.slideNow = options.navBtnId + 1;
                }
            });
        }

        function nextSlide() {
            var slideNum = options.slideNow; 

            $('.slide-nav-btn').siblings().removeClass('slide-nav-btn-active');
            $('.slide-nav-btn').eq(slideNum).addClass('slide-nav-btn-active');

            if (slideNum >= options.slideCount || slideNum <= 0) {
                $('#slidewrapper').css('transform', 'translate(0, 0)');
                slideNum = 1;
                $('.slide-nav-btn').eq(0).addClass('slide-nav-btn-active');
            } else {
                options.translateWidth = -wrapper.width() * (options.slideNow);
                transition();
                options.slideNow = slideNum++;
            }
            options.slideNow = slideNum++;
        }

        function prevSlide (){
            var slideNum = options.slideNow; 

                $('.slide-nav-btn').siblings().removeClass('slide-nav-btn-active');
                $('.slide-nav-btn').eq(slideNum-2).addClass('slide-nav-btn-active');

            if (slideNum == 1 || slideNum <= 0 || slideNum > options.slideCount) {
                options.translateWidth = -wrapper.width() * (options.slideCount - 1);
                transition();
                slideNum = options.slideCount;
            } else {
                options.translateWidth = -wrapper.width() * (slideNum - 2);
                transition();
                options.slideNow = slideNum--;
            }
        options.slideNow = slideNum--;
        }
    };

    return this.each(make); 
  };
})(jQuery);
 

/*$('#viewport').Slider({
    arrows: true,
    autoPlay: false,
});*/