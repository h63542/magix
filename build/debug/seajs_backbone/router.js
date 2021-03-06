define("magix/router",["magix/impls/router","magix/base"],function(require){
	var impl = require("magix/impls/router");
	var Base = require("magix/base");
	var Router = {};
	Base.mix(Router, {
	//props
	config : null,
	appConfig : null,
	state : null,
	search : null,
	query : null,
	queryModel : null,
	rootViewName : null,
	oldRootViewName : null,
	postData : null,
	_locator : null,
	//abstract members
	getAppConfig : Base.unimpl,
	setStateListener : Base.unimpl,
	parseState : Base.unimpl,
	parseSearch : Base.unimpl,
	getRootViewName : Base.unimpl,
	createQueryModel : Base.unimpl,
	changeQueryModel : Base.unimpl,
	mountRootView:Base.unimpl,
	////todo goTo navigateTo setPostData
	navigateTo:Base.unimpl,
	goTo:Base.unimpl,
	setPostData:Base.unimpl,
	//concrete members
	init : function(config) {
		this.config = config;
		this.appConfig = this.getAppConfig();
		this.setStateListener();
	},
	route : function(stateString) {
		
		this.state = this.parseState(stateString);
		this.search = this.parseSearch();
		this._locator = {
			state : this.state,
			search : this.search
		};
		this.query = this._spreadLocator();
		this.oldRootViewName = this.rootViewName;
		this.rootViewName = this.getRootViewName();
		if(this.rootViewName == this.oldRootViewName) {
			this.changeQueryModel();
		}else{
			this.queryModel = this.createQueryModel();
			this.mountRootView();
		}
		this.postData = null; //todo re-think postData
	},
	_spreadLocator : function() {
		var query = {};
		var locator = this._locator;
		Base.mix(query, locator.state.paraObj);
		Base.mix(query, {
			referrer : locator.state.referrer,
			query : locator.state.query,
			pathname : locator.state.pathName,
			postdata : locator.state.postData || null //todo postdata
		});
		var multipageQuery = {}, schKey, schPara = locator.search.paraObj;
		if(this.config.multipage || true) {//todo del ||true
			multipageQuery["sch:pathname"] = locator.search.pathName;
			multipageQuery["sch:query"] = locator.search.query;
			for(schKey in schPara) {
				multipageQuery["sch:" + schKey] = schPara[schKey];
			}
			Base.mix(query, multipageQuery);
		}
		return query;
	}
});

	return Base.implement(Router, impl);
});
