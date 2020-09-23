
'use strict';
/**
 * ### Create a easy, efficen and cool typing effect inside a html element, we can set atributes like speed, display caret and his speed and symbol, number of repetitions, all of this for one or more strings.
 * - NOTES:
 * 1) The selected html element must be empty, if has a content this will be deleted to avoid a weird behavior.
 * 2) The id of the html element container by default is "typingEffect".
 * 3) The caret is created using a span tag with the class name by default named as "caret", and his id is called equal.
 */

export default class TypedText{

    /**
     * _Contructor define the parameters to modify the typing effect and defaults settings_
     * @param {object} options
     */

    constructor(options){
        options= options || {}
        // Blink caret maded at the end of the typing
        this.blinkCaretRepetitionsAtEnd=options.blinkCaretRepetitionsAtEnd > 0 ? options.blinkCaretRepetitionsAtEnd*2 : false
        // Display caret
        this.caret=options.caret!=undefined ?  options.caret : true
        // Name of the class created to edit the caret styles
        this.caretClassName= options.caretClassName || 'caret'
        // Number of times of appearance and disappearance of the caret when the string has been writed
        this.caretRepetitionsEmptyString=options.caretRepetitionsEmptyString > 0 ? options.caretRepetitionsEmptyString : 2
        // Number of times of appearance and disappearance of the caret when the string has been erase
        this.caretRepetitionsFullString=options.caretRepetitionsFullString >= 0 ? options.caretRepetitionsFullString : 4
        // Caret symbol
        this.caretSymbol=options.caretSymbol ? options.caretSymbol[0] : '|'
        // Time in miliseconds to wairt before start to type, this will only be apply in the first iteration
        this.delayTime=options.delayTime >= 0 ? options.delayTime : 2000
        // Time in miliseconds that the appearance and disappearance of the caret
        this.waitingTime=options.waitingTime >= 0 ? options.waitingTime : 500
        // Number of times of appearance and disappearance of the caret when specify a delay time
        this.delayCaretRepetitions=Math.round(this.delayTime/this.waitingTime)>0 ? Math.round(this.delayTime/this.waitingTime) : 2
        // Speed in miliseconds which the char will be removed
        this.deletedSpeed=options.deletedSpeed>=0 ? options.deletedSpeed : 50
        // Indicate if the caret will be static at the end or will be hidden
        this.finalCaretState=options.finalCaretState || 'hidden'
        // Indicate in the last iteration if the content will be deleted ("empty") or remain
        this.finalStringState=options.finalStringState || 'empty'
        // Id of the html element where the text will be typed
        this.idContainer=options.idContainer || 'typingEffect'
        // Number of times witch var textTyped will be showed
        this.repetitions=options.repetitions>0 ? options.repetitions : 10
        // A simple String or an array of String will be displayed char by char
        this.textTyped=options.textTyped || ['Typing text effect...','Created by x1hibi 🐲 copyright@2020']
        // Speed in miliseconds which the char will be added
        this.typingSpeed=options.typingSpeed>0 ? options.typingSpeed : 50
    }

    async caretBlink(action,caret,finalState=false){
        let doc = document
        //indicate the number of times which will be appere and disappear the caret "*2" is because need disappear and appere
        let caretLoop = action=='add' ? this.caretRepetitionsFullString*2 : action=='delete' ? this.caretRepetitionsEmptyString*2 : action=='blink' ? this.blinkCaretRepetitionsAtEnd : this.delayCaretRepetitions
        //we iterate async to wait before add or remove more letters
        for (let i = 0; i < caretLoop; i++) {
           await new Promise (resolve=>setTimeout(resolve,this.waitingTime))
           //when caret is present we modify the opacity to create a appere and disappear effect
           if(caret){
                doc.getElementById("caret").style.opacity=doc.getElementById("caret").style.opacity=="0" ? "1" : "0"
           }
           if(this.delayTime){
               this.delayTime=false
           }
           if (finalState && i==caretLoop-1 && caret) {
                doc.getElementById("caret").style.opacity=this.finalCaretState=='hidden' ? "0" :"1"
           }
        }
        return "ok"
    }

