var PicturesLazyLoad = ( function() {
    'use strict';

    var observer;

    return { init: lazy_loader };

    function lazy_loader( selector, options ) {
        // select elements with given selector or default (.lazyload )
        var elements = document.querySelectorAll( selector || '.lazyload' );
        options = get_options( options || {} );

        if ( 'loading' in HTMLImageElement.prototype ) {
            // full modern browser lazyloading we do nothing
            set_browser_loader( elements );
            // set_observer( elements, options.observer );
        } else if( 'IntersectionObserver' in window ) {
            // modern js lazyloading
            set_observer( elements, options.observer );
        } else {
            // older browsers no lazyloading
            set_fallback( elements );
        }
    };

    function get_options( options ) {
        if( !options.observer ) {
            options.observer = {
                rootMargin: '0px',
                threshold: 0.1
            }
        }
        return options;
    };


    // Browser lazyloading ----------------------------------------------------

    function set_browser_loader( elements ) {
        elements.forEach( element => {
            element.classList.add( 'loading' );
            element.addEventListener( 'load', load_element_end );
            element.src = element.dataset.src;
            load_element_init( element );
        } );
    };


    // Js lazyloading ---------------------------------------------------------

    function set_observer( elements, options ) {
        var observer = new IntersectionObserver( lazy_load, options );
        for( var i = 0; i < elements.length; ++i ) {
            load_element_init( elements[ i ] );
            observer.observe( elements[ i ] );
        }
    };

    function lazy_load( entries ) {
        for( var i = 0; i < entries.length; ++i ) {
            load_element( entries[ i ] )
        }
    };

    function load_element( entry ) {
        var element = entry.target;
        if ( entry.intersectionRatio > 0 ) {
            element.src = element.dataset.src;
            element.addEventListener( 'load', load_element_end );
            observer.unobserve( element );
        }
    };


    // Fallback no lazyload ---------------------------------------------------

    function set_fallback( images ) {
        // TODO implement js loader for old version on scroll loading
        var img;
        for( var i = 0; i < images.length; ++i ) {
            img = images[ i ];
            img.src = img.dataset.src;
            img.classList.remove( 'loading' )
        };
    };


    //  Utilities -------------------------------------------------------------

    function load_element_init( element ) {
        element.classList.add( 'loading' );
        if( element.dataset.has_wrap ) {
            element.parentNode.classList.add( 'wrap-loading' );
        }
    };

    function load_element_end( event ) {
        var element = event.target;
        element.classList.remove( 'loading' );
        element.classList.add( 'loaded' );
        if( element.dataset.has_wrap ) {
            element.parentNode.classList.remove( 'wrap-loading' );
            element.parentNode.classList.add( 'wrap-loaded' );
        }
    };

} )();