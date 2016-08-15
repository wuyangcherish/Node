## Buffer

在 Node 中,应用需要处理处理网络协议，操作数据库，处理图片，接收上传文件等等，在网络流和文件的操作中，还要处理大量二进制的数据，JavaScript 自有的字符串远远不能满足这些要求，于是 Buffer 对象应运而生

#### buffer 结构

###### 模块结构
1. Buffer 是一个典型的 JavaScript 与 C++ 结合的模块，性能部分用 C++ 实现。性能非相关部分用 JavaScript 实现，
2. Buffer 所占用的内存不是通过 V8 分配的，属于堆外内存。
3. 在Node进程启动的时候就已经加载了它，并将其放在全局对象上面，所以在使用Buffer 的时候无须通过require() 即可直接使用。

###### Buffer 对象

1. Buffer 类似于Array 它的元素是16进制的两位数，即 0 到 255 的数值。

<pre>
var str = "ศ入റ出node.js";
var buf = new Buffer(str, 'utf-8');
console.log(buf);
< Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73 > 
</pre>

2. buffer 可以访问其 length 属性。

3. 如果创建一个100 字节的Buffer对象，可以通过下标访问其初始化的元素， 但是这个值是一个0 ~255 的随机的值，岁下标赋值的时候如果大于255 的值则会先减256 然后才是这个的位上的真是的值
<pre>
buf[20] = -100;
console.log(buf[20]); // 156
buf[21] = 300;
console.log(buf[21]); // 44 
</pre>

###### Buffer 的内存分配
1. 是由 Node 的C++ 层面实现的内存的申请的。然后为 JavaScript分配内存的策略
2. 采用的是slab[动态内存管理机制] 的分配机制。其具有三种状态
	1. full -> 完全分配状态
	2. partial -> 部分分配状态
	3. empty -> 没有被分配状态
	
3. Node 以 8KB 为界限来区分 Buffer 是大对象还是小对象， 这个8 KB 的值就是每个 slab 的值得大小，JavaScript 层面，以他作为对象进行内存分配

#### Buffer 转换

目前支持的有： ASCII UTF-8 UTF-16LE/UCS-2 Base64 Binary Hex

###### 字符串转 Buffer
* 主要是通过构造函数完成的 <code>new Buffer(str, [encoding])</code> encoding 省略时候默认是utf-8 进行编码和转码
* 一个 Buffer 可以存储不同编码类型的字符串转码的值，调用write() 方法可以实现该目的 <code>buf.write(string,[offset],[length],[encoding])</code>

###### Buffer 转字符串
* <code>buf.toString(string,[encoding], [start], [end])</code>

###### Buffer 不支持的编码类型
* 它目前支持的编码类型还不是很多。然后会依靠一些Node生态圈的模块来进行一些不支持的编码类型的转换

#### Buffer 的拼接
<pre>
var fs = require("fs");
var rs = fs.createReadStream("test.md");
var data = '';
rs.on("data", function(chunk){
	data += chunk;
})
rs.on("end", function(){
	console.log(data);
})
</pre>
* 对于英文的环境上面的代码不会有任何的问题，但是,,,,,, 这句<code>data += chunk</code>里面隐藏了toString() 的操作，有时候遇到宽字节的中文，会形成问题的，会出现乱码

####### 乱码的产生

*  例如当我们限定每次读取的Buffer 的长度是11 的话，有的字体会出现一些乱码的问题。因为中文在 UTF-8 下面占用的字节是3个字节。所以第四个字肯定会出现问题[因为本来是三个buffer的现在第四个字变成一个buffer了]

###### 如何修复这个中文乱码的问题
* setEncoding() && string_decoder()
* 该方法的作用是让data 事件传递的不再试一个 Buffer 对象，而是编码后的字符串。这样的输出就是正常的中文，但是它目前只支持UTF-8 Base64 和 UCS-2/UTF-16LE 这三种编码
<pre>
	var rs = fs.createReadStream("test.md",{highWaterMark:11});
	rs.setEncoding("utf8");
</pre>

###### 正确拼接Buffer
* 就是用数组存储接受到的所有的buffer 片段，然后调用 Buffer.concat()方法生成一个合并Buffer 的对象








