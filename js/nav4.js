
function EvToObj(ref){
    this.ref=ref;
    this.$ref=$(ref.currentTarget);
    this.$item=this.$ref.siblings();
    this.menuId=this.$item.attr('id');
    this.$top=this.$item.find('.tophalf');
    this.$topBack=this.$item.find('.tophalf__back');
    this.$bottom=this.$item.find('.bottomhalf');
    this.$bottomBack=this.$item.find('.bottomhalf__back');
    return this;
}
EvToObj.prototype.setAnimState=function(state){return this.$item.attr("data-state", state);}
EvToObj.prototype.getAnimState=function(){return this.$item.attr('data-state');}

EvToObj.prototype.setSelectedState=function(state){return this.$item.attr("data-selected", state);}
EvToObj.prototype.getSelectedState=function(){return this.$item.attr('data-selected');}

EvToObj.prototype.setHoverState=function(state){return this.$item.attr("data-hovering", state);}
EvToObj.prototype.getHoverState=function(){return this.$item.attr('data-hovering');}

const time = 1000;

classes=["",""];
hoverClasses=["hover-menu","hover-menu__bottom"];
selectedClasses=["activeMenu","activeMenu__bottom"];
selectedHoverClasses=["activeMenuHover","activeMenuHover__bottom"]

/**
 * once the page is loaded, start registering events on nav elements
 */
$().ready(function(){
    //menu hover

$('.menuOverlay').hover(stateCheck,stateCheck);

//menu selection
$('.menuOverlay').click(stateCheck);

})

/* 
INIT
TOACTIVE
ACTIVE
TOINIT

*/

/**
 * Analyse l'appel d'evenement et appel la fonction necessaire
 * 
 * @param {called event} navEvent 
 */
function stateCheck(navEvent){
    //if menu is not active, make regular hover animation
    let userEvent= new EvToObj(navEvent);
    let mouseEvent=userEvent.ref.type;
    $menuAnimationState=userEvent.getAnimState();
    $clickedState=userEvent.getSelectedState();
    console.log('selectedMenu :',$clickedState);

    //Mouse hovering event
    if(mouseEvent=="mouseenter"){
        userEvent.setHoverState("TRUE")
        if($menuAnimationState==="INIT"){
            if($clickedState === "FALSE"){
                flipMenuStart(userEvent,hoverClasses);
            }else{
                flipMenuStart(userEvent,selectedHoverClasses);
            }
        }

        if($menuAnimationState==="TOINIT"){
            if($clickedState === "FALSE"){
                flipMenuStart(userEvent,hoverClasses);
            }else{
                flipMenuStart(userEvent,selectedHoverClasses);
            }
        }
        
    }
    //Mouse clicked event
    if(mouseEvent=="click"){
        console.log('click');
        
        if(userEvent.getSelectedState() === "FALSE"){
            userEvent.setSelectedState("TRUE");

            if($menuAnimationState==="ACTIVE"){
                selectedMenu(userEvent,selectedHoverClasses);
            }
           
        }
        else{
            userEvent.setSelectedState("FALSE");
        }
    }
    // Mouse leave event
    if(mouseEvent=="mouseleave"){
        userEvent.setHoverState("FALSE");
     
        if($menuAnimationState === 'TOACTIVE') {
            console.log("Hdjsahjkhdajkhdjaks")
            // setAnimationState($(navEvent.currentTarget).siblings(), 'ACTIVE')
        }else {
            if($clickedState === "FALSE"){
                flipMenuReset(userEvent,hoverClasses);
            }else{
                flipMenuReset(userEvent,selectedHoverClasses);
            }
            
        }
    }
}

// Pour changer les classe de base lors de la selection du menu
function selectedMenu(ref,classes){
    //on select
    if(ref.getAnimState()==="ACTIVE"){
        // prepare menu icone for selected status animation 
        ref.$top.removeAttr('style');
        ref.$bottom.addClass('hover-menu__bottom');
        ref.$topBack.addClass(classes[0]).removeClass('hover-menu');
        ref.$bottomBack.removeAttr('style').addClass(classes[1]);
        animateToSelected(ref,classes,function(){
            ref.$top.removeAttr('style').addClass(classes[0]).removeClass('hover-menu');
            ref.$bottom.removeClass('hover-menu__bottom').addClass(classes[1]);
            ref.$bottomBack.removeAttr('style').removeClass('hover-menu__bottom');
            if(ref.getAnimState() ==='ACTIVE' && ref.getHoverState() ==="FALSE" && ref.getSelectedState() ==="TRUE"){
                //console.log('mouse is not hovering element, about to run flipMenuReset');
                
                flipMenuReset(ref,selectedClasses);
            }
        });
    }   
}

