
'use strict';
/**
 * ### Create a easy, efficen and cool typing effect inside a html element, we can set atributes like speed, display caret and his speed and symbol, number of loops, all of this for one or more strings.
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
        this.blinkCaretRepetitionsAtEnd=options.blinkCaretRepetitionsAtEnd > 0 ? options.blinkCaretRepetitionsAtEnd*2 : 20
        // Blink caret maded at the start of the typing
        this.blinkCaretRepetitionsAtStart=options.blinkCaretRepetitionsAtStart > 0 ? options.blinkCaretRepetitionsAtStart*2 : 4
        // Time in miliseconds that the appearance and disappearance of the caret
        this.blinkDuration=options.blinkDuration >= 0 ? options.blinkDuration/2 : 450
        // Name of the class created to edit the caret styles
        this.caretClassName= options.caretClassName || 'caret'
        // Display caret
        this.caret=options.caret!=undefined ?  options.caret : true
        // Number of times of appearance and disappearance of the caret when the string has been writed
        this.caretRepetitionsEmptyString=options.caretRepetitionsEmptyString >= 0 ? options.caretRepetitionsEmptyString*2 : 4
        // Number of times of appearance and disappearance of the caret when the string has been erase
        this.caretRepetitionsFullString=options.caretRepetitionsFullString >= 0 ? options.caretRepetitionsFullString*2 : 8
        // Caret symbol
        this.caretSymbol=options.caretSymbol ? options.caretSymbol[0] : '|'
        // delay time in miliseconds before start to run the function 
        this.delayTimeBeforeTyping=options.delayTimeBeforeTyping>0 ? options.delayTimeBeforeTyping : 2000
        // Speed in miliseconds which the char will be removed
        this.deletedSpeed=options.deletedSpeed>=0 ? options.deletedSpeed : 50
        // Indicate if the caret will be static at the end or will be hidden
        this.finalCaretState=options.finalCaretState || 'hidden'
        // Indicate in the last iteration if the content will be deleted ("empty") or remain
        this.finalStringState=options.finalStringState || 'empty'
        // Id of the html element where will be the caret
        this.idCaret=options.idCaret || 'caret'
        // Id of the html element where the text will be typed
        this.idContainer=options.idContainer || 'typingEffect'
        // Number of loops which textTyped will be showed
        this.loops=options.loops>0 ? options.loops : 3
        // A simple String or an array of String will be displayed char by char
        this.textTyped=options.textTyped || ['Typing text effect...','Created by x1hibi 🐲 copyright@2020']
        // Speed in miliseconds which the char will be added
        this.typingSpeed=options.typingSpeed>0 ? options.typingSpeed : 60
    }

    /**
     * This change the opacity of the caret to see the effect of waiting to type 
     * @param {Boolean} caret 
     * @param {String} finalState 
     */

    async caretBlink(caret,caretLoop,finalIteration=false){
        let doc = document
        //we iterate async to wait before add or remove more letters, caret loop / 2 indicate the number of blink will do the caret
        for (let i = 0; i < caretLoop; i++) {
            console.log(caretLoop)
           await new Promise (resolve=>setTimeout(resolve,this.blinkDuration))
           //when caret is present we modify the opacity to create a appere and disappear effect
           if(caret){
                doc.getElementById(this.idCaret).style.opacity=doc.getElementById(this.idCaret).style.opacity=="0" ? "1" : "0"
           }
           //change the opacity of the caret in the last iteration
           if (finalIteration && i==caretLoop-1 && caret) {
                doc.getElementById(this.idCaret).style.opacity=this.finalCaretState=='hidden' ? "0" :"1"
           }
        }
    }

    /**
     * _Iterate every character of a string and modify a html element_
     * @param {string} action - Indicate the action (type | ease) a string
     * @param {boolean} caret - Inidicate if caret will be display
     * @param {string} text - Text which will be typed
     * @returns {void} - Don't return nothing
     */

    async asyncIteration(action,caret,caretLoop,text){
        //shortcuts used to get data from DOM, and make reference a properties from class
        let doc=document
        let id=this.idContainer
        let val=caret ? "nodeValue" : "textContent"
        let stringToType=''
        let speed=action=='add' ? this.typingSpeed : this.deletedSpeed
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
        //we make blink the caret and wait
        await this.caretBlink(caret,caretLoop)
    }

    /**
     * _Handle how will be typed and send to typed into a async function_
     * @param {(string|Array<string>)} textOrArrayOfTexts - String or array of string to type
     * @returns {void} - Don't return nothing
     */

    async typingList(textOrArrayOfTexts=this.textTyped){

        //delay time before typing
        if (this.delayTimeBeforeTyping) {
            await new Promise (resolve=>setTimeout(resolve,this.delayTimeBeforeTyping))
        }
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
            caret.setAttribute("id",this.idCaret)
            caret.setAttribute("class",this.caretClassName)
            caret.textContent=this.caretSymbol
            //add the new caret into the container
            document.getElementById(this.idContainer).appendChild(caret);
        }

        //iterate the number of loops define by user
        for (let i = 0; i < this.loops; i++) {
            //We iterate a typed of every string and delete every
            if(i==0 && this.delayTimeBeforeTyping){
                //we make blink the caret and wait at the begginin before start to type 
                await this.caretBlink(this.caret,this.blinkCaretRepetitionsAtStart,false)
            }
            for (let [index,textToType] of textTypedArray.entries()) {
                //type a new string in container
                await this.asyncIteration("add",this.caret,this.caretRepetitionsFullString,textToType)
                //we delete the current string every step with exeption for the las iteration which is define by user
                if(index!=textTypedArray.length-1 || i!=this.loops-1){
                    //erase a new string in container and continue after finish the action 
                    await this.asyncIteration("delete",this.caret,this.caretRepetitionsEmptyString,'')
                    //only enter when is the last iteration for strings and loops
                }else if(index==textTypedArray.length-1 && i==this.loops-1 && this.finalStringState=='empty' ){
                    //we delete the last string typed
                    await this.asyncIteration("delete",this.caret,this.blinkCaretRepetitionsAtEnd ? false : true)
                    if(this.blinkCaretRepetitionsAtEnd){
                        //we make blink the caret and wait
                        await this.caretBlink(this.caret,this.blinkCaretRepetitionsAtEnd,true)
                    }
                }
            }
        }
    }
}