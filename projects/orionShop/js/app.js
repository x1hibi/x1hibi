const pages = [
    {buttonElement:homeButton,sectionElement:homeSection, style: 'block'}, 
    {buttonElement:productsButton,sectionElement:productsSection, style: 'grid'},
    {buttonElement:cartButton,sectionElement:cartSection, style: 'flex'}
]

pages.forEach(page=>{
    const buttonNode = page.buttonElement
    buttonNode.addEventListener('click',e => {
        pages.forEach(item=>{

            if(e.target === item.buttonElement){
                item.sectionElement.style.display = item.style
                e.target.classList.add('selected-section')
            }else{
                item.sectionElement.style.display = "none"
                item.buttonElement.classList.remove('selected-section')
            }
        })
    })
})

const customEvents = [
    {name:'product:update-cart',targetElementId:"shopping-cart"},
    {name:'cart:update-cart',targetElementId:"product-list"},
]

customEvents.forEach(event =>{
    mainSection.addEventListener(event.name, e => {
        const targetNode = e.currentTarget.querySelector(event.targetElementId)
        if(targetNode){
            targetNode.cartList = e.detail    
        }
    })
})

function formatCurrency(amount, currency = 'MXN') {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}