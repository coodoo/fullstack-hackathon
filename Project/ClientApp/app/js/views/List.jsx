/**
 *
 */


var ListItem = React.createFactory(require('./ListItem.jsx'));

//
var comp = React.createClass({
	
	propTypes: {

		todo: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      memo: React.PropTypes.number
    }),
		
		// callbacks
    onClick: React.PropTypes.func,
    onRemove: React.PropTypes.func,
	},
  /**
   *
   */
  render: function() {

    // 取出所有要繪製的資料
    var arrTodos = this.props.truth.arrTodos;
// 跑 loop 一筆筆建成 ListItem 元件
		var arr = arrTodos.map(function (item) {

			var todo = item;
			var onClick = this.props.onClick.bind(this, item);
			var onRemove = this.props.onRemove;

			// 注意每個 item 要有一個獨一無二的 key 值
			return <ListItem

			todoItem = {todo}
			selected = {this.props.truth.selectedItem == todo}
			key = {todo.id}
			onClick = {onClick}
			onRemove = {onRemove}
			/>

}, this);
    return (

      <div className="todo-list">
          {arr}
      </div>
    );

  },

  /**
   *
   */
//  handleClick: function( item ){
//      console.log( '\n\nitem click: ', item.name );
//      actions.selectTodo(item);
//  },
//
//  /**
//   *
//   */
//  handleRemove: function( item ){
//      console.log( '\n\nitem remove: ', item.name );
//      actions.removeTodo(item);
//  },

  //
  noop: function(){

  }

});

module.exports = comp;
