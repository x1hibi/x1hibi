class ProductList extends HTMLElement{
    constructor(){
        super()
        this.productList = [
            {name:"Taza",price:150,imgName:"./assets/img/taza.jpeg"},
            {name:"Mochila",price:300,imgName:"./assets/img/mochila.jpeg"},
            {name:"Pluma",price:50,imgName:"./assets/img/pluma.jpeg"},
            {name:"Libreta",price:150,imgName:"./assets/img/libreta.jpeg"},
            {name:"Macbook",price:12000,imgName:"./assets/img/macbook.jpeg"},
        ]
        this._cartList = []
    }

    get cartList(){
        return this._cartList
    }

    set cartList(newCartList){
        this._cartList = newCartList
    }

    connectedCallback() {
        this.renderProductList()
        this.createEventListeners()
    }

    createEventListeners(){
        this.productList.forEach((product,index)=>{
            const button = this.querySelector(`#${product.name}-${index}`)
            button.addEventListener("click",()=>{
                this._cartList.push({
                    name:product.name,
                    price:product.price,
                    img:product.imgName
                })
                this.dispatchEvent(new CustomEvent("product:update-cart",{detail:this.cartList, bubbles:true}))
            })
        })
    }

    createProductNode(product,index){
        return `<article class="product-card">
                <img src="${product.imgName}">
                <section class="product-info">
                    <article>
                        <span>${product.name}</span>
                        <span>${formatCurrency(product.price)} MXN</span>
                    </article>
                    <button id="${product.name}-${index}">Agregar</button>
                </section>
            </article>`
    }

    renderProductList(){
        this.innerHTML = this.productList.reduce((products,product,index)=> products+=this.createProductNode(product,index)
        ,"")
    }

}
customElements.define("product-list",ProductList)