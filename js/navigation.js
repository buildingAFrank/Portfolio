$().ready(function(){

$(".item-menu__accueil").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__apercu").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__design").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__audio-visuel").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__jeux").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__prototype").hover(function(event){onHover(event);},function(event){offHover(event);})

$(".item-menu__contact").hover(function(event){onHover(event);},function(event){offHover(event);})

})


function onHover(itemMenu){
    $(itemMenu.currentTarget).find($(".tophalf")).transition({perspective:'1000px',rotateX:'-90deg',duration:150}, function(){$(this).addClass('hover-item')});
    $(itemMenu.currentTarget).find($(".tophalf__back")).addClass('hover-item');
    $(itemMenu.currentTarget).find($(".bottomhalf__back")).transition({perspective:'1000px',rotateX:'0deg',duration:150,delay:150}).addClass('hover-item');
}

function offHover(itemMenu){
    $(itemMenu.currentTarget).find($(".bottomhalf")).addClass('hover-item');
    $(itemMenu.currentTarget).find($(".tophalf__back")).removeClass('hover-item');
    $(itemMenu.currentTarget).find($(".tophalf")).removeAttr('style').transition({perspective:'1000px',rotateX:'-90deg',duration:150}, function(){$(this).removeAttr('style').removeClass('hover-item')});
    $(itemMenu.currentTarget).find($(".bottomhalf__back")).removeClass('hover-item').removeAttr('style').transition({perspective:'1000px',rotateX:'0deg',duration:150,delay:150}, function(){$(this).removeAttr('style');$(itemMenu.currentTarget).find($(".bottomhalf, .bottomhalf__back, .tophalf, tophalf__back")).removeClass('hover-item')});
}