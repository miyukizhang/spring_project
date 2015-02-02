(function($) {
    $.fn.touchwipe = function(settings) {
        var config = {min_move_x: 20,min_move_y: 20,wipeLeft: function() {
        },wipeRight: function() {
        },wipeUp: function() {
        },wipeDown: function() {
        },preventDefaultEvents: true};
        if (settings)
            $.extend(config, settings);
        this.each(function() {
            var startX;
            var startY;
            var isMoving = false;
            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false
            }
            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault()
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft()
                        } else {
                            config.wipeRight()
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown()
                        } else {
                            config.wipeUp()
                        }
                    }
                }
            }
            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false)
                }
            }
            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false)
            }
        });
        return this
    }
})(jQuery);

$(document).ready(function(){
    var winH = $(window).height();
    var wrap = $("#view");
    var wrapMd = $("#view .md");
    var pageNum = 0;
    var mdSize = wrapMd.size();

    $("html").touchwipe({
        wipeUp: function() {
            if(pageNum > 0){
                pageNum --;
                pageScroll(pageNum, "up");
            }
        },
        wipeDown: function() {
            if(pageNum <= mdSize-2){
                pageNum ++;
                pageScroll(pageNum, "down");
            }
        },
        min_move_x: 80,
        min_move_y: 80,
        preventDefaultEvents: true
    });

    //load image
    imagesLoaded( $('.md_page_one'), function() {
        $('#page_loader').hide();
        addAnimation();
    });

    function addAnimation(){
        var effects = {
            '.main_two .text .item': 'fadeInDown',
            '.main_two .parent': 'fadeIn',
            '.main_three .text .item': 'fadeInDown',
            '.main_three .parent': 'zoomIn',
            '.main_four .text .item': 'fadeInDown',
            '.main_four .parent': 'zoomIn',
            '.main_four .child': 'zoomIn',
            '.main_five .text .item_one': 'fadeInDownOut',
            '.main_five .text .item_two': 'fadeInDown',
            '.main_five .parent': 'fadeInUp',
            '.main_five .child': 'fadeIn',
            '.main_five .screen': 'fadeIn',
            '.main_five .zan': 'zan',
            '.main_six .text .item_one': 'bounceInRightOut',
            '.main_six .text .item_two': 'bounceInRightOut',
            '.main_six .text .item_three': 'bounceInRight',
            '.main_six .parent': 'fadeInUp',
            '.main_six .child': 'fadeInRight',
            '.main_six .hand': 'swing',
            '.main_seven .text .item': 'bounceInRight',
            '.main_eight .text .item': 'fadeInDown',
            '.main_eight .qq': 'fadeIn',
            '.main_eight .tencent': 'rubberBand',
            '.main_nine .text .item': 'fadeInDown',
            '.main_nine .girl_back': 'zoomIn',
            '.main_nine .girl': 'fadeInLeft',
            '.main_nine .boy': 'fadeInRight',
            '.main_nine .ribbon': 'burst',
            '.main_ten .text .item': 'fadeInDown',
            '.main_ten .child': 'fadeIn',
            '.main_ten .girl': 'zoomIn',
            '.main_ten .light': 'flash',
            '.main_ten .ribbon': 'snow',
            '.main_eleven .text .item': 'fadeInDown',
            '.main_eleven .couple': 'fadeInUp',
            '.main_eleven .house': 'bounceInDown',
            '.main_eleven .hand': 'swing',
            '.main_eleven .star': 'fadeIn',
            '.main_eleven .star_flicker': 'flash',
            '.main_twelve .text .item': 'fadeInDown',
            '.main_twelve .fuli img': 'bounceInDown',
            '.main_thirteen .text .item': 'fadeInDown',
            '.main_thirteen .fuli .fuli_1': 'fuliRight',
            '.main_thirteen .fuli .fuli_3': 'fuliRight',
            '.main_thirteen .fuli .fuli_2': 'fuliLeft',
            '.main_thirteen .fuli .fuli_4': 'fuliLeft',
            '.main_thirteen .ballon': 'ballonIn',
            '.main_thirteen .parent': 'fadeInUp',
            '.main_fourteen .child': 'fadeInRight',
            '.main_fourteen .date': 'bounceInDown',
            '.main_fourteen .word': 'fadeInLeft'
        };

        var $container = $('.current');
        for(var selector in effects){
            $(selector, $container).hide();
            $(selector, $container).show().addClass('animated ' + effects[selector]);
        }
    }

    function pageScroll(pageNum, dir){
        var marginT = winH * pageNum;
        wrap.css({"margin-top": -marginT});
        setTimeout(function(){
            if(dir === "up"){
                var parNum = pageNum + 1;
            }else{
                var parNum = pageNum - 1;
            }

            wrapMd.eq(parNum).removeClass('current');
            wrapMd.eq(pageNum).addClass('current');

            addAnimation();
        }, 300);
    }

    $('#read').on('click', function(){
        var $this = $(this);
        if($this.hasClass('show_next')) {
            if(pageNum <= mdSize-1){
                pageNum++;
                pageScroll(pageNum);
            }
        }else{
            $('.envelope_close .flap_closed').addClass('animate_open');
            $('.envelope_close .flap_open').addClass('animate_open');
            $('.envelope_close .letter').addClass('animate_open');
            $(this).addClass('show_next');
        }
    });

    $('#send').on('click', function(){
        var $this = $(this);
        if($this.hasClass('show_share')){
            $('#share').fadeIn();
        }else{
            $('.envelope_open .flap_open').addClass('animate_close');
            $('.envelope_open .flap_closed').addClass('animate_close');
            $('.envelope_open .letter').addClass('animate_close');
            $('.envelope_open .sticker').addClass('animate_close');
            //$(this).addClass('show_share');
            window.setTimeout(function(){
                $('#share').fadeIn();
            }, 3000)
        }
    });

    $('.next_page').on('click', function(){
        if(pageNum <= mdSize-1){
            pageNum++;
            pageScroll(pageNum);
        }
    });

    var imgUrl = 'https://raw.githubusercontent.com/miyukizhang/interview_project/master/img/interview.jpg';
    var lineLink = location.href;
    var descContent = "9月18日前，完成6道高难度面试单选题，丰厚大礼等你来拿";
    var shareTitle = document.title;
    var appid = '';
    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage', {"appid": appid,"img_url": imgUrl,"img_width": "200","img_height": "200","link": lineLink,"desc": descContent,"title": shareTitle}, function(res) {
        })
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline', {"img_url": imgUrl,"img_width": "200","img_height": "200","link": lineLink,"desc": descContent,"title": shareTitle}, function(res) {
        });
    }
    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo', {"content": descContent,"url": lineLink}, function(res) {
        });
    }
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            shareFriend();
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            shareTimeline();
        });
        WeixinJSBridge.on('menu:share:weibo', function(argv) {
            shareWeibo();
        });
    }, false);

});