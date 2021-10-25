define([
	'underscore',
	'jquery',
	'mage/utils/wrapper'
], function (_, $, wrapper) {
	'use strict';

	const dataAttrLazy = 'data-mage-init-lazy',
		nodeSelectorLazy = '[' + dataAttrLazy + ']';

	function initLazy(el, config, component) {
		let componentsObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					require([component], function (fn) {

						if (typeof fn === 'object') {
							fn = fn[component].bind(fn);
						}

						if (_.isFunction(fn)) {
							fn(config, el);
						} else if ($(el)[component]) {
							$(el)[component](config);
						}
					}, function (error) {
						if ('console' in window && typeof window.console.error === 'function') {
							console.error(error);
						}

						return true;
					});
					componentsObserver.unobserve(entry.target);
				}
			});
		});

		componentsObserver.observe(el);
	}

	function getDataLazy(el) {
		var data = el.getAttribute(dataAttrLazy);

		el.removeAttribute(dataAttrLazy);

		return {
			el: el,
			data: JSON.parse(data)
		};
	}

	return function (main) {
		main.apply = wrapper.wrapSuper(main.apply, function () {
			this._super();
			const nodesLazy = document.querySelectorAll(nodeSelectorLazy);

			_.toArray(nodesLazy)
				.map(getDataLazy)
				.forEach(function (itemContainer) {
					var element = itemContainer.el;

					_.each(itemContainer.data, function (obj, key) {
							initLazy.call(null, element, obj, key);
						}
					);
				});

		});

		return main;
	};
});

