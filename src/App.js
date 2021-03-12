import logo from './logo.svg';
import './App.css';
import {useRef, useEffect, useState} from 'react';



function App() {

  

  
  let threshHold = 80;
  let spaceBetween = '50px'
  let numberOfSlides;
  let swiperRef = useRef(null);
  let containerRef = useRef(null);
  let [currentSlide, setCurrentSlide] = useState(0)
  let [initialTranslate, setinitialTranslate] = useState(0);
  let [startPos, setStartPos] = useState();
  let [transition, setTransition] = useState('0s');
  let [transitionEnded, setTransitionEnded] = useState(true); 
  let [translate, setTranslate] = useState(0);
  let [moveListener, setmoveListener] = useState('');
  let centereSlidePosition = 50;


  



useEffect(() => {
  //  document.addEventListener('pointerup', logListenerEvent)
  let centered = false;
  let swiperWidth = swiperRef.current.offsetWidth;
  let swiperItems = swiperRef.current.childNodes;
  
  if(currentSlide != 0) {
  
    setTranslate(  swiperItems[0].offsetLeft - swiperItems[currentSlide].offsetLeft  ) 

  } else if(centered){

    setTranslate(swiperWidth / 2 + swiperItems[currentSlide].offsetLeft - swiperItems[currentSlide].offsetWidth / 2 )

  }
  swiperRef.current.addEventListener('transitionstart', transitionStart);
  console.log('useeffect')
  
    
  // for (let key in swiperItems){
    

  //   if (swiperItems.hasOwnProperty(key)) {
  //     swiperItems[key].style.marginRight = spaceBetween;
  // }
  // }

 
 
}, []);


function logListenerEvent(){
  console.log('LISTENER LOG',translate, initialTranslate, moveListener,currentSlide)
}

  

function handleStart(e){
  e.preventDefault();
  let container = containerRef.current.getBoundingClientRect();
  let wrapper = swiperRef.current.getBoundingClientRect();
  console.log(wrapper);
  setTransition('0ms');
  setmoveListener(true);
  setinitialTranslate(translate);
  
  
 
   setStartPos(e.clientX - wrapper.x + container.x)

  
}



function transitionStart(){
  setTransitionEnded(false);
  
}

function handleEnd(e){
  e.preventDefault();
  setmoveListener(false);
  let swipeItem = swiperRef.current.childNodes


  
  let xDiff = initialTranslate - translate;
  
  let swipeLeft = currentSlide != swipeItem.length - 1  ? swipeItem[currentSlide].offsetLeft - swipeItem[currentSlide].nextSibling.offsetLeft : ''
  let swipeRight =  currentSlide != 0  ? swipeItem[currentSlide].offsetLeft - swipeItem[currentSlide].previousSibling.offsetLeft : ''  ;
  let wrapperX = swiperRef.current.getBoundingClientRect().x;
  
  let swipeAccess = Math.sign(xDiff) == Math.sign(initialTranslate);
  let maxTranslate = swipeItem[swipeItem.length - 1].offsetLeft - swipeItem[0].offsetLeft; 
  
  

  // left: xDiff > 0   right: xDiff < 0 

  let swipeDirection
  //  = xDiff < 0 ? 
  
  //  110 :
  
  // -110 ;

  if(xDiff < 0 && currentSlide > 0 && Math.abs(xDiff) > threshHold){
    
    swipeDirection = swipeRight;
    setCurrentSlide(currentSlide - 1)
    console.log('set current slide and swipe direction: right')
  } else if(xDiff>0 && currentSlide != swipeItem.length - 1  && Math.abs(xDiff) > threshHold)  {

    swipeDirection = swipeLeft;
    setCurrentSlide(currentSlide + 1)
    console.log('set current slide and swipe direction:left')
    console.log(swipeDirection)
    
  }

 
 
 
  if(Math.abs(xDiff) < threshHold  ||
  
  Math.abs(initialTranslate) >= maxTranslate && !swipeAccess ||
  initialTranslate == 0 && Math.sign(xDiff) < 0 
  
  ) {
  
   setTransition('300ms'); setTranslate(initialTranslate)
   console.log('stay initial')
  }
  else{
    setTransition('300ms'); setTranslate(initialTranslate + swipeDirection)
    console.log('next position')
  }
  
  
}




function handleOut(){
  
}

function handleMove(e){


  // setTransition('0ms');
setTranslate(e.clientX - startPos  )

}


  return (
    <div
    onPointerMove ={moveListener ? (e) => {handleMove(e)} : undefined} 
    onPointerUp= {moveListener? (e) => {handleEnd(e)} : undefined}
    className="App">
      
      <div
      ref={containerRef}
      className="swiper_container">
        
        <div
        
        ref={swiperRef}

        style ={{
         
          transform: `translate3d(${translate +'px'}, 0px, 0px)`,
          transitionProperty: 'transform',
          transitionDuration: transition,

          
        }}
        // onPointerUp= {moveListener? () => handleEnd() : undefined}
        
        onPointerMove ={moveListener ? (e) => {handleMove(e)} : undefined} 
        
        onPointerDown ={(e) => {handleStart(e);}} 
        
        onPointerLeave = {() => {handleOut()}}
        
        onTransitionEnd = {()=>{setTransition('0ms'); setTransitionEnded(true); 
        
        ;}}
        
       
        
        className="swiper_wrapper">

          

          <div  className="item_one"></div>
          <div className="item_two"></div>
          <div className="item_three"></div>
          <div className="item_four"></div>

        </div>
      </div>
      <div>{currentSlide}</div>
    </div>
  );
}

export default App;
