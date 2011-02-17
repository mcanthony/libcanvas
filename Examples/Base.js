/*
---

name: "Base"

description: "Base"

license: "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- Examples

provides: Base

...
*/

LibCanvas.Examples.set('Base',
	function (canvas) {
		var libcanvas = new LibCanvas(canvas);
		libcanvas.start(function () {
			console.log('frame');
		});

	}
);