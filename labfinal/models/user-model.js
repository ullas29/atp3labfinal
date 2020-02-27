var db = require('./db');



// go to edit model

module.exports= {
	getById : function(uid, callback){
		var sql = "select * from user where uid=?";
		db.getResults(sql, [uid], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},




	    //view book  model
	getAllbook : function(callback){
		var sql = "select * from book ";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},






    //view user  model
	getAll : function(callback){
		var sql = "select * from user ";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

    //login validation
	validate: function(user, callback){
		var sql ="SELECT * FROM user where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	getByUname: function(username, callback){
		var sql = "select * from user where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into user values(?,?,?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

   //user updete
	update : function(user, callback){
		var sql = "update user set uname=?,username=?,password=?,phone=?,email=?, age=?,gender=?,utid=? where uid=?";
		db.execute(sql, [user.uname,user.username,user.password, user.phone, user.email,user.age,user.gender,user.utid,user.uid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},



	delete: function(user, callback){
		var sql = "delete from user where uid=?";
		db.execute(sql, [user.uid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}