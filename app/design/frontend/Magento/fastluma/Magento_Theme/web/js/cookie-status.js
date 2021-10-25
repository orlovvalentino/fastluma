define([
    'jquery',
    'jquery-ui-modules/widget',
    'mage/translate'
], function ($) {
    'use strict';

    $.widget('mage.cookieStatus', {
        options: {
            type: 'popup',
            responsive: true,
            innerScroll: true,
            autoOpen: true,
            buttons: [{
                text: $.mage.__('Close'),
                class: 'cookie-status',

                /**
                 * Callback for click event
                 */
                click: function () {
                    this.closeModal();
                }
            }]
        },

        /**
         * Init object
         * @private
         */
        _init: function () {
            if (!navigator.cookieEnabled) {
                require(['Magento_Ui/js/modal/modal'], (modal) => {
                    modal(this.options, $('#cookie-status'));
                });
            }
        }
    });

    return $.mage.cookieStatus;
});
