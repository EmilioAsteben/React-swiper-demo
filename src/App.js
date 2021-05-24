import Swiper from "./Swiper";
import "./swiper.css";
import "./custom.css";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";

hljs.highlightAll();

function App() {
  return (
    <div>
      <div className="about">
        <h1>React swiper</h1>
        <p>
          Lightweight responsive React Swiper for touchscreen devices. No
          complex api. Works equally well in vertical and horizontal
          orientation. Possible to customize the size of the slides and the
          space between them, using css.{" "}
        </p>
      </div>

      <div className="usage">
        <h1>Usage:</h1>

        <div className="first_step">
          <p>
            1) Import <b>swiper</b>, <b>swiper.css</b>.
          </p>
          <p>
            Create and import <b>custom.css</b> to customize slide sizes and
            spaces between them.{" "}
          </p>
          <pre>
            <code className="javascript code_snippet">
              {`import Swiper from './Swiper';

    import './swiper.css';
    import './custom.css';


    `}
            </code>
          </pre>
        </div>

        <div className="second_step">
          <p>2) Add the Swiper to your app like this</p>

          <pre>
            <code className="jsx code_snippet">
              {` 
    <Swiper

    centeredSlides      = {false}      
    additionalClassName = 'react__swiper' 
    transitionMs        = '450ms'      
    offset              = {0}         
    threshold           = {90}         
    
    
    >
 
    /* No matter what class name you specify. 
    It is needed to stylize slides in css */ 
       <div className = 'slide_item'>Slide 1</div> 
       <div className = 'slide_item'>Slide 2</div>
       <div className = 'slide_item'>Slide 3</div>
       <div className = 'slide_item'>Slide 4</div>
       <div className = 'slide_item'>Slide 5</div>


    </Swiper>
    `}
            </code>
          </pre>
        </div>

        <h3>API</h3>

        <pre>
          <code className="plaintext code_snippet">
            {`
  centeredSlides       // centering slides                  (bool)    default_value: false
  additionalClassName  // add class to swiper               (string)  default_value: ''
  transitionMs         // transition duration               (string)  default_value: 300ms
  offset               // add slide offset                  (number)  default_value: 0
  threshold            // threshold to swipe current slide  (number)  default_value: 80
  `}
          </code>
        </pre>

        <h3>To justify slides</h3>

        <pre>
          <code className="css code_snippet">
            {`
   /* custom.css */

  .swiper_wrapper{
    justify-content: space-between;  /* flex-start; etc */
  }

  `}
          </code>
        </pre>
      </div>

      <h1 className="demos">Demos</h1>

      <div className="fullscreen__slides">
        <div className="swiper__header">
          <h1>Fullscreen slides</h1>

          {/* <pre><code className = 'javascript code_snippet'>{``}</code></pre> */}

          <pre>
            <code className="css code_snippet">
              {`
      /* custom.css */

      .slide_item{
          width: 100%;
          flex-shrink: 0;
        }
  `}
            </code>
          </pre>
        </div>

        <Swiper
          centeredSlides={false}
          additionalClassName="fullscreen"
          transitionMs="450ms"
          offset={0}
          threshold={90}
        >
          <div className="slide_item first">Slide 1</div>
          <div className="slide_item second">Slide 2</div>
          <div className="slide_item third">Slide 3</div>
          <div className="slide_item fourth">Slide 4</div>
          <div className="slide_item fifth">Slide 5</div>
        </Swiper>
      </div>

      <div className="separated__slides">
        <div className="swiper__header">
          <h1>Separated slides</h1>

          <pre>
            <code className="css code_snippet">
              {`
      /* custom.css */

      .slide_item{
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        height:300px;
        margin-right:20px;
        width: 200px;
        transition: border 0.9s ease-in-out;
        border: 1px solid rgba(112, 112, 112, 0.219);
        border-radius: 6px;
        flex-shrink: 0;
      }
    
      .slide_item:last-of-type{
        margin-right: 0;
      }
  `}
            </code>
          </pre>
        </div>

        <Swiper
          centeredSlides={false}
          additionalClassName="separated__slides"
          transitionMs="450ms"
        >
          <div className="slide_item first">Slide 1</div>
          <div className="slide_item second">Slide 2</div>
          <div className="slide_item third">Slide 3</div>
          <div className="slide_item fourth">Slide 4</div>
          <div className="slide_item fifth">Slide 5</div>
        </Swiper>
      </div>

      <div className="centered__slides">
        <div className="swiper__header">
          <h1>Centered slides</h1>

          <pre>
            <code className="javascript code_snippet">
              {`
    <Swiper centeredSlides = {true}>
    </Swiper>
  `}
            </code>
          </pre>
        </div>
        <Swiper
          centeredSlides={true}
          additionalClassName="centered"
          transitionMs="450ms"
        >
          <div className="slide_item first">Slide 1</div>
          <div className="slide_item second">Slide 2</div>
          <div className="slide_item third">Slide 3</div>
          <div className="slide_item fourth">Slide 4</div>
          <div className="slide_item fifth">Slide 5</div>
        </Swiper>
      </div>

      <div className="different__sizes">
        <div className="swiper__header">
          <h1>Different sizes</h1>

          <pre>
            <code className="css code_snippet">
              {`
    /* custom.css */

    .slide_item.first  {
      width:100px;
    }
  
    .slide_item.second {
      width:450px;
    }
  
    .slide_item.third  {
      width: 100px;
    }
  
    .slide_item.fourth {
      width: 130px;
    }
  
    .slide_item.fifth  {
      width:250px;
    }
  `}
            </code>
          </pre>
        </div>
        <Swiper
          centeredSlides={false}
          additionalClassName="different__sizes"
          transitionMs="450ms"
        >
          <div className="slide_item first">Slide 1</div>
          <div className="slide_item second">Slide 2</div>
          <div className="slide_item third">Slide 3</div>
          <div className="slide_item fourth">Slide 4</div>
          <div className="slide_item fifth">Slide 5</div>
        </Swiper>
      </div>

      <div className="different__spaces">
        <div className="swiper__header">
          <h1>Different spaces</h1>
          <pre>
            <code className="css code_snippet">
              {`
  /* custom.css */

  .swiper_wrapper{
    justify-content: flex-start;

  }

  .slide_item.first{
    margin-right: 40px;
  }

  .slide_item.second{
    margin-right: 15px;
  }

  .slide_item.third{
    margin-right: 70px;
  }

  .slide_item.fourth{
    margin-right: 100px;
  }

  `}
            </code>
          </pre>
        </div>

        <Swiper
          centeredSlides={false}
          additionalClassName="separated__slides"
          transitionMs="450ms"
        >
          <div className="slide_item first">Slide 1</div>
          <div className="slide_item second">Slide 2</div>
          <div className="slide_item third">Slide 3</div>
          <div className="slide_item fourth">Slide 4</div>
          <div className="slide_item fifth">Slide 5</div>
        </Swiper>
      </div>

      <footer>
        <a href="https://github.com/EmilioAsteben/React-swiper-demo">
          Github
        </a>
      </footer>
    </div>
  );
}

export default App;
