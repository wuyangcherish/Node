## 网络编程
#### 构建 TCP 服务

###### OSI 七层协议
<pre>
HTTP SMTP IMTP   --> 表示层
加密/解密          --> 表示层
通信连接/维持会话   --> 会话层
TCP/UDP          --> 传输层
IP               --> 网络层
网络特有的链路接口  --> 链路层
网络物理硬件       --> 物理层
</pre>

###### TCP 
* TCP 是面向连接的协议，需要经过3次握手才可以形成会话，之后服务端与客户端之间才可以互相发送数据，在创建会话的过程中，服务器端和客户端分别提供一个套接字，这两个套接字共同形成一个连接，服务器端与客户端则通过套接字实现两者之间连接的操作
* listener 是事件connection 的侦听器，也可以采用如下方式进行
<pre>
var server = net.createServer();
server.on("connection", function(){
	//新的连接
})
server.listen(8124)
</pre>
* 除了端口外，同样我们可以对Domain Socket 进行监听
<code>server.listen("/tmp/echo.sock")</code>

###### TCP 服务的事件
1. 服务器事件：	
	* listening: 调用server.listen() 绑定端口或者Domain socket的时候触发简洁的写法为<code>server.listen(port,listeningListener)</code>通过liste()的第二个参数传入
	* connection: 每个客户端套接字连接到服务器端时触发，
	* close: 服务器关闭的时候触发。调用server.close()之后，服务器将停止接收新的套接字连接
	* error: 当服务器发生异常的时候都会被触发，
2. 连接事件：服务器可以同时与多个客户端保持连接，对于每个连接而言是典型的可读可写Stream 对象，Stream 对象可以用于服务器端和客户端之间的通信，既可以通过data 事件从一端读取另一端来发送数据，也可以通过write() 方法从一端向另一端发送数据，

	* data --> 一端调用write()发送数据，另一端会触发data 事件，接收write写入的数据
	* end --> 任意一端发送了 FIN 数据触发结束该连接
	* connect --> 用于客户端  套接字与服务器连接成功就会触发该事件
	* drain --> write()发送数据时候触发
	* error --> 异常时候触发
	* close --> 套接字完全关闭的时候触发
	* timeout --> 一定时候不再活跃的时候触发
3. 在Node中 默认启动了 nagle 算法 可以调用<code>socket.setNoDelay(true)</code> 方法来关闭它

#### 构建UDP 服务

###### 创建 UDP 套接字
<pre>
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
</pre>

###### 创建UDP 服务器端
* 只要调用 dgram.bind(port,[address])方法对网卡和端口进行绑定即可

###### 创建 UDP 客户端
* 调用send 方法发送信息到网络中。<code>socket.send(buf,offset,length,port, address, [callback])</code>
* 参数分别为Buffer 的偏移，长度，目标端口，目标地址，回调

###### UDP 套接字事件
* 他只是一个 EventEmitter的实例
* message --> 侦听端口后，接收到消息时触发事件，携带的数据是 Buffer 对象 和 一个远程地址信息
* listening --> UDP 套接字开始侦听的时候触发该事件
* close --> 调用close()时候触发
* error --> 异常的时候触发

#### 构建 HTTP 服务

1. curl 工具可以捕捉到网络通信的所有报文
2. 由curl 工具显示的可以看出来http 一共是三步
	1. tcp 3次握手
	2. 握手之后客户端向服务器端发送请求报文
	3. 服务器端完成处理之后，向客户端发送响应头和响应体
###### HTTP 客户端

1. 响应 
	* ClientRequest 对象中，他的事件叫做 response ClientRequest 在解析响应报文时，一解析完毕就触发response事件，同时传递一个响应对象以供操作 ClientResponse,后续响应报文以只读流的方式提供
	
2. 代理
3. 通过ClientRequest 对象对同一个服务器端发起的 HTTP 请求最多可以创建 5 个连接，不管客户贯通式发起多少个请求，并发的只有5个。后续需要等待

#### WebSocket 服务
 
###### WebSocket 相比较 HTTP 的好处
1. 客户端与服务器端只建立一个 TCP 连接，可以使用更少的连接
2. WebSocket 服务器端可以推送数据到客户端，
3. 有更轻量级的协议头，减少数据的传送量
<pre>
var socket = new WebSocket("ws://127.0.0.1:12010/updates");
socket.onopen = function(){
	setInterval(function(){
		if(socket.bufferedAmount == 0){
			socket.send(getupdateData());
		}
	},50);
};
socket.onmessage = function(event){
	//TODO ..event.data
}
</pre>
上述的代码中，浏览器与服务器创建WebSocket请求，在请求完成后打开，每 50 毫秒向服务器端发送一次数据。通过 onmessage() 方法接收服务器端传来的数据。
4. WebSocket 基于TCP 上定义独立的协议，跟 HTTP 没有太大的关系。主要有两个部分：握手和数据传输。

###### WebSocket 握手
* 客户端建立连接，通过 HTTP 发起报文请求。与普通的 HTTP 请求不同的是upgrade:websocket Connection: updrade. 该字段表示请求服务器升级协议为 websocket 
* sec-websocket-key : 用于安全校验 是一个随机生成的Base64编码的字符串

WebSocket 跟 Node 都是基于事件的编程接口，基于 JavaScript ，以封装良好的WebSocket 实现，，另外 Node 基于事件驱动的方式使得它对应对 WebScoket 这样的长连接应用场景可以轻松的处理大量并发请求。

#### 网络服务与安全

Node在网络安全上提供了3 个模块分别为 crypto tls https crypto 主要用于加密解密 SHA1,MD5等加密算法都有体现







