module.exports = function(Todo) {


    // 各種欄位的預設值
    Todo.definition.properties.created.default = new Date();

    // 等物件完成啟始化後再進行設定工作
    Todo.on('dataSourceAttached', function(obj) {

        // 一切等 dataSource attach 後，再啟動物件的生命週期
        setTimeout(function() {

            setup();

            modelDidAttach();

        }, 0)

    })

    /**
     * 重要：必需觸發 parent class
     */
    function setup() {

        // console.log('Todo 跑了 setup: ');

        // 觸發 parent class
        Todo.base.setup.apply(Todo, arguments);

        // 取得可能會用到的系統物件
        var User = Todo.app.models.User;
        var loopback = Todo.app.loopback;

        // catch all tracker
        // Todo.beforeRemote('*', function(ctx, instance, next) {
        //     console.log( '\n**beforeRemote** \n', require('util').inspect( ctx, false, 0, true), '\n*****' );
        //     next();
        // })

        // before hook
        Todo.beforeRemote('create', function(ctx, instance, next) {

            // console.log( '\nbeforeRemote: \n', require('util').inspect( ctx, false, 1, true) );

            console.log('\n\nctx.args: ', ctx.args.data);

            // 取出用戶傳來的物件
            var obj = ctx.args.data;

            delete obj.id;

            // 在上面新增資料
            // 這些欄位就會傳入 create() 裏被存入 db
            obj.created = new Date();

            // 這個是測試用的
            // obj.foo = new Date();

            // 處理完後控制權交回去
            next();

        });

        // after hook
        Todo.afterRemote('create', function(ctx, instance, next) {

            console.log('\nafterRemote: \n', require('util').inspect(ctx.result, false, 0, true));

            // 準備要返還給用戶的物件
            var result = ctx.result;

            // 可以繼續加料，最後再返還給客戶
            // result.bar = 'tender';

            // 處理完後控制權交回去
            next();

        });

        /**
         * 自定義的 remote method
         */
        Todo.findAll = function(ctx, next) {

            // console.log('[findAll]');

            Todo.find(

              {
                  order: 'created DESC'
              },

              function(err, results) {

                  if (err) return err;

                  console.log( '\nfindAll: \n', require('util').inspect( results, false, 0, true), ' >err: ', err );

                  // 自定義的 remote method 一定要返還內容給客戶端
                  next( null, results );

              })
        }

        // 自定義 method 也可以掛 before/after hook
        Todo.beforeRemote('findAll', function(ctx, inst, next){
            console.log( '\n\t beforeHook :: findAll' );
            next();
        })

        //
        Todo.afterRemote('findAll', function(ctx, inst, next){
            console.log( '\n\t afterHook :: findAll' );
            next();
        })


        // 向系統註冊為 remote method
        // REST end point 為 GET /api/Todo/findAll
        loopback.remoteMethod(

            Todo.findAll,

            {
                description: 'Find all todos',

                accepts: [
                    // 注意 here 這個 argument 有指定從 req.query 裏取值，這是最彈性的地方
                    {
                        http: {
                            source: 'req',
                            required: true,
                            description: 'user Id'
                        }
                    }
                ],

                returns: {
                    arg: 'result',
                    required: true,
                    type: 'Object'
                },

                http: {
                    verb: 'GET',
                    path: '/findAll'
                }
            }
        )



    }

    /**
     *
     */
    function modelDidAttach() {

        // 塞兩筆測試資料進去
        var arr = [
            {
                name: 'dummy item 1',
                done: false,
                memo: 'dummy memo 1'
            },
            {
                name: 'dummy item 2',
                done: true,
                memo: 'dummy memo 2'
            }
        ]

        // 塞入測試資料再撈出來
        Todo.create( arr, function(err, doc) {
            console.log('建立結果: ', doc);

            // Todo.find({}, function(err, doc) {
            //     console.log('撈出: ', doc);
            // })

        })

    }


};
