import Swiper from './Swiper';
import './swiper.css';
import './custom.css';


function App() {

    return(
    <div>

    <Swiper

    centeredSlides      = {false}      // centering slides                   (bool)   default_value: false
    additionalClassName = 'fullscreen' // add class to swiper               (string)  default_value: ''
    transitionMs        = '450ms'      // transition duration               (string)  default_value: 300ms
    offset              = {0}          // offset                            (number)  default_value: 0
    threshold           = {90}         // threshold to swipe current slide  (number)  default_value: 80
    
    
    >
{ 
    /* No matter what class name you specify. 
    It is needed to stylize slides in css */ }
       <div className = 'slide_item'>Slide 1</div> 
       <div className = 'slide_item'>Slide 2</div>
       <div className = 'slide_item'>Slide 3</div>
       <div className = 'slide_item'>Slide 4</div>
       <div className = 'slide_item'>Slide 5</div>


    </Swiper>
    </div>

    )}

    //custom.css 

    .fullscreen__slides .slide_item{
        width: 100%;
        flex-shrink: 0;
        
      }

      <Swiper 
      centeredSlides = {true}
      >
      <div className = 'slide_item first'>Slide 1</div>
      <div className = 'slide_item second'>Slide 2</div>
      <div className = 'slide_item third'>Slide 3</div>
      <div className = 'slide_item fourth'>Slide 4</div>
      <div className = 'slide_item fifth'>Slide 5</div>
      </Swiper>