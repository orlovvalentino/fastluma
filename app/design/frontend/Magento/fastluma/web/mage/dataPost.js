define(['domReady!'], function () {
    'use strict';
    class DataPost {
        constructor() {
            this.postTrigger = ['a[data-post]', 'button[data-post]', 'span[data-post]'];
            this.init();
        }

        init() {
            if (document.querySelectorAll(`${this.postTrigger}`).length > 0) {
                require(['mage/dataPostModule']);
            }
        }
    }

    return new DataPost();
});
