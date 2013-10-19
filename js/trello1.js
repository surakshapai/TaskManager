var lists = new Array();



var List = function(i){
	this.id = "list" + i;
	this.createList(i);
	this.addBtn;
	this.cards = new Array();
}



List.prototype = {
	
	
	createList : function(i){	

		lists.push(this);
		this.listRenderer(i);
		this.addBtn = document.getElementById('add' + this.id);
		this.addBtn.addEventListener('click', this.renderCardHtml);

	},

	listRenderer : function(i){
		var divID = "div" + i;
		var addID = "add" + i;
		
		var div = document.createElement('div');
		div.id = divID;
		div.className = "mainDiv span5";

		var listTitle = document.createElement('input');
		listTitle.type = "text";
		listTitle.className = "titleName";
		listTitle.placeholder = "Add tiltle to the list";


		var ul = document.createElement('ul');
		ul.id = 'ListUl' + i;


		var addDiv = document.createElement('div');
		var adBtn = document.createElement('button');
		adBtn.id = "add" + this.id;
		adBtn.className = 'addTask';
		adBtn.innerHTML = "Add a card";
		this.addButton = adBtn;

		addDiv.appendChild(adBtn);
		
		div.appendChild(listTitle);
		div.appendChild(ul);
		div.appendChild(addDiv);


		var row = document.getElementById('rowSpan');

		row.appendChild(div);	
	
	}, 

	renderCardHtml : function(e){
		this.style.visibility = 'hidden';
		var currentListId = this.id.substr(7);
		
		var ul = document.getElementById('ListUl' + currentListId);
		

		var li = document.createElement('li');
		
		var ListInput = document.createElement('textarea');
		ListInput.className = "listInputBox";

		var listDeleteBtn = document.createElement('button');
		listDeleteBtn.className = 'btn btn-success deleteBtn';
		var textBtn = document.createElement('div');
		listDeleteBtn.appendChild(textBtn);
		listDeleteBtn.innerHTML = '✓';
		

		var addBtn = document.createElement('button');
		addBtn.className = "btn btn-primary";
		addBtn.innerHTML = 'Add';

		addBtn.addEventListener('click', function(e){
			
			
			var task = ListInput.value;
			 var id = (lists[currentListId].cards.length);
			 var card = new Card(id,task);			 
			 lists[currentListId].cards.push(card);

			 listDeleteBtn.id = currentListId + "-" + id;

			 ul.removeChild(li);

			 var outPut = document.createElement('input');
			 outPut.type = "text";
			 outPut.value = task;
			 outPut.id = "input-"+currentListId+"-"+id;
			 outPut.className = "shownTask";
			
			 outPut.addEventListener('blur', function(e){			 	
			 	var listId = e.target.id.split("-")[1];
				var cardId = e.target.id.split("-")[2];
				var newTask = e.target.value;

				var cardIds = new Array();
				for(var i =0; i < lists[listId].cards.length; i++){
					cardIds.push(lists[listId].cards[i].id+"");
				}

				var editId = cardIds.indexOf(cardId);
				lists[listId].cards[editId].task = newTask;
				console.log(lists[listId].cards);
			 });
			 


			 var outPutLi = document.createElement('li');
			 outPutLi.id = "card" + currentListId + "-" + id;
			 
			 outPutLi.appendChild(outPut);

			 outPutLi.appendChild(listDeleteBtn);
			 ul.appendChild(outPutLi);

			 addHidden.style.visibility = 'visible';
			 

		});

		listDeleteBtn.addEventListener('click', function(e){
			var listId = e.target.id.split("-")[0];
			var cardId = e.target.id.split("-")[1];
			console.log(cardId);
			

			var itemToRemove = document.getElementById("card" + listId + "-" + cardId);
			ul.removeChild(itemToRemove);

			var cardIds = new Array();
			for(var i =0; i < lists[listId].cards.length; i++){
				cardIds.push(lists[listId].cards[i].id+"");
			}
		
			var indexToRemove = cardIds.indexOf(cardId);
			console.log(indexToRemove);
			lists[listId].cards.splice(indexToRemove, 1);
			console.log(lists[listId].cards);			

		});

		var deleteBtn = document.createElement('button');
		deleteBtn.className = 'btn btn-danger';
		deleteBtn.innerHTML = 'Close';

		var addHidden = this;

		deleteBtn.addEventListener('click', function(e){
			addHidden.style.visibility = 'visible';
			ul.removeChild(li);
		})

		ul.appendChild(li);
		li.appendChild(ListInput);
		li.appendChild(addBtn);
		li.appendChild(deleteBtn);

		

	}



}

var Card = function(id, task){
	this.id = id;
	this.task = task;
}

for(var i=0; i < 3; i++){
		var list = new List(i);
	}

var addNewList = document.getElementById('addNewList');


addNewList.addEventListener('click',function(){
	var newList = new List(lists.length);
});