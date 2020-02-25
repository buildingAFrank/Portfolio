var progressState=[];

$().ready(function(){
    //menu hover
$(".menuOverlay").hover(
    function(event){stateCheck(event);},
    function(event){stateCheck(event)})

$(".flipperContainer").hover(function(event){flipStart(event);},function(event){flipEnd(event);})

//menu selection

$(".item-menu__accueil").click(function(event){flipStart(event,"activeMenu","activeMenu__bottom");})



})

/**
 * Analyse l'appel d'evenement et appel la fonction necessaire
 * 
 * @param {called event} navEvent 
 */
function stateCheck(navEvent){
    //if menu is not active, make regular hover animation
    $menuState=$(navEvent.currentTarget).siblings().attr('data-state');
    console.log($menuState);
    if(navEvent.type=="mouseenter"){
            switch ($menuState) {
                case "sleep":
                    flipMenuStart(navEvent,"hover-menu","hover-menu__bottom");
                    break;
                case "activeMenuHover":
        
                
                    break;
        
                default:
                    break;
            }
        }
    if(navEvent.type=="click"){
        switch (cssClass) {
            case "hover-menu":
                
            
                break;
            case "activeMenuHover":
    
            
                break;
    
            default:
                break;
        }
    }
    if(navEvent.type=="mouseleave"){
        switch ($menuState) {
            case "wake":
                flipMenuReset(navEvent,"hover-menu","hover-menu__bottom");
            
                break;
            case "activeMenuHover":
    
            
                break;
    
            default:
                break;
        }
    }
    
    //if menu is not active but is selected, make active hover animation
    
    //if menu is active, make active hover animation

}

function flipMenuStart(itemMenu,cssClass,cssClassBottom){
    let $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottomBack=$('.bottomhalf__back');
        $item=$(itemMenu.currentTarget).siblings();
        //si le event contient la class .hovering
    if($item.hasClass('hovering')){
        //l'animation precedente n'est pas terminer, sort de la fonction
        console.log('animating');
        return
    }
    else{   
        $item.attr('data-state','wake');         
        //ajouter une class pour reference
        $item.addClass('hoverPlay');
        console.log('addClass hoverPlay');
        //assigne la classe de hover a l'element cacher derriere la palette du haut
        $item.find($topBack).addClass(cssClass);
        //trouver la palette du haut et appliquer une animation de transition
        $item.find($top).transition(
                {
                    perspective:'1000px',
                    rotateX:'-90deg',
                    duration:150
                }, 
                //ajouter la class representant son etat hover
                function(){
                    $(this).addClass(cssClass);
                }
            );

        //attends la fin de l'animation du haut avant de declancher l'animation du bas de la palette
        $item.find($bottomBack).addClass(cssClassBottom).transition(
            {
                perspective:'1000px',
                rotateX:'0deg',
                duration:150,
                delay:150
            },  
            function(){   
                $item.addClass("hovering");
                console.log('top animation done, addclass hovering');
            }
                
        )
    }
}

function flipMenuReset(itemMenu,cssClass,cssClassBottom){
    let $top=$('.tophalf'),
        $topBack=$('.tophalf__back'),
        $bottom=$('.bottomhalf'),
        $bottomBack=$('.bottomhalf__back'),
        $item=$(itemMenu.currentTarget).siblings();
    if($item.hasClass('hoverPlay')){

        console.log('item has class: hoverPlay');

        
         progressState[$item.attr('id')]= setInterval( function() {   
            if ($item.hasClass('hovering') && !$item.hasClass('hoverStop')){

                console.log('item has class hovering but not hoverStop');

                $item.addClass('hoverStop');

                console.log('so we add hoverStop');

                $item.find($bottom).addClass(cssClassBottom);
                $item.find($topBack).removeClass(cssClass);
        
                $item.find($top).removeAttr('style').transition(
                    {
                        perspective:'1000px',
                        rotateX:'-90deg',
                        duration:150
                    },
                    function(){
                        $(this).removeAttr('style').removeClass(cssClass);
                        $item.find($bottomBack).removeClass(cssClassBottom).removeAttr('style').transition(
                            {
                                perspective:'1000px',
                                rotateX:'0deg',
                                duration:150
                            },
                            function(){
                                $(this).removeAttr('style');$item.find($bottom).removeClass(cssClassBottom);
                                $item.removeClass('hovering hoverPlay hoverStop').attr('data-state','sleep');
                                clearInterval(progressState[$item.attr('id')]);
                                console.log('done animating the flip, remove class hovering and hoverPlay');
                            }
                        );
                    }
                );    
            }
        },25);
        
    }   
    else{
        console.log('might jump here if hovePlay isnt here but hovering is');
        console.log('item has hovering?  ',$item.hasClass('hovering'));
    }
}

