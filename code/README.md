## 重点

### Node 文件系统

node.js 提供一组类似 UNIX(POSIX) 标准的文件操作API. 

调用该文件操作 API ： <code>var fs = require("fs")</code>

###### 异步 && 同步：

1. 异步的 ： <code>fs.readFile()</code>
2. 同步的 ： <code>fs.readfileSync()</code>
	
	
###### 打开文件：
* fs.open(path, flags [,mode], callback);
	* path -- 文件的路径
	* flags -- 文件打开的行为
		* 参数很多：
			1. r : 只读模式，文件不存在时候抛出异常
			2. r+: 读写模式，文件不存在时候抛出异常
			3. rs: 同步的方式读取文件
			4. rs+: 同步的方式读写文件
			5. w: 以写入的模式打开文件，文件不存在则创建
			6. wx: 同上，但是如果文件路径存在，则文件写入失败
			7. wx+: 类似“w+“: 但是如果文件路径存在则读写失败
			8. a: 以追加的模式打开文件，文件不存在则创建
			9. ax: 类似 “a” 如果文件李静存在则追加失败
			10. a+: 以读取模式打开文件，文件不存在则创建
			11. ax+: 类似“a+” 但是文件路径存在的，则文件读取追加失败
				
	* mode: 设置文件的权限，【默认为: 0666 -- 可读可写】
	* callback: 回调函数, 带两个参数: err, fd

###### 获取文件信息

* fs.stat(path, callback);
	* path -- 文件路径
		* 可以是相对路径也可以是绝对路径
	* callback -- 回调函数。带有两个参数：err && stats
		* stats: 是一个类，里面包含了许多判断文件的方法
		* 调用的方法返回的是一个 boolean 值
		
###### 写入文件
* fs.writeFile(filename,data[, options], callback)

	* **如果文件存在，该方法写入的内容会覆盖掉旧的文件**
	* path -- 文件路径
	* data -- 要写入的文件数据
	* options --该参数是一个对象包含{encoding, mode, falg}. 【默认编码:utf8, 模式:0666, flag:"w" 】
	* callback -- 回调函数，写入失败时候返回
	

###### 读取文件

* fs. read(fd, buffer, offset, length, position, callback);

	* fd -- 通过fs.open() 方法返回的文件描述符
	* buffder -- 数据写入缓冲区
	* offset -- 缓冲区写入的写入偏移量
	* length --- 要从文件中读取的字节数
	* position -- 文件读取的起始位置，如果为null, 则会从当前文件指针位置读取
	* callback -- 回调函数
		* err / bytesRead / buffer 
		
###### 关闭文件

* fs.close(fd,callback);

	* fd -- 通过 fs.open() 方法 返回的文件描述符
	* callback -- 回调函数 没有参数
	
###### 截取文件
* fs.ftruncate(fd, len, callback);
	* fd -- 通过fs.open()方法返回的文件描述符
	* len -- 文件内容截取的长度
	* callback -- 回调函数, 没有参数
	
###### 删除文件
* fs.unlink(path, callback);
	* path -- 文件路径
	* callback -- 回调函数 没有参数
	
###### 创建目录

* fs.mkdir(path[,mode],callback)

	* path -- 文件路径
	* mode -- 设置目录的权限 默认为0777
	* callback -- 回调函数 没有参数
	
###### 读取目录
* fs.readdir(path, callback);

	* path -- 文件路径
	* callback -- 回调函数, 
		* err -- 错误信息
		* files -- 目录下的文件数组列表
		
###### 删除目录
* fs.rmdir(path, callback)

	* path -- 文件路径
	* callback -- 回调函数，没有参数
	




		
	


	
	
	
		
		
		
		
		
		
		
		
		
	

