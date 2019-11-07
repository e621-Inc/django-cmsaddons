var PicturesLazyLoad = ( function() {
    'use strict';

    return { init: lazy_loader };

    function lazy_loader( selector, observer_options ) {
        // select elements with given selector or default (.lazyload )
        var images = document.querySelectorAll( selector || '.lazyload' );

        if ( 'loading' in HTMLImageElement.prototype ) {
            // full modern browser lazyloading we do nothing
            images.forEach( img => {
                img.src = img.dataset.src;
                img.classList.add( 'loading' );
            } );
        } else if( 'IntersectionObserver' in window ) {
            // modern js lazyloading
            set_observer( images, observer_options );
        } else {
            // older browsers no lazyloading
            set_fallback( images );
        }
    };

    function set_observer( images, options ) {
        options = options || {};
        var observer = new IntersectionObserver( lazy_load, options );
        for( var i = 0; i < images.length; ++i ) {
            images[ i ].classList.add( 'loading' )
            observer.observe( images[ i ] );
        }

        function lazy_load( elements ) {
            elements.forEach( load_element );
        };

        function load_element( element ) {
            if ( element.intersectionRatio > 0 ) {
                element.target.src = element.target.dataset.src;
                observer.unobserve( element.target );
            }
        };
    };

    function set_fallback( images ) {
        var i;
        var img;
        for( i = 0; i < images.length; ++i ) {
            img = images[ i ];
            img.src = img.dataset.src;
            img.classList.remove( 'loading' )
        };
    };

} )();