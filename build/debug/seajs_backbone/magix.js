/*
 * Magix:全局变量
 * 		init(config):启动Magix，原生代码，与Loader无关，
 * 			config:
 * 				magixHome:magix模块所在目录
 * 				appHome：app模块所在目录
 * 		setEnv：设置debug信息，package信息等，为Loader工作配置好路径
 * 		bootstrap：启动Router模块 真正开启Magix
 * 		implementBy：Magix实现底层依赖类库信息
 * 		version:版本号
 */
Magix = {
	init : function(config) {
		this.config = config;
		this.setEnv();
		this.bootstrap();
	},
	setEnv : function() {
		var alias={
			magix:this.config.magixHome,
			app:this.config.appHome
		};
		if(!this.dev){
			delete alias.magix;
		}
		seajs.config({
			debug : 2,
			alias : alias
		});
		if(MxHistory && MxHistory.init) {
			MxHistory.init(this.config);
		}
	},
	bootstrap : function() {
		var self = this;
		seajs.use(["magix/router"], function(Router) {
			
			Router.init(self.config);
		});
	},
	implementBy : "seajs-backbone-jquery",
	version : "0.3.0",
	dev:''
};
