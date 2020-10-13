let cardComponent= {
    template: '#cubre',
    props: {
        id:Number,
    },
    data: function () {
        return {
            cantidad:0,
            articulo:this.$parent.db[this.id],
            cantidad:0,
            articulosEnCarrito:this.$parent.carrito[this.id].cantidad
        }
    },
    mounted(){
    },
    methods:{
        /**
         * Se agrega un articulo a la lista
         */
        agregar(){
            if(this.cantidad<this.articulo.inventario-this.articulosEnCarrito){
                this.cantidad+=1
                this.actualizarLista()
            }
        },
        /**
         * Quita un articulo de la lista
         */
        quitar(){
            if(this.cantidad>0){
                this.cantidad-=1   
                this.actualizarLista() 
            }
        },
        /**
         * Actualiza la lista del usuario 
         */
        actualizarLista(){
            this.$parent.preCarrito[this.id].cantidad=this.cantidad
        },
    }
        
};

//export the current component as default to use un the module which are the main js 
export default cardComponent;

