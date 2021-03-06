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

// Object-model syntax for app
var todoList = {
	list: [],
	ticker:null,
	initEvents:function(tick,write,del){
		// Click events, init func for DOM, inputs are which elements the events tie into
		$(tick).click(function(){
			todoList.tickToggle(this);
		});

		$(write).click(function(){
			todoList.write(this);
		});

		$(del).click(function(){
			todoList.delete(this);
		});
	},
	write:function(el){
		var itemNum = $(el).attr("data-item");
		var input = $("#input"+itemNum)
		var inputVal = $(input).val();
		var isWriting = $(el).attr("data-writing");
		var valChanged = false;

		// If the DOM says the user is currently in writing mode
		if(isWriting == "true"){
			// If the input is not empty
			if(inputVal != ""){
				// If the list item exists
				if(typeof todoList.list[itemNum] != "undefined"){
					// If the value has changed
					if(todoList.list[itemNum] !== inputVal){
						// Change the value in the array
						todoList.list[itemNum] = inputVal;

						valChanged = true;
					}
				}
				else{
					// Otherwise push to the array
					todoList.list.push(inputVal);

					valChanged = true;

					// If the called item is the max array index
					if((todoList.list.length - 1) == itemNum){
						// Var for the ID for the newly created input
						// The new ID is the array length, as the array length is the max index + 1
						var newId = (todoList.list.length);

						// Create the list item element
						var newItem = document.createElement("li");

						$("#todo-list").append(newItem);

						$(newItem).attr("id","dataItem"+newId);

						// Create the div that positions the tickbox
						var newTickPos = document.createElement("div");

						$(newItem).append(newTickPos);

						$(newTickPos).attr("class","tickBoxPos");

						// Create the div that holds the tickbox
						var newTickBox = document.createElement("div");

						$(newTickPos).append(newTickBox);

						$(newTickBox).attr("class","tickBox");
						$(newTickBox).attr("data-item",newId);

						// Create the tickbox's box icon
						var newIcon = document.createElement("i");

						$(newTickBox).append(newIcon);

						$(newIcon).attr("class","far fa-square");

						// Create the tickbox's tick icon
						// newIcon var re-used as it is not needed to be kept
						newIcon = document.createElement("i");

						$(newTickBox).append(newIcon);

						$(newIcon).attr("class","fas fa-check");

						// Create the div that holds the timestamp
						var newTimestampDiv = document.createElement("div");

						$(newItem).append(newTimestampDiv);

						$(newTimestampDiv).attr("id","timestamp"+newId);
						$(newTimestampDiv).attr("class","d-inline-block timestamps");

						// Create the p element for the timestamp
						var newTimestamp = document.createElement("p");

						$(newTimestampDiv).append(newTimestamp);

						$(newTimestamp).text("00:00:00");

						// Create the div that holds the input
						var newInputDiv = document.createElement("div");

						$(newItem).append(newInputDiv);

						$(newInputDiv).attr("class","d-inline-block inputWidth");

						// Create the input
						var newInput = document.createElement("input");

						$(newInputDiv).append(newInput);

						$(newInput).attr("id","input"+newId);
						$(newInput).attr("class","w-100");
						$(newInput).attr("type","text");
						$(newInput).attr("placeholder","Click the write button to write");
						$(newInput).attr("data-value","");
						$(newInput).prop("disabled",true);

						// Create the div that holds the controls
						var newControlDiv = document.createElement("div");

						$(newItem).append(newControlDiv);

						$(newControlDiv).attr("class","d-inline-block border bg-white float-right w-13 li-controls");

						// Create the div that is the write button
						var newWriteDiv = document.createElement("div");

						$(newControlDiv).append(newWriteDiv);

						$(newWriteDiv).attr("class","p-1 ml-1 d-inline-block writeButton");
						$(newWriteDiv).attr("data-item",newId);
						$(newWriteDiv).attr("data-writing","false");

						// Create the write icon
						// newIcon var re-used as it is not needed to be kept
						newIcon = document.createElement("i");

						$(newWriteDiv).append(newIcon);

						$(newIcon).attr("class","fas fa-edit");

						// Create the div that is the delete button
						var newDelDiv = document.createElement("div");

						$(newControlDiv).append(newDelDiv);

						$(newDelDiv).attr("class","p-1 ml-1 d-inline-block delButton");
						$(newDelDiv).attr("data-item",newId);

						// Create the delete icon
						// newIcon var re-used as it is not needed to be kept
						newIcon = document.createElement("i");

						$(newDelDiv).append(newIcon);

						$(newIcon).attr("class","fas fa-trash");

						todoList.initEvents(newTickBox,newWriteDiv,newDelDiv);
					}
				}
			}

			// Keep track of the input's value in the DOM
			$("#input"+itemNum).attr("data-value",inputVal);

			if(valChanged){
				$("#timestamp"+itemNum+" p").text(todoList.getCurrentTime());
			}

			// Set the attributes of the elements to turn off writing mode
			input.prop("disabled",true);
			$(el).attr("data-writing","false");
			$(el).removeClass("writing");
		}
		else{
			// Else turn on writing mode
			$(input).prop("disabled",false);
			$(el).attr("data-writing","true");
			$(el).addClass("writing");
			$(input).focus()
		}
	},
	delete:function(el){
		// The array's max index has to be greater than 0 to be able to delete items
		// If this wasn't the case, the inputs could be deleted
		// Breaking the app
		if((todoList.list.length - 1) >= 0){
			var itemNum = $(el).attr("data-item");

			// The array's max index has to be greater than the given item number
			// If this wasn't the case, the inputs could be deleted
			// Breaking the app
			if((todoList.list.length) > itemNum){
				$("#dataItem"+itemNum).remove();

				// The for loop sets all the classes id's and data-items of the elements
				// Above the one deleted down one index.
				var i;
				for(i = itemNum; i < (todoList.list.length + 1); i++){
					$("#dataItem"+i).attr("id","dataItem"+(i-1));
					$("#timestamp"+i).attr("id","timestamp"+(i-1));
					$("#input"+i).attr("id","input"+(i-1));
					$(".writeButton[data-item='"+i+"']").attr("data-item",(i-1));
					$(".delButton[data-item='"+i+"']").attr("data-item",(i-1));
				}

				// The item has to be removed at the end, as the for loop uses the
				// Max length of the array as a reference.
				todoList.list.splice(itemNum, 1);
			}
		}
	},
	tickToggle:function(el){
		// This function just toggles the visibility of the check
		// In the tickbox
		var tick = $(el).find(".fa-check");

		var tickDisplay = tick.css("display");

		if(tickDisplay == "none"){
			tick.css("display","block");
		}
		else{
			tick.css("display","none");
		}
	},
	getCurrentTime:function(){
		var dateData = new Date();

		var splitNum;

		var hour = dateData.getHours();
		var minute = dateData.getMinutes();

		// Turn the number into a string and split it into individual parts
		splitNum = minute.toString().split("");

		// If the split number turned string has less than 2 items
		if(splitNum.length < 2){
			// Add a 0 at the start
			splitNum.splice(0,0,0);

			// Put it in the variable
			minute = splitNum[0]+splitNum[1];
		}

		var second = dateData.getSeconds();

		// Turn the number into a string and split it into individual parts
		splitNum = second.toString().split("");

		// If the split number turned string has less than 2 items
		if(splitNum.length < 2){
			// Add a 0 at the start
			splitNum.splice(0,0,0);

			// Put it in the variable
			second = splitNum[0]+splitNum[1];
		}

		var time = hour+":"+minute+":"+second;

		return time;
	},
	everySecond:function(){
		$("#time p").text(todoList.getCurrentTime());
	}
}


$(document).ready(function(){
	// First initialisation of DOM elements in a docready
	todoList.initEvents($(".tickBox"),$(".writeButton"),$(".delButton"));

	todoList.ticker = setInterval(todoList.everySecond, 1000);
});
