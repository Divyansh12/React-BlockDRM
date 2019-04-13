function matchesFullUrl (linkToTest) {
	return window.location.href === linkToTest
}
function matchesPath (linkToTest) {
	if (linkToTest[0] !== '/') return false
	return window.location.pathname === linkToTest
}
function matchesHash (linkToTest) {
	if (linkToTest[0] !== '#') return false
	if (!window.location.hash && linkToTest === '#') return true
	return window.location.hash === linkToTest	
}
function setHighlights (items) {
	for (var i = 0; i < items.length; i++) {
		try {
			var link = items[i].link
			items[i].active = false
			if (matchesFullUrl(link) || matchesPath(link) || matchesHash(link)) items[i].active = true
		} catch(err) {
			continue	
		}
	}
	return items	
}

new Vue({
	el: mod.el,
	data() {
		mod.data.itemsWithHighlights = mod.data.items
		mod.data.open = false
		return mod.data
	},
	mounted() {
		setHighlights(mod.data.itemsWithHighlights)
		window.onhashchange = function () {
			setHighlights(mod.data.itemsWithHighlights)
		}
	}
})