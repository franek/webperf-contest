//script autocompletion
			$(document).ready(function() {

				function findValueCallback(event, data, formatted) {
					$("#QuickSearchForm").submit();

				}

				$("#SCat").change( function() {
				      $("#Fnac_Search").flushCache();
				   var ComboVal = $("#SCat").val();
				   if(ComboVal == "ebook")
				   {
				      $("#ebook").val("true");  
				   }
				});

				$("#Fnac_Search").autocomplete("http://autocompletion.fnac.com/search-autocomplete/autocomplete?method=GetCommonSuggest", {

					width: 260,
					selectFirst: false,
					max: 10,
					scrollHeight: 200,
					cacheLength: 0,
					delay: 150,
					dataType: "jsonp",
					highlight: function(value, term) {
						return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
					},
					extraParams: {
								"text":function() { return $("#Fnac_Search").val(); },
								"category": function() { 
								    var rex = new RegExp("!1$");
								    var cat = $("#SCat").val().replace(rex,'');
								    return cat; },
								"encoding": "UTF-8"
					},
					parse: function(data) {
							return $.map(data, function(row) {
								return {
									data: row,
									value: row.sentence,
									result: row.sentence
								}
							});
					},
					formatItem: function(itemResult) {
						return itemResult.sentence;
					}

				});

				$("#Fnac_Search").result(function(event, data, formatted) {
					if (data)
						findValueCallback(event, data, formatted);

				});
			});

$(function () {
	// au passage de la souris sur le lien de l'onglet
	$("#onglets li a").mouseenter(function(){
			//on affiche son megaMenu
            $(this).siblings(".megaMenu").css("display","block");
	}).mouseleave(function(){
			//on cache son megaMenu
            $(this).siblings(".megaMenu").css("display","none");
	});
	//tant que la souris se trouve sur le megaMenu
	$(".megaMenu").mouseenter(function(){
			// il reste affiché
			$(this).css("display","block");
			// et on applique la classe .hover a son lien
			$(this).siblings("a.ongLink").addClass("hover");
	}).mouseleave(function(){
			// il se cache
			$(this).css("display","none");
			// et on retire la classe .hover a son lien
			$(this).siblings("a.ongLink").removeClass("hover");
	});
	// et On empêche le navigateur de suivre le lien
	return false;

});

function ChangeContext()
{
var context =  $("#ebook").val();
var val = $("#SCat").val();
if(val == "ebook")
{
$("#SCat").val("book");
}
else
{
$("#ebook").val("false");
} 

}
function checkKey()
    {
        if (window.event.keyCode == 13)
        {
            ChangeContext();
        }
    }


//--------------------------------------------------------------------------------------//
			//                  Gestion de la navigation
