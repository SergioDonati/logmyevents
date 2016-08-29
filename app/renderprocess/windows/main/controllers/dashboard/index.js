'use strict';

const {Controller} = require('easyone-electron');

module.exports = class DashHome extends Controller{

	get viewPath(){ return __dirname+'\\view.pug'; }
	get stylePath(){ return __dirname+'\\style.less'; }
	get componentsPath(){ return __dirname+'\\components'; }

	daysInMonth(date) {
		return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
	}

	addMonths (date, count) {
		if (date && count) {
			var m, d = (date = new Date(+date)).getDate();

			date.setMonth(date.getMonth() + count, 1);
			m = date.getMonth();
			date.setDate(d);
			if (date.getMonth() !== m) date.setDate(0);
		}
		return date;
	}

	minMonths (date, count) {
		if (date && count) {
			var m, d = (date = new Date(-date)).getDate();

			date.setMonth(date.getMonth() - count, 1);
			m = date.getMonth();
			date.setDate(d);
			if (date.getMonth() !== m) date.setDate(0);
		}
		return date;
	}

	init(){
		this.currentDate = new Date();
		this.addRenderLocals('daysInMonth', this.daysInMonth(this.currentDate));
		this.addRenderLocals('currentDate', this.currentDate.getTime());
		this.addRenderLocals('nextDate', this.addMonths(this.currentDate, 1).getTime());
		this.addRenderLocals('prevDate', this.minMonths(this.currentDate, 1).getTime());
	}
}
