define("magix/impls/vframe", ["magix/base"], function(require) {
	var vframeTagName = "vframe";
	var Base=require("magix/base");
	var iVframe=function(){
		
	};
	Base.mix(iVframe,{
		tagName:vframeTagName
	});
	Base.mix(iVframe.prototype,{
		getChildVframeNodes : function() {
			var node = document.getElementById(this.id);
			var nodes = node.getElementsByTagName(vframeTagName);
			var i, res = [];
			for( i = 0; i < nodes.length; i++) {
				res.push(this._idIt(nodes[i]));
			}
			return res;
		},
		createFrame:function(){
			return document.createElement(iVframe.tagName);
		}
	});
	return iVframe;
});
