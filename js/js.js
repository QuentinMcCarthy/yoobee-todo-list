/*
Pseudocode
Initialise an object with all the relevant variables and methods
Some variables and methods the object will contain are:
An empty array
A write method which will toggle between allowing users to write in the input
And sending the input data into the array
A delete method
Which will remove the item from the DOM and array
A tick method
Which will toggle the tick icon between tick and unticked
Inside a document ready will be three click events
One for the writeButton id that fires the write method in the object
One for the delButton id that fires the delete method in the object
One for the tickBox class that fires the tick method in the object
*/

var todoList = {
	list: [],
	initEvents:function(tick,write,del){
		$(tick).click(function(){
			todoList.tickToggle(this);
		});

		$(write).click(function(){
			todoList.write(this);
		});

		$(del).click(function(){
			todoList.delete(this)
		});
	},
	write:function(el){
		var itemNum = $(el).attr("data-item");
		var input = $("#input"+itemNum)
		var inputVal = $(input).val();
		var isWriting = $(el).attr("data-writing");

		if(isWriting == "true"){
			if(inputVal != ""){
				console.log(typeof todoList.list[itemNum]);
				if(typeof todoList.list[itemNum] != "undefined"){
					todoList.list[itemNum] = inputVal;
				}
				else{
					todoList.list.push(inputVal);

					if((todoList.list.length - 1) == itemNum){
						var newId = (todoList.list.length);

						var newItem = document.createElement("li");

						$("#todo-list").append(newItem);

						$(newItem).attr("class","dataItem"+newId);

						var newTickPos = document.createElement("div");

						$(newItem).append(newTickPos);

						$(newTickPos).attr("class","tickBoxPos");

						var newTickBox = document.createElement("div");

						$(newTickPos).append(newTickBox);

						$(newTickBox).attr("class","tickBox");
						$(newTickBox).attr("data-item",newId);

						var newIcon = document.createElement("i");

						$(newTickBox).append(newIcon);

						$(newIcon).attr("class","far fa-square");

						newIcon = document.createElement("i");

						$(newTickBox).append(newIcon);

						$(newIcon).attr("class","fas fa-check");

						var newInputDiv = document.createElement("div");

						$(newItem).append(newInputDiv);

						$(newInputDiv).attr("class","d-inline-block w-86");

						var newInput = document.createElement("input");

						$(newInputDiv).append(newInput);

						$(newInput).attr("id","input"+newId);
						$(newInput).attr("class","w-100");
						$(newInput).attr("type","text");
						$(newInput).attr("placeholder","Click the write button to write");
						$(newInput).prop("disabled",true);

						var newControlDiv = document.createElement("div");

						$(newItem).append(newControlDiv);

						$(newControlDiv).attr("class","d-inline-block border bg-white float-right w-13 li-controls");

						var newWriteDiv = document.createElement("div");

						$(newControlDiv).append(newWriteDiv);

						$(newWriteDiv).attr("class","p-1 ml-1 d-inline-block writeButton");
						$(newWriteDiv).attr("data-item",newId);
						$(newWriteDiv).attr("data-writing","false");

						newIcon = document.createElement("i");

						$(newWriteDiv).append(newIcon);

						$(newIcon).attr("class","fas fa-edit");

						var newDelDiv = document.createElement("div");

						$(newControlDiv).append(newDelDiv);

						$(newDelDiv).attr("class","p-1 d-inline-block delButton");
						$(newDelDiv).attr("data-item",newId);

						newIcon = document.createElement("i");

						$(newDelDiv).append(newIcon);

						$(newIcon).attr("class","fas fa-trash");

						todoList.initEvents(newTickBox,newWriteDiv,newDelDiv);
					}
				}
			}

			input.prop("disabled",true);
			$(el).attr("data-writing","false");
			$(el).removeClass("writing");
		}
		else{
			$(input).prop("disabled",false);
			$(el).attr("data-writing","true");
			$(el).addClass("writing");
			$(input).focus()
		}
	},
	delete:function(el){
		if((todoList.list.length - 1) != 0){
			var itemNum = $(el).attr("data-item");

			$("dataItem"+itemNum).remove();
		}
	},
	tickToggle:function(el){
		var tick = $(el).find(".fa-check");

		var tickDisplay = tick.css("display");

		if(tickDisplay == "none"){
			tick.css("display","block");
		}
		else{
			tick.css("display","none");
		}
	}
}


$(document).ready(function(){
	todoList.initEvents($(".tickBox"),$(".writeButton"),$(".delButton"));
});
