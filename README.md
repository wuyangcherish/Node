### Node

##### 查阅的文章：

* [https://sfantasy.gitbooks.io/node-in-action/content/zh/npm-package/validator.html](https://sfantasy.gitbooks.io/node-in-action/content/zh/npm-package/validator.html)

* [http://wwsun.github.io/posts/nodejs-interview-questions.html](http://wwsun.github.io/posts/nodejs-interview-questions.html)

* [http://www.ituring.com.cn/article/199288](http://www.ituring.com.cn/article/199288)

* [http://taobaofed.org/tags/Node%E5%9C%B0%E4%B8%8B%E9%93%81/](http://taobaofed.org/tags/Node%E5%9C%B0%E4%B8%8B%E9%93%81/)

##### 遇到的问题
1. connect ECONNREFUSED 127.0.0.1:8124
	* 该问题是在学习 TCP 连接的时候遇到的
	* 在创建 TCP 服务器端的时候有两种方法 第一种是执行了 node tcp.js 之后，然后启动telnet 127.0.0.1 8124 然后就看到tcp.js 里面的socket 写入的东西显示了出来。但是。。 还有另一种方式用 net.connect({port:8124},function(){});这种方式来自行搭建构造客户端进行会话，
	* 问题就出在这里，我以为connect的参数已经有了端口号座椅就不用再启动tcp.js了,所以导致的是remote port没有被启动，报了这个错误
	* 解决问题的方式超级简单：同时启动tcp.js client.js 就OK 了


		
	






