let cardComponent = {
    template: '#descripcion',
    props: {
        id: Number,
        titulo:String,
        descripcion:String,
    },
    data: function () {
        return {
            title: 'Title card',
            imagenId: `articulo${this.id}`,
            leftArrowId:`left${this.id}`,
            rightArrowId:`right${this.id}`,
            listaImagenes:this.$parent.db[this.id].imagenes,
            currentImage: '',
            currentIndex: 1,
            directory:'media/cubreShop/'
        }
    },
    mounted() {
        this.currentImage =this.directory+this.listaImagenes[1]
    },
    methods: {
        async cambiarSlide(siguienteImagen) {
            //se bloquean ambos botones cada vez que inicie la funcion 
            let arrowLeft = document.getElementById(this.leftArrowId)
            let arrowRight = document.getElementById(this.rightArrowId)
            let image = document.getElementById(this.imagenId)
            arrowLeft.disabled = true
            arrowRight.disabled = true
            image.style.opacity=0
            await new Promise(resolve => setTimeout(resolve, 400))
            
            let newIndex = ''
            if (siguienteImagen) {
                //check index menor al tamano del arreglo de imagens 
                newIndex = this.currentIndex < this.listaImagenes.length - 1 ? this.currentIndex + 1 : 0
            } else {
                newIndex = this.currentIndex <= 0 ? this.listaImagenes.length - 1 : this.currentIndex - 1
            }
            
            
            this.currentImage = this.directory+this.listaImagenes[newIndex]
            this.currentIndex = newIndex
            await new Promise(resolve => setTimeout(resolve, 125))
            
            image.style.opacity=1
            await new Promise(resolve => setTimeout(resolve, 400))
            arrowLeft.disabled = false
            arrowRight.disabled = false
        }

    }
};

//export the current component as default to use un the module which are the main js 
export default cardComponent;

