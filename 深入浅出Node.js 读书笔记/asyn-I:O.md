## 异步 I/O

#### 为什么要用异步I/O

###### 用户体验

1. 如果JavaScript在执行的时候 UI 渲染和响应是处于停滞状态的。如果超过100ms 用户体验便会不好了
2. 前端异步可以消除 1 中提到的现象 例如同时有耗时 M 和 N 的两个资源，采用同步的话是 M+N 异步的话是 max(M,N); 如果一次性请求的资源较多的话就会显示出来异步的优势了。

###### 资源分配

1. 业务场景中，有一组互不相关的任务要完成流行的方法是：

	1. 单线程串行依次执行
		* 会因为I/O阻塞导致硬件资源得不到更好的利用
	2. 多线程并行完成
		* 容易出现多线程的死锁，状态同步等问题
2. Node 用的方法是： 单线程 + 异步I/O

#### 异步I/O  非阻塞 I/O

1. 操作系统内核对于 I/O 只有两种方式：阻塞和非阻塞

	1. 阻塞：调用之后必须要等到系统层面完成所有的操作之后，调用才结束。
		* 这样造成了 CPU等待 I/O ，浪费时间，CPU的处理能力不能得到充分的利用
		
	2. 非阻塞：非阻塞I/O 第一次返回的时候不需要得到数据，返回之后， CPU 的时间片可以去处理别的事物，要回去数据的话，还需要通过文件描述符再次读取
		* 由于完整的I/O并没有完成，所以为了完整的获取数据，应用程序需要重复调用 I/O 操作来确认是否完成，这种技术叫做 轮询
		* 轮询
			* read: 一直重复检查 I/O 状态来完成数据的读取，性能最低
			* select: 通过对文件描述符上的事件状态来判断，最多同时检查1024个文件描述符
			* poll: 采用链表的形式避免select 数组长度的限制。其次它能避免不必要的检查，文件描述符较多的时候性能还是很低下
			* epoll: 进入轮询的时候如果没有检测到 I/O 事件，将会进行休眠，直到事件发生将其唤醒。
			* kqueue: 与 epoll 类似不过只在 freeBSD 下面有效
	
#### Node 异步 I/O 模型的基本要素		
###### Node 的异步I/O

1. 事件循环

	* 进程启动 -> 创建一个类似while(true)的循环 -> 循环体(Tick) 查看是否有事件待处理 -> 有就取出，执行 然后进入下一个循环 没有的话就退出

2. 观察者：在循环中判断是否有事件待处理

	* 使用了生产者消费者模式,[聊聊生产者和消费者模式](http://www.infoq.com/cn/articles/producers-and-consumers-mode) [PS： 可惜了基本代码都没看懂，看这篇主要对这个模式有了一个基本的概念]
	
###### 请求对象

1. 从 JavaScript 发起调用到 内核执行完 I/O 操作，存在一种中间产物

	* 例如： js 调用 -> fs.open() -> open(src/node_file.cc) -> libuv(平台判断) 根据平台的不同滴啊用uv_fs_open() -> 结束
	
	
###### 执行回调

1. 是第二部分，线程池的一些操作，其中包括事件循环

#### 非 I/O 的异步 API

###### 定时器

1. setTimeout && setInterval

	* 它并非那么的准确，有时候会有些许毫秒的超期
	
2. process.nextTick()

	* setTimeout 实现：
	<pre>
		setTimeout(function(){
			//...
		},0);	
	</pre>

	* process.nextTick 实现
	<pre>
	process.nextTick = function(callback){
		//如果正在进行中则直接退出
		if(process. _exsiting){
			return;
		}
		
		if(tickDepth >= process.maxTickDepth){
			maxTickWarn();
		}
		var tock = {callback: callBack};
		
		if(process.domain) took.domain = process.domain;
		
		nextTickQueue.push(tock);
		
		if(nextTickQueue.length){
			process._needTickCallback();
		}
	}
	</pre>
	process.nextTick() 只会将回调函数放入到队列中，在下一轮 Tick 时候取出执行
	
	* setImmediate(): 跟process.nextTick()是一样的作用，两个的优先级是process.nextTick()比较高，先于它执行，因为process.nextTick()是 idle 观察者， setImmediate 属于 check 观察者 
	* 观察者优先级: idle > I/O > check


