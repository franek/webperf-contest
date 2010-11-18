var FNAC = function() {

    function init()
    {
        marketPlace();
    }

    // Offres MarketPlace
    function marketPlace() {
        var products = [['2913782', 'Classique2_MP'], ['2990502', 'Offre-adherents3_MP'], ['2913807', 'Classique4_MP'],
        ['2990541', 'Offre-speciale5_MP'],['2990529', 'Classique6_MP'],['2805733', 'Coup-de-coeur7_MP'],
        ['2989706', 'Meilleures-ventes8_MP'],['3002564', 'Meilleures-ventes9_MP'],['2779374', 'Meilleures-ventes10_MP'],
        ['2990550', 'Meilleures-ventes11_MP'],['2911351', 'Meilleures-ventes12_MP'],['3101560', 'Classique13_MP'],
        ['2913774', 'Classique14_MP'],['2760081', 'Classique15_MP'],['2990514', 'Classique16_MP'],
        ['2989754', 'Classique17_MP']];
        var nbProducts = products.length;
        for(var i = 0; i<nbProducts; i++)
        {
            callMarketPlace(products[i][0],products[i][1]);
        }
    }

    function callMarketPlace(id, div)
    {
        $.getJSON("http://www4.fnac.com/MarketPlace/SummaryOfferLine.aspx?PRID="+id+"&Ref=FnacDirect&jsoncallback=?", 
        function(data){
            var sel_div;
            sel_div = $('#'+div);
            if (sel_div.length)
            {
                sel_div.html(data.MarketPlaceSummary);
            }
        }
        );
    }

    return {
        init: init
    }
}();

FNAC.init();

//script autocompletion
$(document).ready(function() {

    var cache = {};
    cache.search = $("#Fnac_Search");
    cache.lazy = $("img.lazy");
    cache.scat = $('#SCat');
    cache.quickSearchForm = $('#QuickSearchForm');
    cache.carousel = $("#carroussel");

    /*$(cache.carousel).carousel(
        { direction: "horizontal",
          loop: true,
          pagination : true,
          autoSlide: true,
          autoSlideInterval: 1000,
          paginationPosition : "outside"
        }
    );*/

    // gestion des images
    $(cache.lazy).lazyload();

    // si on change de catégorie, on supprime la recherche
    $(cache.scat).change( function() {
        $(cache.search).flushCache();
        var ComboVal = $(cache.scat).val();
        if(ComboVal == "ebook")
        {
            $("#ebook").val("true");
        }
    });

    $(cache.search).autocomplete("http://autocompletion.fnac.com/search-autocomplete/autocomplete?method=GetCommonSuggest", {

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
                return $(cache.search).val();
            },
            "category": function() {
                var rex = new RegExp("!1$");
                var cat = $(cache.scat).val().replace(rex,'');
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

    $(cache.search).result(function(event, data, formatted) {
        if (data)
            {
                $(cache.quickSearchForm).submit();
            }

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
    $("#ong-* .megaMenu").mouseenter(function(){
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
});

//function switcherBandeau(id){
//    m = document.getElementById("bandeauTournantImages");
//    l = m.getElementsByTagName("img");
//    for (var i = 0; i < l.length; i++)
//    {
//        l[i].style.display = "none";
//        if (l[i].id==id)
//        {
//            l[i].style.display = "block";
//        }
//    }
//}
//
//
//var nbBanner = 3;
//var idSuivant;
//var puce;
//var monTimer
//function demarreRotation() {
//    afficheBanner("visu_banner_0","rotationOk");
//}
//
//function afficheBanner(idSolde,rotationSolde) {
//    var divImgCible;
//    puce = parseInt(idSolde.substring(12));
//    idSuivant = puce + 1;
//    if(idSuivant >= nbBanner) idSuivant = 0;
//    var spanPuceCible = document.getElementById("puce_"+puce);
//    for (var i=0;i<nbBanner;i++) {
//        var allDivs = document.getElementById("visu_banner_"+i);
//        allDivs.style.display = "none";
//        divImgCible = document.getElementById(idSolde);
//        divImgCible.style.display = "block";
//        var allPuces = document.getElementById("puce_"+i);
//        allPuces.className = allPuces.className.replace(/active/,"");
//        if(!/active/.test(spanPuceCible.className))
//            spanPuceCible.className += " active";
//    }
//    if (rotationSolde == "rotationOk") {
//        monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",3500); // 2000
//    }
//    else {
//        clearTimeout(monTimer);
//        monTimer = setTimeout("afficheBanner('visu_banner_'+idSuivant,'rotationOk')",10000); //10000
//    }
//}

// Bidouille pour lancer au chargement et en même temps
// éviter les collisions avec le onload qui traine dans le body
//if (typeof window.addEventListener != 'undefined') {	//.. gecko, safari, konqueror and standard
//    window.addEventListener('load', demarreRotation, false);
//}
//else if (typeof document.addEventListener != 'undefined') {	//.. opera 7
//    document.addEventListener('load', demarreRotation, false);
//}
//else if (typeof window.attachEvent != 'undefined') {	//.. win/ie
//    window.attachEvent('onload', demarreRotation);
//}
//$(document).ready(function(){
//    for(var x=0;x<nbBanner;x++){
//        $("#puce_"+x).click(function(e){
//            e.preventDefault();
//            var index = $(e.target).attr("id");
//            index = index.substring(5);
//            clearTimeout(monTimer);
//            afficheBanner('visu_banner_'+index,'rotationOk');
//        });
//    }
//});
