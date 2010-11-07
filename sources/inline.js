//script autocompletion
$(document).ready(function() {

    function findValueCallback(event, data, formatted) {
        $("#QuickSearchForm").submit();

    }

    $("img").lazyload();

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
            "text":function() {
                return $("#Fnac_Search").val();
            },
            "category": function() {
                var rex = new RegExp("!1$");
                var cat = $("#SCat").val().replace(rex,'');
                return cat;
            },
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

    // Offres MarketPlace
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
        
    $("#submitbtn").click(function() {
        ChangeContext();
    });

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

$(document).ready(function(){

});
