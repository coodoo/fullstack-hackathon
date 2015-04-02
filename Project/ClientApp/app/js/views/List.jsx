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
		
		selectedItem: React.PropTypes.object,
		
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
		var selectedItem = this.props.truth.selectedItem;
		
		// 跑 loop 一筆筆建成 ListItem 元件
		var arr = arrTodos.map(function (item) {

			var todo = item;

			// 注意每個 item 要有一個獨一無二的 key 值
			return <ListItem

			todoItem = {todo}
			selected = {selectedItem == todo}
			key = {todo.id}
			onClick = {this.props.onClick.bind(this, item)}
			onRemove = {this.props.onRemove.bind(this, item)}
			/>

		}, this);
		
    return (

      <div className="todo-list">
          {arr}
      </div>
    );

  },

  noop: function(){  }
});

module.exports = comp;
