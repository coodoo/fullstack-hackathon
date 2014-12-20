/**
 *
 */

var actions = require('../actions/AppActionCreator');
var ListItem = React.createFactory(require('./ListItem.jsx'));

//
var comp = React.createClass({

  /**
   *
   */
  render: function() {

    // 取出所有要繪製的資料
    var arrTodos = this.props.truth.arrTodos;

    // 跑 loop 一筆筆建成 ListItem 元件
    var arr = arrTodos.map(function(item){

        // 注意每個 item 要有一個獨一無二的 key 值
        return <ListItem

                todoItem={item}
                selected={this.props.truth.selectedItem == item}
                key={item.id}

                onClick={this.handleClick.bind(this, item)}
                onRemove={this.handleRemove} />

    }, this)

    return (

      <div className="todo-list">
          {arr}
      </div>
    );

  },

  /**
   *
   */
  handleClick: function( item ){
      console.log( '\n\nitem click: ', item.name );
      actions.selectTodo(item);
  },

  /**
   *
   */
  handleRemove: function( item ){
      console.log( '\n\nitem remove: ', item.name );
      actions.removeTodo(item);
  },

  //
  noop: function(){

  }

});

module.exports = comp;
