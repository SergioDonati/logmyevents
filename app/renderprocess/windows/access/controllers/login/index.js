'use strict';

const {Controller, app} = require('easyone-electron');

module.exports = class Login extends Controller {

	get viewPath(){ return __dirname+'\\view.pug'; }
	get stylePath(){ return __dirname+'\\style.less'; }

	init(){
		this.on('rendered', this.registerElements);
		this.addDOMListener('onSubmit', this.login.bind(this));
	}

	registerElements(parent){
		this.usernameInput = parent.querySelector('#login-form [name="username"]');
		this.passwordInput = parent.querySelector('#login-form [name="password"]');
	}

	login(){
		let username = this.usernameInput.value.trim();
		let password = this.passwordInput.value;
		let user = app.getCollections('Users').login(username, password);
		if (!user){
			alert('Username o password sono sbagliate!');
		}else{
			app.setProperty('user', user);
			app.login(user);
		}
	}

};
