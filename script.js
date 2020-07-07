var components={
		clientItem:"<a href=\"#\" class=\"w3-bar-item clientItem w3-button w3-padding\"><input type='hidden' class='user-id' value='{{ID}}' /><i class=\"fa fa-users fa-fw\"></i>&nbsp; {{Fullname}}</a>"
	};
	var clients={
		storage:[],
		selected_id:"",
		displayClients: function (){
			w3.http("JSON.txt?r="+escape(Math.random()),function(){
				if(this.readyState==4){
					if(this.status==200){
					var innerHTML="";
						var newStorage=JSON.parse("["+this.responseText.substring(1)+"]");
						if(newStorage.length>clients.storage.length){
							clients.storage=newStorage;
							for(var i=0;i<clients.storage.length;i++){
								innerHTML+=components.clientItem
									.replace("{{ID}}",clients.storage[i].ID)
									.replace("{{Fullname}}",
									clients.storage[i].Name+" "+clients.storage[i].Surname);
							}
							w3.getElements("#user-produce")[0].innerHTML=innerHTML;
							clients.activateClientItems();
							clients.calculateStats();
							clients.reselect();
						}
					}else{
					}
				}
			});
		},
		activateClientItems: function (){
			var clientItems=w3.getElements(".clientItem");
			for(var i=0;i<clientItems.length;i++){
				clientItems[i].addEventListener("click",function(event){
					w3.removeClass(".clientItem","w3-blue");
					w3.addClass(event.target,"w3-blue");
					clients.selected_id=event.target.firstChild.value;
					for(var j=0;j<clients.storage.length;j++){
						if(clients.storage[j].ID==event.target.firstChild.value){
							/*Display values*/
							w3.getElements("#firstname")[0].innerText=clients.storage[j].Name;
							w3.getElements("#lastname")[0].innerText=clients.storage[j].Surname;
							w3.getElements("#id")[0].innerText=clients.storage[j].ID;
							w3.getElements("#mobile")[0].innerText=clients.storage[j].mobile;
							w3.getElements("#address")[0].innerText=clients.storage[j].address;
							w3.getElements("#eye")[0].innerText=((clients.storage[j].eye.toUpperCase()=="Y")?"Yes":"No");
							w3.getElements("#condition")[0].innerText=((clients.storage[j].chronic.toUpperCase()=="Y")?"Yes":"No");
							w3.getElements("#wheelchair")[0].innerText=((clients.storage[j].wheelchair.toUpperCase()=="Y")?"Yes":"No");
						}
					}
					w3_close();
				});
			}
		},
		calculateStats:function(){
			var count_wheelchair=0,count_eye=0,count_chronic=0,count_clients=this.storage.length;
			for(var i=0;i<count_clients;i++){
				((clients.storage[i].wheelchair.toUpperCase()=="Y")?count_wheelchair++:0);
				((clients.storage[i].chronic.toUpperCase()=="Y")?count_chronic++:0);
				((clients.storage[i].eye.toUpperCase()=="Y")?count_eye++:0);
			}
			w3.getElements("#count-wheelchair")[0].innerText=count_wheelchair+"";
			w3.getElements("#count-eye")[0].innerText=count_eye+"";
			w3.getElements("#count-chronic")[0].innerText=count_chronic+"";
			w3.getElements("#count-clients")[0].innerText=count_clients+"";
		},
		reselect: function(){
			for(var j=0;j<clients.storage.length;j++){
				if(clients.storage[j].ID==this.selected_id){
					w3.addClass(w3.getElements(".user-id")[j].parentElement,"w3-blue");
				}
			}
		}
	};
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");
window.onload=function(){
	mySidebar = document.getElementById("mySidebar");
	overlayBg = document.getElementById("myOverlay");
	document.getElementById("btnMenu").onclick=function(){
		w3_open();
	};
	document.getElementById("myOverlay").onclick=function(){
		w3_close();
	};
	setInterval(clients.displayClients,1000);
};

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}