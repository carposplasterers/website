(function(global){
    
    var $ = global.$,
        $window = $(global.window),
        $scrollTop = $('.scroll-top'),
        alignModal = function() {

            var $modal = $(this).find(".modal-dialog");
            
            $modal.css("margin-top", Math.max(0, ($window.height() - $modal.height()) / 2));
        
        },
        getMenuItemFromPathName = function(pathName) {
        
            return $('#navbar-main').find('li a[data-page-url="' + window.location.pathname + '"]');            

        };

    $(function() {        
        
        /*var s = document.createElement("script");
    
        s.onload = function() { bootlint.showLintReportForCurrentDocument([]); };
    
        s.src = "https://maxcdn.bootstrapcdn.com/bootlint/latest/bootlint.min.js";
    
        document.body.appendChild(s);*/

        $('.carousel').carousel({
            interval: 5000 //changes the speed
        })

        $window.scroll(function () {
            
            var $header = $('.header'),
                $pageContent = $('.page-content'),
                $navbarMain = $('#navbar-main');
            
            if($window.width() > 1200) {
                
                if ($window.scrollTop() >= $navbarMain.offset().top) {
                    
                    $navbarMain.addClass('navbar-fixed-top');
                    $scrollTop.removeClass('hidden');
                    $pageContent.addClass('navbar-fixed-top-shim');
                
                }
                    
                if ($window.scrollTop() < $header.outerHeight()) {

                    $navbarMain.removeClass('navbar-fixed-top');
                    $scrollTop.addClass('hidden');
                    $pageContent.removeClass('navbar-fixed-top-shim');

                }
            }

          

        });

        var scroll = function(offset) {

            $('html, body').animate({ scrollTop: offset }, 'slow');   

        };

        $('body').on('activate.bs.scrollspy', function () {
            
            var $target = $('#navbar-main').find("li.active > a"),
                section = $target.attr('id'),
                pageUrl = $target.data('page-url');

            history.pushState(null, null, pageUrl);

        });

        window.addEventListener('popstate', function(event) {

            var $menuItem = getMenuItemFromPathName(window.location.pathname);

            $menuItem.click();

        });

        $('#navbar-main li a').on('click', function(event) {

            event.preventDefault();

            var $target = $($(this).attr('href'));

            scroll($target.offset().top -80);

            return false;         

        });

         $scrollTop.on('click', function(event) {
             
             scroll(0);
             
             return false;

        });

        $(".modal").on("shown.bs.modal", alignModal);
    
        $window.on("resize", function(){
            
            $(".modal:visible").each(alignModal);

            if($window.width() < 1201) {
                
                $('#navbar-main').addClass('.navbar-fixed-top');
            
            } else {

                $('#navbar-main').removeClass('.navbar-fixed-top');

            }

        }); 

        getMenuItemFromPathName(window.location.pathname).click();  
    
    });
    
}(this));