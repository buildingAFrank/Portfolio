$().ready(function(){
    //menu hover
$(".item-menu__accueil").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__apercu").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__design").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__audio-visuel").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__jeux").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__prototype").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})

$(".item-menu__contact").hover(function(event){flipStart(event,"hover-item","hover-item__bottom",true);},function(event){flipEnd(event,"hover-item","hover-item__bottom",true);})


$(".flipperContainer").hover(function(event){flipStart(event);},function(event){flipEnd(event);})

//menu selection

$(".item-menu__accueil").click(function(event){flipStart(event,"activeMenu","activeMenu__bottom",true);})



})

function stateCheck(itemMenu){
    //if menu is not active, make regular hover animation
    if($(itemMenu.currentTarget).find($(".tophalf")).hasClass("hover-item") || $(itemMenu.currentTarget).find($(".bottomhalf")).hasClass("hover-item__bottom") ){
        flipStart(itemMenu,"hover-item","hover-item__bottom",true)
    }
    //if menu is not active but is selected, make active hover animation
    
    //if menu is active, make active hover animation

}


function flipStart(itemMenu,cssClass="",cssClassbottom="",navMenu=false){

    var $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget);

    if(navMenu){
        $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottomBack=$('.bottomhalf__back');
    
    if( 
            $item.find($top).hasClass(cssClass) 
            || 
            $item.find($bottomBack).hasClass(cssClassbottom) 
        ){
        return}
    else{
        console.log($item.find($top));
        $item.find($top).transition(
            {perspective:'1000px',
            rotateX:'-90deg',
            duration:150
            }, 
            function(){$(this).addClass(cssClass)}
            );
        $item.find($topBack).addClass(cssClass);
        $item.find($bottomBack).transition(
            {perspective:'1000px',
            rotateX:'0deg',
            duration:150,
            delay:150
            }).addClass(cssClassbottom);
        }
    }
    else{
        console.log("section");
        $item.find($top).transition(
            {perspective:'1000px',
            rotateX:'-90deg',
            duration:150
            }           
            );
        $item.find($bottomBack).transition(
            {perspective:'1000px',
            rotateX:'0deg',
            duration:150,
            delay:150
            });
    }
    
}

function flipEnd(itemMenu,cssClass="",cssClassbottom="",navMenu=false){

    var $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottom=$('.bottomCard'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget);

    if(navMenu){
        $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottom=$('.bottomhalf');
        $bottomBack=$('.bottomhalf__back');
    
    if( 
        ($item.find($top).hasClass(cssClass) 
        || 
        $item.find($bottomBack).hasClass(cssClassbottom))
        ){
            
            $item.find($bottom).addClass(cssClassbottom);
            $item.find($topBack).removeClass(cssClass);
            $item.find($top).removeAttr('style').transition({perspective:'1000px',rotateX:'-90deg',duration:150}, function(){$(this).removeAttr('style').removeClass(cssClass)});
            $item.find($bottomBack).removeClass(cssClassbottom).removeAttr('style').transition({perspective:'1000px',rotateX:'0deg',duration:150,delay:150}, function(){$(this).removeAttr('style');$item.find($bottom).removeClass(cssClassbottom)});}
    else{
        return
    }
    }

    else{
        
            
            $item.find($top).removeAttr('style').transition({perspective:'1000px',
            rotateX:'-90deg',
            duration:150}, 
            function(){$(this).removeAttr('style')}
            );
            $item.find($bottomBack).removeAttr('style').transition({perspective:'1000px',
            rotateX:'0deg',
            duration:150,
            delay:150}, 
            function(){$(this).removeAttr('style')})
    }
    

}