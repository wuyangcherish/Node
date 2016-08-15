# Node

## 初识单线程的Node.js

#### Node.js 的结构

1. node的结构大致分为三层
	1. node 标准库 (Node standard library),其中包括 http,net,stream, fs, events, buffer等等，这部分是由JavaScriot 编写的。
	
	2. Node bindings 这一层是JavaScript 与底层的 C/C++ 能够沟通的关键，前者通过bindings 调用后者， 相互交换数据, 实现 node.cc
	
	3. 第三层是支撑 Node.js 运行的关键 由 C/C++实现
		
		* V8 : 由Google 推出的 JavaScript VM 也是node.js 为什么使用的JavaScript的关键， 它为2JavaScript 提供了在非浏览器下面运行的环境，他的高效是node.js 之所以高效的原因
		* Libuv : 它为Node.js 提供了跨平台， 线程池, 事件池， 异步I/O 等能力， 是Node.js 如此强大的关键
			* 它为Node.js 提供了统一的API 调用，使其不用考虑平台的差异性。
		* C-ares: 提供了异步处理 DNS 的能力
		* http_parser, OpenSSL, zlib, 等等， 提供了http解析， SSL， 数据压缩等其他的能力
		
#### 与操作系统的交互

1. 例如我们想打开一个文件
	<pre>
		var fs = require("fs");
		fs.open('../test.txt', function(err, fd){
			//...do something 
		})
	</pre>
	
	1. 过程大致是： lib/fs.js -> src/node_file.cc -> uv_fs
		* libuv 在uv 层会对平台进行判断做出相应的操作
		
	2. 从上面可以发现，真正的执行过程是：V8 将 JavaScript 解析, 然后由 C/C++ 来执行真正的调用.node.js 是一个平台不是一门语言
	

#### 异步，非阻塞 I/O

1. Libuv 本身就是基于异步和事件驱动的，所以当我们将 I/O 操作的请求传递给 Libuv 之后，Libuv 开启县城来执行这次的 I/O 调用，并在执行完成之后，传给JavaScript 进行后续的处理
2. I/O 文件包括 文件 I/O 和 网络 I/O ,
	* 文件 I/O DNS 等操作 都是依托线程池来实现的
	* 网络 I/O 这一大类， 包括 TCP UDP TTY 等，是由 epoll IOCP kqueue 来具体实现的
3. 一个异步的 I/O 的大致流程如下：
	1. 发起 I/O 调用
		* 用户通过JavaScript 代码调用 Node 核心模块，将参数和回调函数传入到核心的模块
		* Node 核心模块会将传入的参数和回调函数封装成一个请求对象
		* 将这个请求对象推入 I/O 线程池等待执行
		* JavaScript 发起的异步回调结束，JavaScript 线程继续执行后续操作
	2. 执行回调
		* I/O 操作完之后，会将结果存储到请求对象的result 属相上面，并发出操作完成的通知
		* 每次的事件循环时会检查是否有完成的 I/O 操作， 如果有就将请求对象加入到 I/O 观察者队列中，之后当做事件处理
		* 处理 I/O 观察者事件时，会取出之前封装在请求对象中的回调函数， 执行这个回调函数， 并将result 当参数，已完成 JavaScript 回调的目的
		* 所有的异步操作都是在Libuv 以及它的事件循环执行的，这也是为什么JavaScript 一个单线程的语言，能在 Node.js 里面实现异步操作的原因
		
#### 事件驱动

1. node.js 会一直调用 uv_run 直到循环不在 alive ,在 uv_run 里面会维护一系列的监听器。这些监听器都对应着一种异步的操作，uv_run 支执行的过程中，会不断地检查这些队列里面是否有pending 状态的事件， 有则触发， 而且每次仅触发一个回调，因为单线程的JavaScript 无法处理多个回调互相竞争的关系