//--------------------------------------------------------------------------------------//
			//Au passage à une autre page on sauvegarde l'état du player dans les cookies --%>
			window.onbeforeunload = updatePlayerCookies;
			//---------------------------------------------------//
			//              Gestion des cookies
			//----------------------------------------------------//
			//Lecture des cookies --%>
			function GetPlayerCookie (name) 
			{
	
	            var arg=name+"=";
	            var alen=arg.length;
	            var clen=document.cookie.length;
	            var i=0;
	            while (i<clen) 
	            {
		            var j=i+alen;
		            if (document.cookie.substring(i, j)==arg)
                        return getPlayerCookieVal (j);
                    i=document.cookie.indexOf(" ",i)+1;
                    if (i==0) 
                        break;
               }
	            return -1;
            }
            function getPlayerCookieVal(offset) 
            {
	            var endstr=document.cookie.indexOf (";", offset);
	            if (endstr==-1)
      		        endstr=document.cookie.length;
	            return unescape(document.cookie.substring(offset, endstr));
            }

			//Mettre à jour les cookies --%>
			function updatePlayerCookies()
			{
			   
			    var Player =  GetPlayerCookie("Player");
			    var PlayerPlaying = GetPlayerCookie("PlayerPlaying");
			  //Player est ouvert  --%>
			    
			    if(StreamPlayer)
			    {
			        
			         if(StreamPlayer.closed == false)
			            SetPlayerCookie("Player",1,0);
			         else
			            SetPlayerCookie("Player",0,0);
			       //Player en lecture:ce flag n"est pas utilisé pour l'instant mais ça peut étre utile :)  --%>
			         if(onPlayFlag)
			         SetPlayerCookie("PlayerPlaying",1,0);
			        else
			         SetPlayerCookie("PlayerPlaying",0,0);
			  
			    }
			    else
			    {
			          
			          if(Player<=0)
			            SetPlayerCookie("Player",0,0);
			          else
			            SetPlayerCookie("Player",1,0);
			        if(PlayerPlaying<=0)
			            SetPlayerCookie("PlayerPlaying",0,0);
			        else
			            SetPlayerCookie("PlayerPlaying",1,0);
			    }
			     
			}

        function SetPlayerCookie (name,value,expires) 
        {
            
            var domain= document.domain;
            var path = '/';
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (expires * 24 * 3600 * 1000));
//            document.cookie = name + "=" + escape(value) +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "");
    
        }
	//---------------------------------------------------------------------//		


	function PopupLibre(theURL, Largeur, Hauteur) {
		window.open(theURL,'diaporama','toolbar=auto,location=no,menubar=no,status=no,scrollbars=yes,resizable=yes,top=0,left=0,width='+Largeur+',height='+Hauteur);
		return false;
	}
       function switcherBandeau(id){
         m = document.getElementById("bandeauTournantImages");
         l = m.getElementsByTagName("img");
         for (var i = 0; i < l.length; i++)
         {
           l[i].style.display = "none";
           if (l[i].id==id)
           {
             l[i].style.display = "block";
           }
         }
       }


	var nbBanner = 3;
	var idSuivant;
	var puce;
	var monTimer
	function demarreRotation() {
		afficheBanner("visu_banner_0","rotationOk");
	}

	function afficheBanner(idSolde,rotationSolde) {
		var divImgCible;
		puce = parseInt(idSolde.substring(12));
		idSuivant = puce + 1;
		if(idSuivant >= nbBanner) idSuivant = 0;
		var spanPuceCible = document.getElementById("puce_"+puce);
		for (var i=0;i<nbBanner;i++) {
			var allDivs = document.getElementById("visu_banner_"+i);
			allDivs.style.display = "none";
			divImgCible = document.getElementById(idSolde);
			divImgCible.style.display = "block";
			var allPuces = document.getElementById("puce_"+i);
			allPuces.className = allPuces.className.replace(/active/,"");
			if(!/active/.test(spanPuceCible.className))
				spanPuceCible.className += " active";
		}
		if (rotationSolde == "rotationOk") {
			monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",3500); // 2000
		}
		else {
			clearTimeout(monTimer);
			monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",10000); //10000
		}
	}

	// Bidouille pour lancer au chargement et en même temps
	// éviter les collisions avec le onload qui traine dans le body
	if (typeof window.addEventListener != 'undefined') {	//.. gecko, safari, konqueror and standard
		window.addEventListener('load', demarreRotation, false);
	}
	else if (typeof document.addEventListener != 'undefined') {	//.. opera 7
		document.addEventListener('load', demarreRotation, false);
	}
	else if (typeof window.attachEvent != 'undefined') {	//.. win/ie
		window.attachEvent('onload', demarreRotation);
	}
	$(document).ready(function(){
		for(var x=0;x<nbBanner;x++){
			$("#puce_"+x).click(function(e){
				e.preventDefault();
				var index = $(e.target).attr("id");
				index = index.substring(5);
				clearTimeout(monTimer);
				afficheBanner('visu_banner_'+index,'rotationOk');
			});
		}
	});

// Offres MarketPlace
$(document).ready(function(){
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2913782&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique2_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2990502&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Offre-adherents3_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2913807&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique4_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2990541&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Offre-speciale5_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2990529&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique6_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2805733&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Coup-de-coeur7_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2989706&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Meilleures-ventes8_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=3002564&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Meilleures-ventes9_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2779374&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Meilleures-ventes10_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2990550&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Meilleures-ventes11_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2911351&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Meilleures-ventes12_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=3101560&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique13_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2913774&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique14_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2760081&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique15_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2990514&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique16_MP").innerHTML = data.MarketPlaceSummary;
							});
					$.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID=2989754&Ref=FnacDirect&tagmode=any&format=json&jsoncallback=?", 					
					 function(data){
								document.getElementById("Classique17_MP").innerHTML = data.MarketPlaceSummary;
							});
					});						
