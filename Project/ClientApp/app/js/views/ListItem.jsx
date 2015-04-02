/**
 *
 */
var actions = require('../actions/AppActionCreator');
var cx = React.addons.classSet;
//
var comp = React.createClass({

  /**
   * 
   */
  componentDidMount: function(){
      this.$input = $(this.getDOMNode()).find('span').first();
      this.$remove = this.$input.next();
  },

	
	propTypes: {

		todoItem: React.PropTypes.shape({
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
    
    var classes = cx({
        'list-item': true,
        'selected': this.props.selected
    });

	
		var todoItem = this.props.todoItem
		
    return (
      
      <div className={classes}
           onMouseOver={this.handleMouseMovement}
           onMouseOut={this.handleMouseMovement}
           onDoubleClick={this.handleDblClick} 
           onClick={this.props.onClick} >
          
          <span>{todoItem.name}</span>
          
          <span className="glyphicon glyphicon-remove right hide" 
                onClick={this.props.onRemove} ></span>

      </div>
    );
  
  },

  /**
   * 
   */
  handleDblClick: function(){
      
      var val = null;

      this.$input.attr('contenteditable', true)//.focus();
      this.setCaret();

      this.$input.on('keydown focusout', function(evt){
          // enter key 或 文字框喪失focus 即認定為退出編輯狀態
          if( evt.keyCode == 13 || evt.type == 'focusout' ){
              
              evt.preventDefault();
              
              // 取得編輯後的新值
              val = this.$input.text();
              
              // 移除 <span> 的編輯能力  
              this.$input.removeAttr('contenteditable');
              this.$input.off('keydown focusout');
              
              // console.log( '新值為: ', val );

              // 準備將新值存入 store，方法一樣是操作 actionCreator
              this.props.todoItem.name = val;
              actions.updateTodo( this.props.todoItem );

          }
      }.bind(this))
  },  

  /**
   * 
   */
  setCaret: function() {
      var el = this.$input[0];
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el.childNodes[0], el.innerText.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
  },


  /**
   * 
   */
  handleMouseMovement: function(evt){
      if( evt.type == 'mouseover'){
          this.$remove.removeClass('hide')
      }else{
          this.$remove.addClass('hide')
      }
  },

  noop: function(){

  }

});

module.exports = comp;