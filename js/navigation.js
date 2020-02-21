$().ready(function(){
    //menu hover
$(".menuOverlay").hover(function(event){flipStart(event,"hover-menu","hover-menu__bottom");},function(event){flipEnd(event,"hover-menu","hover-menu__bottom");})

$(".flipperContainer").hover(function(event){flipStart(event);},function(event){flipEnd(event);})

//menu selection

$(".item-menu__accueil").click(function(event){flipStart(event,"activeMenu","activeMenu__bottom");})



})

function stateCheck(itemMenu){
    //if menu is not active, make regular hover animation
    if($(itemMenu.currentTarget).find($(".tophalf")).hasClass("hover-item") || $(itemMenu.currentTarget).find($(".bottomhalf")).hasClass("hover-item__bottom") ){
        flipStart(itemMenu,"hover-item","hover-item__bottom",true)
    }
    //if menu is not active but is selected, make active hover animation
    
    //if menu is active, make active hover animation

}


function flipStart(itemMenu,cssClass="",cssClassbottom=""){

    let $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget).siblings();

    // si c'est un item du menu 
    if(cssClass=="hover-menu"){
        $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottomBack=$('.bottomhalf__back');
    
        if( 
            //si le event contient la class .hovering
            $item.hasClass('hovering')
        ){
            //l'animation precedente n'est pas terminer, sort de la fonction
            console.log('animating');
            return
        }
        else{            
            //ajouter une class pour reference
            $item.addClass('hoverPlay');
            console.log('addClass hoverPlay');
            //assigne la classe de hover a l'element cacher derriere la palette du haut
            $item.find($topBack).addClass(cssClass);
            //trouver la palette du haut et appliquer une animation de transition
            $item.find($top).transition(
                {perspective:'1000px',
                rotateX:'-90deg',
                duration:150
                }, 
                //ajouter la class representant son etat hover
                function(){$(this).addClass(cssClass);}
                );
            //attends la fin de l'animation du haut avant de declancher l'animation du bas de la palette
            $item.find($bottomBack).addClass(cssClassbottom).transition(
                {perspective:'1000px',
                rotateX:'0deg',
                duration:150,
                delay:150
                
                }, function(){
                    window.setTimeout( 
                        function() {   
                                    $item.addClass("hovering");
                                    console.log('addclass hovering');
                                },300)
                    })
    }}
    //si ce n'est pas un item du menu, c'est les palettes d'entete de section
    else{
        console.log("section ,",$item);
        $item.find($top).transition(
            console.log('anim section'),
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

function flipEnd(itemMenu,cssClass="",cssClassbottom=""){

    var $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottom=$('.bottomCard'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget).siblings();

    if(cssClass=="hover-menu"){
        $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottom=$('.bottomhalf');
        $bottomBack=$('.bottomhalf__back');
    
        if( 
            $item.hasClass('hoverPlay')
        ){
            console.log('item has class: hoverPlay');
                window.setInterval( function() {   
                     if ($item.hasClass('hovering') && !$item.hasClass('hoverStop'))
                     {
                        console.log('item has class hovering but not hoverStop');

                        $item.addClass('hoverStop');
                        console.log('so we had hoverStop');
                        $item.find($bottom).addClass(cssClassbottom);

                        $item.find($topBack).removeClass(cssClass);
            
                            $item.find($top).removeAttr('style').transition({perspective:'1000px',
                            rotateX:'-90deg',
                            duration:150},
                            function(){
                                $(this).removeAttr('style').removeClass(cssClass);
                                $item.find($bottomBack).removeClass(cssClassbottom).removeAttr('style').transition(
                                    {perspective:'1000px',
                                    rotateX:'0deg',
                                    duration:150
                                    },
                                     function(){
                                         $(this).removeAttr('style');$item.find($bottom).removeClass(cssClassbottom);
                                         $item.removeClass('hovering hoverPlay');
                                         console.log('done animating the flip, remove class hovering and hoverPlay');
                                        }
                                );
                        });

                        
                        }
                    },10);
                    console.log('try and make sure that class hoverStop is removed here');
                    $item.removeClass('hoverStop hovering');
        }   
        else{
            console.log('might jump here if hovePlay isnt here but hovering is');
            console.log('item has hovering?  ',$item.hasClass('hovering'))
            return
        }
       // $item.removeClass('hoverStop hovering');
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