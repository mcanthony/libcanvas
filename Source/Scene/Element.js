/*
---

name: "Scene.Element"

description: "LibCanvas.Scene"

license:
	- "[GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)"
	- "[MIT License](http://opensource.org/licenses/mit-license.php)"

authors:
	- "Shock <shocksilien@gmail.com>"

requires:
	- LibCanvas
	- Scene
	- Behaviors.Drawable

provides: Scene.Element

...
*/

Scene.Element = Class(
/**
 * @lends LibCanvas.Scene.Element#
 * @augments Drawable
 */
{
	Extends: Drawable,

	Implements: Class.Options,

	/** @constructs */
	initialize: function (scene, options) {
		scene.libcanvas.addElement( this );
		this.stopDrawing();
		
		this.scene = scene;
		scene.addElement( this );
		
		this.setOptions( options );

		var ownShape = this.shape && this.shape != this.self.prototype.shape;

		if (ownShape || this.options.shape) {
			if (!ownShape) this.shape = this.options.shape;
			this.saveCurrentBoundingShape();
		}
		if (this.options.zIndex != null) {
			this.zIndex = Number( this.options.zIndex );
		}

		this.childrenElements = [];
		this.childFactory     = Scene.Element;
	},

	previousBoundingShape: null,

	get currentBoundingShape () {
		return this.shape;
	},

	destroy: function () {
		this.scene.rmElement( this );
		return this;
	},

	hasPoint: function (point) {
		return this.shape.hasPoint( point );
	},

	addShift: function (shift) {
		this.shape.move( shift );
		this.previousBoundingShape.move( shift );
		return this;
	},

	redraw: function () {
		this.scene.redrawElement( this );
		return this;
	},

	onUpdate: function (time) {
		return this;
	},

	clearPrevious: function ( ctx ) {
		ctx.clear( this.previousBoundingShape );
		return this;
	},

	saveCurrentBoundingShape: function () {
		var shape = this.currentBoundingShape;
		this.previousBoundingShape = shape.fillToPixel ?
			shape.fillToPixel() : shape.clone().grow( 2 );
		return this;
	},
	renderTo: function (ctx, resources) {
		return this;
	},

	// Children
	setChildrenFactory: function (Class) {
		this.childFactory = Class;
		return this;
	},
	createChild: function (options) {
		var child = this.childFactory.factory( [this.scene].append(arguments) );
		this.addChildren(child);
		return child;
	},
	addChildren: function (child) {
		for (var i = 0, l = arguments.length; i < l; i++) {
			this.childrenElements.include(arguments[i]);
		}
		return this;
	},
	removeChildren: function (child) {
		for (var i = 0, l = arguments.length; i < l; i++) {
			this.childrenElements.erase(arguments[i]);
		}
		return this;
	},
	invokeChildren: function (method, args) {
		var children = this.childrenElements;
		if (!args) args = [];
		for (var i = 0, l = children.length; i < l; i++) {
			children[i][method].apply( children[i], args );
		}
		return this;
	}
});