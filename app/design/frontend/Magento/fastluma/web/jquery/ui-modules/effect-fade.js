/*eslint-disable */
/*!
 * jQuery UI Effects Fade 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Fade Effect
//>>group: Effects
//>>description: Fades the element.
//>>docs: http://api.jqueryui.com/fade-effect/
//>>demos: http://jqueryui.com/effect/

define([
    'jquery',
    'jquery-ui-modules/effect'
], function ($, undefined) {

    var effectsEffectFade = $.effects.define( "fade", "toggle", function( options, done ) {
        var show = options.mode === "show";

        $( this )
            .css( "opacity", show ? 0 : 1 )
            .animate( {
                opacity: show ? 1 : 0
            }, {
                queue: false,
                duration: options.duration,
                easing: options.easing,
                complete: done
            } );
    } );
});
