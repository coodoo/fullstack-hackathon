

# 範例位置

  - https://github.com/coodoo/fullstack-hackathon


# API 文件

	- http://docs.strongloop.com/display/public/LB/LoopBack

# 其它文件

	- http://apidocs.strongloop.com/

# loopback

	- 安裝 strongloop 套件

		$ npm install -g strongloop


	- 建立專案框架

		$ slc loopback

		$ cd ServerApp

		$ slc loopback:model	// 建立 Todo model 屬性: title, done, memo, created

	- 啟動專案

		$ slc run .	// localhost:3000

	- 使用 API Explorer

		http://localhost:3000/explorer/

	- 測試 API

		// get
		$.ajax('http://localhost:3000/api/todos/1',
		{
			type:"GET",
			success:function(data, status, jqxhr){console.log( 'success: ', data, '\n', status );},
			error:function( xhr, status, errText ){console.log( 'error: ', xhr.responseText );}
		})

		// post
		$.ajax('http://localhost:3000/api/todos/',
		{
			type:"POST",
			data: {title:'jq-1', done: false, memo:'jq-memo-1'},
			success:function(data, status, jqxhr){console.log( 'success: ', data, '\n', status );},
			error:function( xhr, status, errText ){console.log( 'error: ', xhr.responseText );}
		})


	# 操作 before remote hook, after remote hook

		# 覆寫預設的 find
			Document.beforeRemote('find', function(ctx, user, next) {

			- 重點
				- 說明 ctx.args 身上可以取得參數
				- ctx.req 也有東西可用


	# 自定義 remote method:
		- findAll()
		- 宣告 remote method 方式
		- 取參數方式


# mongodb

	- 安裝
		$ brew update && brew install mongo

	- 啟動

		$ mongod --dbpath ~/data/db

	- 設定 data source

		"mongodb_dev": {
		  "name": "mongodb_dev",
		  "connector": "mongodb",
		  "host": "127.0.0.1",
		  "database": "devDB",
		  "username": "",
		  "password": "",
		  "port": 27017,
		  "debug": true
		}

	- 設定 model config

		{
		  "_meta": {
		    "sources": [
		      "../common/models",
		      "./models"
		    ]
		  },
		  "Todo": {
		    "dataSource": "mongodb_dev",
		    "public": true
		  },


# client app

	- 建 symlink 到 /ServerApp/Client 下

	- 開發起手式

		- npm start 的意義
			- 背後跑 gulp 不斷自動 build
			- 產出物放到 /build 下面
			- 再透過 symlink 到 /ServerApp/Client 下

	- 介紹 react 基本概念
		- 一律重繪
		- 元件思維

		- 講義
			- https://github.com/coodoo/react-meetup-1

	- 介紹 flux
		- 單向資料流進入唯一真相
		- 圖
			https://github.com/facebook/flux/blob/master/docs/img/flux-diagram-white-background.png



# 測試整體程式

	- 在 Project/ServerApp/server 下打 slc run .


# vagrant 裝 nodejs, mongo
  - 在 temp/111-box 下
  - 執行 vagrant up 即可
