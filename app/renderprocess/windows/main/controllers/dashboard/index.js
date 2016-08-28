'use strict';

const {Controller} = require('easyone-electron');

module.exports = class DashHome extends Controller{

	get viewPath(){ return __dirname+'\\view.pug'; }
	get stylePath(){ return __dirname+'\\style.less'; }
	get componentsPath(){ return __dirname+'\\components'; }

	daysInMonth(date) {
		return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
	}

	init(){
		this.addRenderLocals('daysInMonth', this.daysInMonth(new Date()));
	}
}