    /**
     * _Iterate every character of a string and modify a html element_
     * @param {string} action - Indicate the action (type | ease) a string
     * @param {boolean} caret - Inidicate if caret will be display
     * @param {string} text - Text which will be typed
     * @returns {void} - Don't return nothing
     */

    async asyncIteration(action,caret,finalState,text){
        //shortcuts used to get data from DOM, and make reference a properties from class
        let doc=document
        let id=this.idContainer
        let val=caret ? "nodeValue" : "textContent"
        let stringToType=' '
        let speed=action=='add' ? this.typingSpeed : this.deletedSpeed
        if(!this.delayTime){
            //Get the current string to iterate depending if will be display caret or not
            if(caret){
                //here we get the string from a text node inside of the element where type
                stringToType=action=='add' ? text.split("") : doc.getElementById(id).childNodes[0][val].split("")
            }else{
                //here get directly the content of the element where we type
                stringToType=action=='add' ? text.split("") : doc.getElementById(id)[val].split("")
            }
            //we made a async for and type when finish a promise, we use a setTimeOut to handle
            for (let letter of stringToType) {
                // wait until promise is finish
                await new Promise (resolve=>setTimeout(resolve,speed))
                // we add and remove the letter considering the caret
                if(caret){
                    doc.getElementById(id).childNodes[0][val] = action == 'add' ? doc.getElementById(id).childNodes[0][val]+letter
                                                                                : doc.getElementById(id).childNodes[0][val].length==1 ? '\u00a0'
                                                                                : doc.getElementById(id).childNodes[0][val].slice(0,doc.getElementById(id).childNodes[0][val].length-1)
                }else{
                    doc.getElementById(id)[val]= action == 'add' ? doc.getElementById(id)[val]+letter
                                                                : doc.getElementById(id)[val].length==1 ? '\u00a0'
                                                                : doc.getElementById(id)[val].slice(0,doc.getElementById(id)[val].length-1)
                }
            }
        }
        //we make blink the caret and wait
        await this.caretBlink(action,caret,finalState)
    }

    /**
     * _Handle how will be typed and send to typed into a async function_
     * @param {(string|Array<string>)} textOrArrayOfTexts - String or array of string to type
     * @returns {void} - Don't return nothing
     */

    async typingList(textOrArrayOfTexts=this.textTyped){

        //check if only display one string or an array of strings
        let textTypedArray= typeof(textOrArrayOfTexts)=="object" ? textOrArrayOfTexts : [textOrArrayOfTexts]

        //make sure that html element selected is empty
        document.getElementById(this.idContainer).innerHTML=''

        //insert a caret if was declare in option settings
        if(this.caret){
            //create a text node with a space
            let space=document.createTextNode("\u00a0");
            //add text node in the selected html element
            document.getElementById(this.idContainer).appendChild(space);
            //create a span element with a caret (pipe simbol)
            let caret= document.createElement('span');
            //define atribute for the caret element
            caret.setAttribute("id","caret")
            caret.setAttribute("class",this.caretClassName)
            caret.textContent=this.caretSymbol
            //add the new caret into the container
            document.getElementById(this.idContainer).appendChild(caret);
        }

        //iterate the number of repetitions define by user
        for (let i = 0; i < this.repetitions; i++) {
            //We iterate a typed of every string and delete every
            if(i==0 && this.delayTime){
                await this.asyncIteration("start",this.caret,this.finalState)
            }
            for (let [index,textToType] of textTypedArray.entries()) {
                //type a new string in container
                await this.asyncIteration("add",this.caret,this.finalState,textToType)
                //we delete the current string every step with exeption for the las iteration which is define by user
                if(index!=textTypedArray.length-1 || i!=this.repetitions-1){
                    //erase a new string in container
                    await this.asyncIteration("delete",this.caret,this.finalState)
                }else if(index==textTypedArray.length-1 && i==this.repetitions-1 && this.finalStringState=='empty' ){
                    await this.asyncIteration("delete",this.caret,this.blinkCaretRepetitionsAtEnd ? false : true)
                    if(this.blinkCaretRepetitionsAtEnd){
                        //we make blink the caret and wait
                        await this.caretBlink("blink",this.caret,true)
                    }
                }

            }
        }

    }
}