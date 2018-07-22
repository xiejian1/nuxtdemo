<template>
	<div>
		<div class="head">
			<a class="nav">这是blog导航</a>
			<h1>你好！欢迎来到测试</h1>
		</div>
        <nuxt/>
        <div>
        	<p class="footer">这是页面的尾部</p>
        </div>
	</div>
</template>
<style type="text/css">
    .head {
    	text-align: center;
    }
    .head .nav{
    	background-color: #abc;
    	color: green;
    }
	.footer{
       text-align: center;
       font-size: 18px;
       color: red;
	}
</style>