function flipMenuStart(ref,classes){
   
    if((ref.getAnimState() === 'INIT' || ref.getAnimState() === 'TOINIT' )&& ref.getHoverState() ==="TRUE"){ 

        if(ref.getSelectedState()==="FALSE"){
            ref.setAnimState("TOACTIVE");
            //console.log("Current state of ",$item.attr('id')+" :",getAnimationState($item));
            animateToActive(ref,classes, function() {
                //console.log("current state in CB of flipMenuStart:",getAnimationState($item));
                console.log(ref.getSelectedState());
                if(ref.getHoverState() ==="FALSE"){
                    //console.log('mouse is not hovering element, about to run flipMenuReset');
                    if(ref.getSelectedState() ==="FALSE"){
                        flipMenuReset(ref,classes);
                    }else{
                        selectedMenu(ref,selectedClasses);
                    }
                    
                }else  if(ref.getHoverState() ==="TRUE" && ref.getSelectedState() ==="TRUE"){
                    selectedMenu(ref,selectedHoverClasses);
                }    
                else {
                    //console.log('setting state to ACTIVE')
                    ref.setAnimState('ACTIVE')
                }
            })
        }
        if(ref.getSelectedState()==="TRUE"){

        }
        
    }
}

function animateToActive(ref,classes, cb) {

    const cssClass = classes[0];
    const cssClassBottom = classes[1];
    
   // console.log("running animateToActive");
    // change color of back panel
    ref.$topBack.addClass(cssClass);
    // start animation
    ref.$top.transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        }, 
        function(){
           // console.log("Done animating top panel")
            ref.$top.addClass(cssClass);
            // ANIMATE BOTTOM WHEN TOP IS DONE
            ref.$bottomBack.addClass(cssClassBottom).transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
               // console.log('done animating bottom'),  
                function(){
                  //  console.log("Current state after first animation of ",$item.attr('id')+" :",getAnimationState($item));
                    ref.setAnimState('ACTIVE');
                  //  console.log('running cb');
                        cb();
                }
            )
        }
    );        
}

function animateToSelected(ref,classes,cb) {
    const cssClass = classes[0];
    const cssClassBottom = classes[1];
console.log('animate to selected');
    ref.$top.transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        }, 
        function(){
           // console.log("Done animating top panel")
                $(this).addClass(cssClass);
            // ANIMATE BOTTOM WHEN TOP IS DONE
            ref.$bottomBack.transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
               // console.log('done animating bottom'),  
                function(){
                  //  console.log("Current state after first animation of ",$item.attr('id')+" :",getAnimationState($item));
                  ref.$bottom.addClass(cssClassBottom)
                    ref.setAnimState('ACTIVE');
                  //  console.log('running cb');
                  cb();  
                }
            )
        }
    );    
      
}

function flipMenuReset(ref,classes){
    //finished to hover anim, cursor is not hovering any more and menu is not selected
    if(ref.getAnimState() === 'ACTIVE' && ref.getHoverState()==="FALSE" && ref.getSelectedState()==="FALSE"){
        //console.log('starting menu Reset')

        ref.setAnimState('TOINIT');
       // console.log("Current state of ",$item.attr('id')+" :",getAnimationState($item));
        if(ref.getSelectedState()==="TRUE"){
            ref.$topBack.removeClass("hover-menu").addClass('tophalf__back--selected');
            ref.$top.removeClass("hover-menu").addClass('tophalf--selected');
            ref.$bottom.removeClass("hover-menu__bottom").addClass('bottomhalf--selected');
            ref.$bottomBack.removeClass("hover-menu__bottom");
        }
        animateToInit(ref, classes, function(){
            //console.log('call back to INIT')
            ref.setAnimState('INIT');
        })
    }
    //finished to hover anim, cursor is not hovering and menu is selected
    if(ref.getAnimState() === 'ACTIVE' && ref.getHoverState()==="FALSE" && ref.getSelectedState() === "TRUE"){
        ref.setAnimState('TOINIT');
        //console.log("current state in CB of flipMenuStart:",getAnimationState($item));
        //console.log('about to run flipMenuReset');
        
        ref.$topBack.addClass(classes[0]);
        ref.$top.addClass(classes[0]);
        ref.$bottom.addClass(classes[1]);
        
        animateToInit(ref,classes)
    }
    if(ref.getAnimState() === 'TOACTIVE' && ref.getSelectedState() === "TRUE"){
            ref.setAnimState('ACTIVE')
            flipMenuReset(ref,classes)
        }    
}

function animateToInit(ref,classes, cb) {
    //console.log("animating reset");

    const cssClass = classes[0];
    const cssClassBottom = classes[1];

    ref.$bottom.addClass(cssClassBottom);
    ref.$topBack.removeClass(cssClass);

    //console.log('reset style and animate top');
    ref.$top.removeAttr('style').transition(
        {
            perspective:'1000px',
            rotateX:'-90deg',
            duration:time
        },
        function(){
            //console.log(' reset style and animate bottom')
            $(this).removeAttr('style').removeClass(cssClass);
            ref.$bottomBack.removeClass(cssClassBottom).removeAttr('style').transition(
                {
                    perspective:'1000px',
                    rotateX:'0deg',
                    duration:time
                },
                function(){
                    // Reset style
                    $(this).removeAttr('style');
                    ref.$bottom.removeClass(cssClassBottom);
                    

                    //check if hoverState is still false, if it is, goto callback else, jump back to animate toActive

                    //Callback 
                    cb();
                }
            );
        }
    ); 
}
