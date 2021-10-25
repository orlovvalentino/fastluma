/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
	'underscore',
	'jquery',
	'mage/utils/wrapper'
], function (_, $, wrapper) {
	'use strict';

	var scriptSelectorLazy = 'script[type="text/x-magento-init-lazy"]',
		dataAttrLazy = 'data-mage-init-lazy';


	/**
	 * Merges provided data with a current data
	 * of a elements' "data-mage-init" attribute.
	 *
	 * @param {Object} components - Object with components and theirs configuration.
	 * @param {HTMLElement} elem - Element whose data should be modified.
	 */
	function setData(components, elem) {
		var data = elem.getAttribute(dataAttrLazy);

		data = data ? JSON.parse(data) : {};

		data = $.extend(true, data, components);
		data = JSON.stringify(data);
		elem.setAttribute(dataAttrLazy, data);
	}

	/**
	 * Search for the elements by privded selector and extends theirs data.
	 *
	 * @param {Object} components - Object with components and theirs configuration.
	 * @param {String} selector - Selector for the elements.
	 */
	function processElems(components, selector) {
		var elems,
			iterator;

		elems = document.querySelectorAll(selector);
		iterator = setData.bind(null, components);

		_.toArray(elems).forEach(iterator);
	}

	/**
	 * Parses content of a provided script node.
	 * Note: node will be removed from DOM.
	 *
	 * @param {HTMLScriptElement} node - Node to be processed.
	 * @returns {Object}
	 */
	function getNodeData(node) {
		var data = node.textContent;

		node.parentNode.removeChild(node);

		return JSON.parse(data);
	}

	return function (scripts) {
		return wrapper.wrap(scripts, function (originalScripts) {

			var nodes = document.querySelectorAll(scriptSelectorLazy);

			_.toArray(nodes)
				.map(getNodeData)
				.forEach(function (item) {
					_.each(item, processElems);
				});
			return originalScripts();
		});
	};
});
