class ShoppingCard extends HTMLElement{
    constructor(){
        super()
        this._cartList = []
    }

    set cartList(newCartLis){
        this._cartList = newCartLis
        this.renderShoppingCartCounter()
    }

    get cartList(){
        return this._cartList
    }

    connectedCallback() {

        this.renderDefaultShoppingCart()
    
        this.shoppingCartCounterNode = document.querySelector("#productsCounter")

        this.shoppingCartButtonNode = document.querySelector("#cartButton")

        this.cartList = getCartTotalFromLocalStorage()

        this.shoppingCartButtonNode.addEventListener("click",()=>{
            if(this.cartList.length > 0){
                this.renderShoppingCart()
            }
        })
    }

    updateCartList(event){
        const productName = event.target.parentElement.getAttribute("name")
        const action = event.target.getAttribute("name")
        // actualizar la lista creando una copia actualizada
        const indexProduct = this.cartList.findIndex(product => product.name === productName)
        const updatedCartList = [...this.cartList]
        if(action == "add"){
            updatedCartList.push(this.cartList[indexProduct])
        }else{
            updatedCartList.splice(indexProduct,1)
        }

        this.cartList = updatedCartList

        this.dispatchEvent(new CustomEvent("cart:update-cart",{detail:this.cartList, bubbles:true}))

        if(this.cartList.length === 0){
            this.renderDefaultShoppingCart()
        }else{
            this.renderShoppingCart()
        }

    }

    filterCardList(){

        const filtredCartList = this.cartList.reduce((cart,product)=>{

            if(!cart.some(item => item.name === product.name)){
                cart.push({name:product.name,price:product.price,amount:0,img:product.img})
            }

            const currentProduct = cart.find( item => item.name == product.name)
            currentProduct.amount++
  
            return cart 
        },[])

        let total = filtredCartList.reduce((total,product)=> {
            return total+=product.amount*product.price
        },0)
    
        total = formatCurrency(total)

        const numberOfProducts = filtredCartList.reduce((total,product)=> total+=product.amount,0)

        const numberOfProductsString = numberOfProducts > 1 ? `${numberOfProducts} productos` : `${numberOfProducts} producto`

        return [filtredCartList, total, numberOfProductsString]
    }

    renderDefaultShoppingCart(){
        this.innerHTML = `
            <h2>Resumen</h2>
            <ul>Agrega artículos en tu carrito</ul>
            <p>Total: <span>0 MX</span></p>
        `
    }

    renderShoppingCartCounter(){
        this.shoppingCartCounterNode.textContent =  this.cartList.length 
    }

    createProductNode(product){
        return `
            <ul>
                <li>
                    <section>
                        <img src="${product.img}" width="50px">
                        <span>${product.name.replaceAll("-"," ")}</span>
                    </section>
                    <span>${formatCurrency(product.price)}</span>
                    <span name=${product.name}><button name="remove">➖</button> ${product.amount} <button name="add">➕</button></span>
                </li>
            </ul>
            `
    }

    renderShoppingCart(){

        const [filtredCartList, total, numberOfProductsString] = this.filterCardList()

        const sortedCartList = filtredCartList.sort((a,b)=> a.name.localeCompare(b.name))

        const productsHTML = sortedCartList.reduce((cartProducts,product)=>
             cartProducts+=this.createProductNode(product)
        ,"")

        this.innerHTML = `
            <h2>Resumen</h2>
            <ul>
                <li>
                    <span>PRODUCTO</span>
                    <span>PRECIO (MXN)</span>
                    <span>CANTIDAD</span>
                </li>
            ${productsHTML}</ul>
            <p>Subtotal (${numberOfProductsString}): <span>${total} MXN</span></p>
        `

        this.querySelectorAll("button").forEach(button=>{
            button.addEventListener("click",(e)=>this.updateCartList(e))
        })
        
    }

}

customElements.define("shopping-cart",ShoppingCard)