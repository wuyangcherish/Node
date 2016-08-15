##### 遇到的问题：

1. install Refusing to install colors as a dependency of itself

	* 这是我安装colors 的时候遇到的错误
	* 因为我学习该 colors 的插件所以顺手将文件的名称也命名成了 colors ，npm init 的时候packgae.json 里面的 name 就是这个colors 导致 colors 的插件安装出现了问题
	* 这是个以后要注意的点， 不要将文件夹的名字命名成插件的名字
	
2. 在安装mongoDB 的时候有一个步骤是 mkdir -p data/db，在这个创建的时候用的是 root 权限创建的，然后在使用 mongod 的时候会发现 perminsion denial  

	* 解决方法: 
		<pre>
			cd /
			ls -al ： 查看所有的文件的owner
			chown -R <your name> data
		</pre>
		这样就OK了
	* stack overflow的答案：[http://stackoverflow.com/questions/15229412/unable-to-create-open-lock-file-data-mongod-lock-errno13-permission-denied](http://stackoverflow.com/questions/15229412/unable-to-create-open-lock-file-data-mongod-lock-errno13-permission-denied)

##### 插件

1. colors: 让终端的输入变得有颜色.

	具体的使用见文档:[https://github.com/marak/colors.js/](https://github.com/marak/colors.js/)
	
2. mocha :测试工具

	* 运行mocha  直接是调用文件下面 test/test.js所以如果该文件直接运行mocha会报错, 但是不影响其他文件使用这个东东
	* mocha 只是在终端运行检测问题的一个插件，但是至于怎么写就是看引入的是什么库的问题了。
		* chai should.js expect.js 等， 它可以兼容好多的库
		* [http://mochajs.org/](http://mochajs.org/)

3. should : 同步代码[Synchronous Code]
	* 当测试同步代码的时候，省略 callback mocha 会自动逐行执行
	* API [https://www.npmjs.com/package/should](https://www.npmjs.com/package/should)
	
	* 当测试异步代码的时候，也很简单的.档案成的时候调用一个callback 通过 add 一个回调函数在it() 里面，Mocha 就知道这个测试需要等到回调结束才可以完成。
	
4. chai : [http://chaijs.com/](http://chaijs.com/)
5. promise : 异步编程的东东



6. express && express-generator

	* 这个是最著名的 Web 开发框架
	* express-generator 是一个快速生成项目的框架
	
	* express somedir 就会创建生成一个标准的web 前端文件目录
	* npm install 安装package.json 里面所有的包依赖
	* npm start 启动这个项目 
	
	* 开发 express应用：
		* Model: 应用功能的实现,数据库的操作等
		* Controller: 负责转发请求,对请求进行处理等
		* View: 负责界面的显示,与用户的交互等等
	* 中文文档：[http://expressjs.jser.us/4x_zh-cn/api.html](http://expressjs.jser.us/4x_zh-cn/api.html)
		
7. mongoDB：
	
	* 安装: [http://docs.mongoing.com/manual-zh/tutorial/install-mongodb-on-os-x.html](http://docs.mongoing.com/manual-zh/tutorial/install-mongodb-on-os-x.html)
	
