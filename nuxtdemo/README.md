# nuxtdemo

> nuxt框架基础学习

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
>资料记录
>页面之间的路由跳转router
>
>导入路由组件
>npm install vue-router 
><router.link :to=''>
>编程式导航
>1、调用this.$router.push({path:'/pages/first'})
>字符串 this.$router.push('/home/first')
>对象 this.$router.push({path:'/home/first'})
>命名的路由 this.$router.push({name:'home',params:{userId:wise}})
> 带查询参数，变成 /register?plan=private
>router.push({ path: 'register', query: { plan: 'private' }})
>const userId = 123
>router.push({ name: 'user', params: { userId }}) // -> /user/123
>router.push({ path: `/user/${userId}` }) // -> /user/123
> 这里的 params 不生效
>router.push({ path: '/user', params: { userId }}) // -> /user



>router.go() 传入一个参数，前进或者是后退
>router.replace(localtion,onComplete?,onAbort?)

>async/await 异步处理,发送异步请求，从服务器端获取数据
>用function().then(result=>{
	
})进行执行
>内部抛出错误  function().catch(err=>{
	
})

await是等待的意思，那么它等待什么呢，它后面跟着什么呢？其实它后面可以放任何表达式，不过我们更多的是放一个返回promise 对象的表达式。注意await 关键字只能放到async 函数里面

　　现在写一个函数，让它返回promise 对象，该函数的作用是2s 之后让数值乘以2
复制代码

// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000);
    } )
}
复制代码
　　现在再写一个async 函数，从而可以使用await 关键字， await 后面放置的就是返回promise对象的一个表达式，所以它后面可以写上 doubleAfter2seconds 函数的调用
async function testResult() {
    let result = await doubleAfter2seconds(30);
    console.log(result);
}
　　现在调用testResult 函数
testResult();
　　打开控制台，2s 之后，输出了60. 
　　现在我们看看代码的执行过程，调用testResult 函数，它里面遇到了await, await 表示等一下，代码就暂停到这里，不再向下执行了，它等什么呢？等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它继续向下执行。具体到 我们的代码, 遇到await 之后，代码就暂停执行了， 等待doubleAfter2seconds(30) 执行完毕，doubleAfter2seconds(30) 返回的promise 开始执行，2秒 之后，promise resolve 了， 并返回了值为60， 这时await 才拿到返回值60， 然后赋值给result， 暂停结束，代码才开始继续执行，执行 console.log语句。

>异常处理
现在就还差一点需要说明，那就是怎么处理异常，如果请求发生异常，怎么处理？ 它用的是try/catch 来捕获异常，把await 放到 try 中进行执行，如有异常，就使用catch 进行处理。


>middleware中间件
>所有的中间件都必须放置在middleware/目录下。文件名将作为中间件的名称（如：middleware/auth将成为中间件auth）。
中间件收到上下文作为第一个参数︰

export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
中间件将按照此顺序在序列中执行：

    nuxt.config.js

    匹配的布局

    匹配的页面

中间件可以是异步的，仅返回一个Promise或者使用第二个callback返回值：
middleware/stats.js

import axios from 'axios'

export default function ({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}

然后，在nuxt.config.js，布局或者页面中，配置middleware参数
nuxt.config.js
module.exports = {
  router: {
    middleware: 'stats'
  }  
}





>>>>>>'=>'箭头函数 闭包函数 ()=>{
  
}