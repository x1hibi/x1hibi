let cardComponent= {
    template: '#carrito',
    props: {
        
    },
    data: function () {
        return {
            pedido:this.$parent.pedido,
            urlWhats:'https://www.youtube.com/watch?v=XRPWdoK9FkY',
        }
    },
    mounted(){
        this.createLink()
    },
    methods:{
        createLink(){
            // se hace un pedido con orden ramdom 
            let pedido=`Pedido %2A%23${Math.round(Math.random()*1000)}%2A%0A`

            //se concatenan todos los articulos
            this.pedido.forEach(articulo => {
                pedido+=`- %5F${articulo}%5F%0A`
            });

            //se agrega el total 
            pedido+=`Total: %2A%24${this.$parent.total}%2A pesos`
            // se manda el pedido de forma ordenada a whatsapp con su api
            this.urlWhats=`https://api.whatsapp.com/send?phone=525532116641&text=${pedido}`
        }
    }
        
};

//export the current component as default to use un the module which are the main js 
export default cardComponent;

