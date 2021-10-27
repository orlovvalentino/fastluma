/*eslint-disable */
/*!
 * jQuery UI Effects Blind - v1.13.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 */

define([
    'jquery',
    'jquery-ui-modules/effect'
], function ($, undefined) {

    var effectsEffectBlind = $.effects.define("blind", "hide", function (options, done) {
        var map = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            },
            element = $(this),
            direction = options.direction || "up",
            start = element.cssClip(),
            animate = {clip: $.extend({}, start)},
            placeholder = $.effects.createPlaceholder(element);

        animate.clip[map[direction][0]] = animate.clip[map[direction][1]];

        if (options.mode === "show") {
            element.cssClip(animate.clip);
            if (placeholder) {
                placeholder.css($.effects.clipToBox(animate));
            }

            animate.clip = start;
        }

        if (placeholder) {
            placeholder.animate($.effects.clipToBox(animate), options.duration, options.easing);
        }

        element.animate(animate, {
            queue: false,
            duration: options.duration,
            easing: options.easing,
            complete: done
        });
    });
});
