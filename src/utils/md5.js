import Vue from 'vue'
import CryptoJS from 'crypto-js'


export default { //加密
	encrypt(word, keyStr) {
		keyStr = keyStr ? keyStr : '41b9a95be60eaf502b3f7fdc75f67d50';
		//41b9a95be60eaf502b3f7fdc75f67d50
		//41b9a94be60eef50
		var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
		var iv = CryptoJS.enc.Utf8.parse('AB3EA843D7C19548');
		var srcs = CryptoJS.enc.Utf8.parse(word);
		// console.log(CryptoJS.mode.CBC)
		// var srcs2 = CryptoJS.enc.Base64.stringify(srcs);
		var encrypted = CryptoJS.AES.encrypt(srcs, key, {
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
			iv: iv
		});
		// return encrypted.toString();
		console.log(CryptoJS.enc.Base64.stringify(encrypted.ciphertext))
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	},
	//加密字符串
	toSign(submitDate,params){
		let str=""
		for( var k  in submitDate){
			str+= k+'='+submitDate[k]+'&'
        }
     
		return  this.encrypt((str + params)) 
	},
	
	generatekey(num) {
		let library = "41b9a94be60eef50";
		let key = "";
		for (var i = 0; i < num; i++) {
			let randomPoz = Math.floor(Math.random() * library.length);
			key += library.substring(randomPoz, randomPoz + 1);
		}
		return key;
	},


	//解密
	decrypt(word, keyStr) {
		keyStr = keyStr ? keyStr : '41b9a95be60eaf502b3f7fdc75f67d50';
		var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
		var iv = CryptoJS.enc.Utf8.parse('AB3EA843D7C19548');
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
			iv: iv
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}

}
