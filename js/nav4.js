/**
*   an array of booleans used to register the mouse enter and mouse leave on each menu items
*/
abNavIsHovering={
    "accueil":false,
    "apercu":false,
    "design":false,
    "audioV":false,
    "jeux":false,
    "prototype":false,
    "contact":false
}

hoverClasses=["hover-menu","hover-menu__bottom"];
activeClasses={};

/**
 * once the page is loaded, start registering events on nav elements
 */
$().ready(function(){

    //menu hover
$('.menuOverlay').hover(stateCheck,stateCheck);

})

/* 
INIT
TOACTIVE
ACTIVE
TOINIT
*/

/**
 * Analyse l'appel d'evenement, appel la fonction necessaire et assign un bool pour le hover
 * 
 * @param {called event} navEvent 
 */
function stateCheck(navEvent){
    //if menu is not active, make regular hover animation
    $menuState=getState($(navEvent.currentTarget).siblings());
    //console.log(navEvent.type);
    //console.log('mouse hovering on '+$(navEvent.currentTarget).siblings().attr('id')+" :", abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]);
    
    if(navEvent.type=="mouseenter"){
        abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]=true;
        switch ($menuState) {
            case "INIT":
                flipMenuStart(navEvent,hoverClasses);
                break;
            case "TOINIT":
                flipMenuStart(navEvent,"hover-menu","hover-menu__bottom");
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
        abNavIsHovering[($(navEvent.currentTarget).siblings().attr('id'))]=false;
        //console.log($menuState)
        if($menuState === 'TOACTIVE') {
            //console.log("Hdjsahjkhdajkhdjaks")
            // setState($(navEvent.currentTarget).siblings(), 'ACTIVE')
        }else {
            flipMenuReset(navEvent)
        }
    }
}

function flipMenuStart(itemMenu,cssClasses){

    const $item = $(itemMenu.currentTarget).siblings();
    const state = getState($item);

    if((state === 'INIT' || state === 'TOINIT' ) && abNavIsHovering[$item.attr('id')]){ 
        setState($item, "TOACTIVE");
        //console.log("Current state of ",$item.attr('id')+" :",getState($item));
        animateToActive(itemMenu, function() {
            //console.log("current state in CB of flipMenuStart:",getState($item));
            if(getState($item) ==='ACTIVE' && !abNavIsHovering[$item.attr('id')]){
                //console.log('about to run flipMenuReset');
                flipMenuReset(itemMenu)
            } else {
                //console.log('setting state to ACTIVE')
                setState($item,'ACTIVE')
            }
        })
    }
}
