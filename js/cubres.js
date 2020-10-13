//import components
import cubreComponent from './components/CubreComponent.js';
import carritoComponent from './components/CarritoComponent.js';


new Vue({
  el: "#app",
  mounted() {
    this.checkLocalStorage()
  },
  data: {
    seccion:"Inicio",
    dbBackup:[{id:0,producto:"Cubrebocas kn95",titulo:"Cubrebocas kn95",piezas:"(5 piezas)",inventario:11,precio:350,descuento:0,url:"/media/kn95.jpg",imagenes:[]},{id:1,producto:"Caja de kn95",titulo:"Caja de cubrebocas kn95",piezas:"(30 piezas)",inventario:1,precio:2100,descuento:0,url:"/media/kn95Caja.jpg",imagenes:[]},{id:2,producto:"Mascarila con filtro color azul marino",titulo:"Mascarilla azul marino con filtro de respiración, incluye 2 filtros PM 2.5",piezas:"(1 pieza)",inventario:1,precio:150,descuento:0,url:"/media/mascarillaAzul.jpg",imagenes:[]},{id:3,producto:"Mascarila con filtro color negro",titulo:"Mascarilla negro con filtro de respiración, incluye 2 filtros PM 2.5",piezas:"(1 pieza)",inventario:11,precio:150,descuento:0,url:"/media/mascarillaNegra.jpg",imagenes:[]},{id:4,producto:"Mascarila con filtro color rosa",titulo:"Mascarilla rosa con filtro de respiración, incluye 2 filtros PM 2.5",piezas:"(1 pieza)",inventario:4,precio:150,descuento:0,url:"/media/mascarillaRosa.jpg",imagenes:[]},{id:5,producto:"Filtro de carbon activado",titulo:"Filtro PM 2.5 de carbón activado, repuesto para mascarilla",piezas:"(2 piezas)",inventario:36,precio:20,descuento:0,url:"/media/filtros.jpg",imagenes:[]},{id:6,producto:"Cubrebocas uso civil",titulo:"Caja de cubrebocas USO CIVIL",piezas:"(50 piezas)",inventario:2,precio:600,descuento:0,url:"/media/cubreCivil.jpg",imagenes:[]},{id:7,producto:"Cubrebocas uso medico",titulo:"Caja de cubrebocas USO MEDICO",piezas:"(50 piezas)",inventario:1,precio:800,descuento:0,url:"/media/cubreMedico.jpg",imagenes:[]},{id:8,producto:"Lentes de protección",titulo:"Lentes de protección",piezas:"(1 pieza)",inventario:2,precio:60,descuento:0,url:"/media/lentes.jpg",imagenes:[]}],
    db:[
      {
        id:0,
        producto:"Cubrebocas kn95",
        titulo:"Cubrebocas kn95",
        piezas:"(5 piezas)",
        inventario:11,
        precio:350,
        descuento:0,
        url:"/media/kn95.jpg",
        imagenes:[]
      },
      {
        id:1,
        producto:"Caja de kn95",
        titulo:"Caja de cubrebocas kn95",
        piezas:"(30 piezas)",
        inventario:1,
        precio:2100,
        descuento:0,
        url:"/media/kn95Caja.jpg",
        imagenes:[]
      },
      {
        id:2,
        producto:"Mascarila con filtro color azul marino",
        titulo:"Mascarilla azul marino con filtro de respiración, incluye 2 filtros PM 2.5",
        piezas:"(1 pieza)",
        inventario:1,
        precio:150,
        descuento:0,
        url:"/media/mascarillaAzul.jpg",
        imagenes:[]
      },
      {
        id:3,
        producto:"Mascarila con filtro color negro",
        titulo:"Mascarilla negro con filtro de respiración, incluye 2 filtros PM 2.5",
        piezas:"(1 pieza)",
        inventario:11,
        precio:150,
        descuento:0,
        url:"/media/mascarillaNegra.jpg",
        imagenes:[]
      },
      {
        id:4,
        producto:"Mascarila con filtro color rosa",
        titulo:"Mascarilla rosa con filtro de respiración, incluye 2 filtros PM 2.5",
        piezas:"(1 pieza)",
        inventario:4,
        precio:150,
        descuento:0,
        url:"/media/mascarillaRosa.jpg",
        imagenes:[]
      },
      {
        id:5,
        producto:"Filtro de carbon activado",
        titulo:"Filtro PM 2.5 de carbón activado, repuesto para mascarilla",
        piezas:"(2 piezas)",
        inventario:36,
        precio:20,
        descuento:0,
        url:"/media/filtros.jpg",
        imagenes:[]
      },
      {
        id:6,
        producto:"Cubrebocas uso civil",
        titulo:"Caja de cubrebocas USO CIVIL",
        piezas:"(50 piezas)",
        inventario:2,
        precio:600,
        descuento:0,
        url:"/media/cubreCivil.jpg",
        imagenes:[]
      },
      {
        id:7,
        producto:"Cubrebocas uso medico",
        titulo:"Caja de cubrebocas USO MEDICO",
        piezas:"(50 piezas)",
        inventario:1,
        precio:800,
        descuento:0,
        url:"/media/cubreMedico.jpg",
        imagenes:[]
      },
      {
        id:8,
        producto:"Lentes de protección",
        titulo:"Lentes de protección",
        piezas:"(1 pieza)",
        inventario:2,
        precio:60,
        descuento:0,
        url:"/media/lentes.jpg",
        imagenes:[]
      }
    ],
    preCarrito:[{id:0,cantidad:0},{id:1,cantidad:0},{id:2,cantidad:0},{id:3,cantidad:0},{id:4,cantidad:0},{id:5,cantidad:0},{id:6,cantidad:0},{id:7,cantidad:0},{id:8,cantidad:0}],
    carritoBackup:[{id:0,cantidad:0},{id:1,cantidad:0},{id:2,cantidad:0},{id:3,cantidad:0},{id:4,cantidad:0},{id:5,cantidad:0},{id:6,cantidad:0},{id:7,cantidad:0},{id:8,cantidad:0}],
    carrito:[{id:0,cantidad:0},{id:1,cantidad:0},{id:2,cantidad:0},{id:3,cantidad:0},{id:4,cantidad:0},{id:5,cantidad:0},{id:6,cantidad:0},{id:7,cantidad:0},{id:8,cantidad:0}],
    pedido:[],
    articulosEnCarrito:0,
    total:0,
    tituloAlerta:"",
    contenidoAlerta:"",
    botonSalirAlerta:"",
    confirmarAlerta:"",
  },
  methods: {
    checkLocalStorage(){
      let data = localStorage.getItem('cubreShopData');
      // revisamos que exista informacion del usuario
      if(data){
        let userData=JSON.parse(data) 
        this.db=userData.db
        this.carrito=userData.carrito
        this.pedido=userData.pedido
        this.articulosEnCarrito=userData.articulosEnCarrito
        this.total=userData.total
      }
    },
    saveData(){
      //save data of user
      let userData=JSON.stringify({
        db:this.db,
        carrito:this.carrito,
        pedido:this.pedido,
        articulosEnCarrito:this.articulosEnCarrito,
        total:this.total,
      })
      //se guarla info del usuario en el local storage
      localStorage.setItem('cubreShopData',userData );
    }
    ,
    cambiarSeccion(seccionSeleccionada,cerrarMenu=true){
      // cambiamos la seccion
      this.seccion=seccionSeleccionada
      setTimeout(() => {
        let seccionElement=document.getElementsByClassName("visibility")[0]
        document.getElementsByClassName("visibility")[0].style.display=""
      }, 10);
      //llevamos al origen el scroll
      window.scrollTo(0, 0);
      //cerramos el menu
      if(cerrarMenu){
        document.getElementById("menu").click()
      }

      // cambiamos el contenido de la alerta 
      if(seccionSeleccionada=="Tienda"){
        this.tituloAlerta="Ir al carrito"
        this.contenidoAlerta="Desea seguir comprando?"
        this.botonSalirAlerta="Seguir comprando"
        this.confirmarAlerta="Ir al carrito"
      }else if(seccionSeleccionada=="Carrito"){
        this.tituloAlerta="Eliminar carrito"
        this.contenidoAlerta="Desea eliminar los productos del carrito?"
        this.botonSalirAlerta="Cancelar"
        this.confirmarAlerta="Eliminar"
      }

    },
    agregarAlCarrito(cambiarSeccion=true){

      //se agrega el preCarrito al carrito
      this.carrito.forEach((articulo,index)=>{
        articulo.cantidad+=this.preCarrito[index].cantidad
      })

      if(cambiarSeccion){
        this.cambiarSeccion('Carrito',false)
      }
      this.preCarrito.forEach(preArticulo=>{
        preArticulo.cantidad=0
      })

      //se actuliza el carrito y todos los cambios echos se pasan al pedido 
      // se borra el pedido anterior y el numero de articulos
      this.pedido=[]
      this.articulosEnCarrito=0
      this.total=0
      // se revisa cada articulo del carrito y los articulos con cantidad mayor a uno se agregan 
      this.carrito.forEach(articulo => {
          if(articulo.cantidad>0){
            //se agrega uan string con la informacion
            this.pedido.push(`${articulo.cantidad} ${this.db[articulo.id].producto}`)
            //se suman articulos a la variable carrito 
            this.articulosEnCarrito+=articulo.cantidad
            //calcular el total
            this.total+=articulo.cantidad*this.db[articulo.id].precio
            // aplicar cambios en la base de datos local con respecto al carrito
            this.db[articulo.id].inventario-=articulo.cantidad
          }
      });

      this.saveData()

    },
    vaciarCarrito(){
      //set the default value in local variables and save local storage
      this.dbBackup.forEach((articulo,index) => {
        this.db[index].inventario=articulo.inventario
      });
      this.carrito=this.carritoBackup.slice(0)
      this.articulosEnCarrito=0
      this.total=0
      let numeroDeArticulos=this.pedido.length
      for (let index = 0; index < numeroDeArticulos; index++) {
        this.pedido.pop()
      }
      // se espera a que se eliminene de forma correcta todos los articulos de la lista
      setTimeout(() => {
        this.saveData()
      }, 100);

    }

  },
  components: {
    'cubre-component': cubreComponent,
    'carrito-component':carritoComponent,
  }

});