function flipStart(itemMenu,cssClass="",cssClassbottom=""){

    let $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget);

    // si c'est un item du menu 
    if(cssClass=="hover-menu"){
        if(itemMenu.type=="mouseenter"){console.log('ca fonctionne');}
        let $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottomBack=$('.bottomhalf__back');
        $item=$(itemMenu.currentTarget).siblings();
        //si le event contient la class .hovering
        if($item.hasClass('hovering')){
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
                    {
                        perspective:'1000px',
                        rotateX:'-90deg',
                        duration:150
                    }, 
                    //ajouter la class representant son etat hover
                    function(){
                        $(this).addClass(cssClass);
                    }
                );

            //attends la fin de l'animation du haut avant de declancher l'animation du bas de la palette
            $item.find($bottomBack).addClass(cssClassbottom).transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:150,
                    delay:150
                }, 
                    function(){
                        window.setTimeout(
                        function(){   
                            $item.addClass("hovering");
                            console.log('top animation done, addclass hovering');
                            },300
                        )
                    }
            )
        }
    }else{
        //si ce n'est pas un item du menu, c'est les palettes d'entete de section
        console.log("section ,",$item);
        $item.find($top).transition(
            console.log('anim section'),
            {
                perspective:'1000px',
                rotateX:'-90deg',
                duration:100
            }
        );
        $item.find($bottomBack).transition(
            {
                perspective:'1000px',
                rotateX:'0deg',
                duration:100,
                delay:150
            }
        );
    }
    
}

function flipEnd(itemMenu,cssClass="",cssClassbottom=""){

    var $top=$('.topCard'),
    $topBack=$('.topCard__back'),
    $bottom=$('.bottomCard'),
    $bottomBack=$('.bottomCard__back'),
    $item=$(itemMenu.currentTarget);

    if(cssClass=="hover-menu"){
        $top=$('.tophalf');
        $topBack=$('.tophalf__back');
        $bottom=$('.bottomhalf');
        $bottomBack=$('.bottomhalf__back');
        $item=$(itemMenu.currentTarget).siblings();
        if($item.hasClass('hoverPlay')){

            console.log('item has class: hoverPlay');

            var progressState= setInterval( function() {   
                if ($item.hasClass('hovering') && !$item.hasClass('hoverStop')){

                    console.log('item has class hovering but not hoverStop');

                    $item.addClass('hoverStop');

                    console.log('so we add hoverStop');

                    $item.find($bottom).addClass(cssClassbottom);
                    $item.find($topBack).removeClass(cssClass);
            
                    $item.find($top).removeAttr('style').transition(
                        {
                            perspective:'1000px',
                            rotateX:'-90deg',
                            duration:150
                        },
                        function(){
                            $(this).removeAttr('style').removeClass(cssClass);
                            $item.find($bottomBack).removeClass(cssClassbottom).removeAttr('style').transition(
                                {
                                    perspective:'1000px',
                                    rotateX:'0deg',
                                    duration:150
                                },
                                function(){
                                    $(this).removeAttr('style');$item.find($bottom).removeClass(cssClassbottom);
                                    $item.removeClass('hovering hoverPlay hoverStop');
                                    clearInterval(progressState);
                                    console.log('done animating the flip, remove class hovering and hoverPlay');
                                }
                            );
                        }
                    );    
                }
            },25);
        }   
        else{
            console.log('might jump here if hovePlay isnt here but hovering is');
            console.log('item has hovering?  ',$item.hasClass('hovering'));
        }
       // $item.removeClass('hoverStop hovering');
    }
    //carte des section headers
    else{
        
            
            $item.find($top).removeAttr('style').transition(
                {
                    perspective:'1000px',
                    rotateX:'-90deg',
                    duration:1000
                }, 
                function(){
                    $(this).removeAttr('style')
                }
            );
            $item.find($bottomBack).removeAttr('style').transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:1000,
                    delay:150
                }, 
                function(){
                    $(this).removeAttr('style')
                }
            );
    }
}