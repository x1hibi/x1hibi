//import components
import testComponent from './components/testComponent.js';
import cardComponent from './components/CardComponent.js';
// Import the 
import TypedText from './textTypedEffect.js'

new Vue({
  el: "#app",
  mounted() {
    console.log("parent mount")
    this.typeEffect()
    window.addEventListener('scroll',()=>{
      this.stickyNavbar()
    })
  },
  data: {
    subtitle: " ",
    caret: "|",
    showSubtitle: true,
  },
  methods: {

    typeEffect() {
      //define options of the effect
      let StringsToType=["Web Design","Front-End","Back-End","Full Stack Web"]
      let options = {
        blinkCaretRepetitionsAtEnd:10,
        blinkCaretRepetitionsAtStart:1,
        loops: 9999,
        textTyped: StringsToType,
      }
      //create a new instance of effect
      let typed = new TypedText(options)
      //typed the list of strings
      typed.typingList()

    },
    stickyNavbar(){
      let navbar=document.getElementById("navbar") 
      let headerHeight=document.getElementById("header").clientHeight
      //we change fixed postion when navbar is in the top and removed and also change his backgroud color
      if(window.scrollY>=headerHeight){
        navbar.style.position="fixed"
        navbar.style.background="#2b2727"
      }else{
        navbar.style.position="static"
        navbar.style.background="#1b1b1b"
      }

    }

  },
  components: {
    'test-component': testComponent,
    'card-component': cardComponent,
  }

});

