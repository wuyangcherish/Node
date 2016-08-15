## 异步编程

#### 函数式编程

###### 高阶函数
1. foreach() map() reduce() every() 等等都是高阶函数

###### 偏函数
1. 例如：

<pre>
	var isType = function(type){
		return function(obj){
			return toString.call(obj) == '[object +type+]';
		}
	}
	
	var isString = isType('String');
	var isFunction = isType('Function');
</pre>

###### 难点

1. 异常处理

	* 因为一部I/O实现是两个部分的：提交请求和处理请求，两者互不关联，所以在里面try catch 不能很好的捕获到后来传进来的数据的异常
		* 解决方法：将异常作为回调函数的第一个参数传回，如果为控制，则表示没有异常
			* function(err, result){}  这样子
			
2. 函数嵌套过深

	* 例如遍历一个目录的操作：
	<pre>
		fs.readdir(path.join(__dirname, '..'),function(err,files){
			files.forEach(function(filename,index){
				fs.readFile(filename,'utf8',function(err,file){
					//...
				})
			})
		})
	</pre>

3. 阻塞代码

	* JavaScript本身没有可以阻塞代码的sleep() 沉睡功能，唯一可以实现该功能的就是setTimeout()了
	
4. 多线程的问题：

	* Web workers，通过将JavaScript 执行与 UI 分离，很好的利用CPU
	
	
#### 异步编程解决方案

1. 事件发布/订阅模式
2. Promise/Deferred 模式
3. 流程控制库

###### 事件分布/订阅模式

事件的监听模式是一种广泛用于异步编程的模式，是回调函数的事件化，又称为发布订阅模式。 Node 自身提供的 events 模块就是发布/订阅模式的一个简单的实现。

events 模块里面的不存在事件冒泡等等它具有 addListener/on(), once(), removeListener(), removeAllListener(), and emmit() 等基本事件监听方法。

<pre>
	//订阅
	emitter.on("event1", function(message){
		console.log(message);
	})
	//发布
	emitter.emit('event1', "I am message");
</pre>
	
1. Node 事件发布/订阅模式的处理：

	1. 如果对一个事件添加了超过10个侦听器，将会得到一条警告
		* 因为太多的侦听器会导致内训泄露，调用<code>emitter.setMaxListener(0)</code> 就可以将该限制去掉。
		* 侦听器过多的话会导致占用 CPU 的情景。
		
	2. EventEmitter 对象对error 事件进行了特殊的处理，如果运行期间错误触发了 error 事件， EventEmitter 会检查是否有 error 事件添加多侦听器。如果添加了这个错误就由侦听器处理，否则将作为异常抛出，
	
2. 继承 events 模块

	1. Node 在 util 模块里面封装了继承的方法，所以可以很方便的调用
		<pre>
			var events = require("events");
			function(){
				events.EventEmitter.call(this);
			}
			util.inherits(Stream, events.EventEmitter);
		</pre>
		
3. 利用事件队列解决雪崩的问题

	1. 利用 once() 将所有的请求都压入事件队列中，利用其执行一次就会将监视器移除的特点，保证每个回调都是只会被调用一次，SQL 在查询的时候，新到来的相同回调只需要在队列中等待结果就行，查询结束后的结果可以被所有的调用共同使用。
	<pre>
		var proxy = new events.EventEmitter();
		var status = "ready";
		var select = function(callback){
			proxy.once("selected", callback);
			if(status === "ready"){
				status = "pending";
				db.select("SQL", function(result){
					proxy.emit("selected", results);
					status = 'ready';
				})
			}
		}
	</pre>
	
4. EventProxy 还未看 【先占位 以后补充】

####### Promise/Deferred 模式
1. Promises/A 

	1. 只存在三种状态： 未完成，完成，失败
	2. 只会出现从 未完成->完成 & 未完成->失败 不可逆
	3. 一旦转化完成不可更改
	
	``promiseA 编程 推荐： promise 迷你书
	``
	链接地址：[http://liubin.org/promises-book/](http://liubin.org/promises-book/) 	
	
	
	
=====================

未完成.....

=====================
