

//import components
// import cubreComponent from './components/CubreComponent.js';

new Vue({
  el: "#app",
  mounted() {
    console.log("entre a las sedes")
    console.log(this.imss2020)
    this.total('imss')
    this.total('issste')
    this.total('ss')
    this.total('sedesa')
    this.total('ip')
    console.log(this.ip2020)
  },
  data: {
    test:'mounted',
    imss2020:0,
    imss2021:0,
    issste2020:0,
    issste2021:0,
    ss2020:0,
    ss2021:0,
    sedesa2020:0,
    sedesa2021:0,
    ip2021:0,
    ip2020:0,
    imss:[
        {name:'HOSPITAL GENERAL REGIONAL No.1 DR. CARLOS Mc GREGOR SANCHEZ',size2021:45,size2020:62,place:'ZONA SUR CDMX',group:1901},
        {name:'HOSPITAL GENERAL DE ZONA No. 2-A FRANCISCO DEL PASO Y TRONCOSO',size2021:39,size2020:60,place:'ZONA SUR CDMX',group:1902},
        {name:'HOSPITAL GENERAL DE ZONA No 48 SAN PEDRO XALPA',size2021:15,size2020:15,place:'ZONA NORTE CDMX',group:1904},
        {name:'HOSPITAL GENERAL DE ZONA No. 30 IZTACALCO',size2021:25,size2020:51,place:'ZONA SUR CDMX',group:1905},
        {name:'HOSPITAL GENERAL DE ZONA No. 47 VICENTE GUERRERO',size2021:19,size2020:23,place:'ZONA SUR CDMX',group:1907},
        {name:'HOSPITAL GENERAL DE ZONA No. 1-A DR. RODOLFO ANTONIO DE MUCHA MACIAS',size2021:26,size2020:37,place:'ZONA SUR CDMX',group:1908},
        {name:'HOSPITAL GENERAL DE ZONA No. 29 ARAGÓN',size2021:15,size2020:17,place:'ZONA NORTE CDMX',group:1909},
        {name:'HOSPITAL GENERAL REGIONAL No. 2 DR. GUILLERMO FAJARDO ORTIZ VILLA COAPA',size2021:36,size2020:15,place:'ZONA SUR CDMX',group:1931},
        {name:'HOSPITAL GENERAL DE ZONA No. 24 INSURGENTES',size2021:15,size2020:18,place:'ZONA NORTE CDMX',group:1941},
        {name:'HOSPITAL GENERAL DE ZONA No. 27 ALFREDO BADALLO GARCÍA TLATELOLCO',size2021:15,size2020:17,place:'ZONA NORTE CDMX',group:1942},
    ],
    issste:[
      {name:'HOSPITAL GENERAL JOSE MARÍA Y PAVÓN',size2021:6,size2020:0,place:'CDMX',group:1903},
      {name:'HOSPITAL REGIONAL LIC. ADOLFO LÓPEZ MATEOS',size2021:21,size2020:21,place:'CDMX',group:1914},
      {name:'HOSPITAL GENERAL DR. DARÍO FERNÁNDEZ FIERRO',size2021:16,size2020:16,place:'CDMX',group:1915},
      {name:'HOSPITAL GENERAL DR. FERNANDO QUIROZ GUTIÉRREZ',size2021:10,size2020:10,place:'CDMX',group:1916},
      {name:'HOSPITAL REGIONAL 1º DE OCTUBRE',size2021:4,size2020:4,place:'CDMX',group:1940},
      {name:'HOSPITAL REGIONAL IGNACIO ZARAGOZA',size2021:23,size2020:23,place:'CDMX',group:1946},
    ],
    ss:[
      {name:'HOSPITAL GENERAL DE MÉXICO DR. EDUARDO LICEAGA',size2021:66,size2020:62,place:'CDMX',group:1910},
      {name:'HOSPITAL GENERAL DR. MANUEL GEA GONZÁLEZ',size2021:24,size2020:24,place:'CDMX',group:1911},
      {name:'HOSPITAL JUÁREZ DE MÉXICO',size2021:42,size2020:42,place:'CDMX',group:1912},
      {name:'INSTITUTO NACIONAL DE CIENCIAS MÉDICAS Y NUTRICIÓN DR. SALVADOR ZUBIRÁN',size2021:25,size2020:25,place:'CDMX',group:1913},
      {name:'INSTITUTO NACIONAL DE ENFERMEDADES RESPIRATORIAS ISMAEL COSÍO VILLEGAS',size2021:6,size2020:6,place:'CDMX',group:1937},
    ],
    sedesa:[
      {name:'HOSPITAL GENERAL XOCO',size2021:10,size2020:32,place:'CDMX',group:1917},
      {name:'HOSPITAL GENERAL BALBUENA',size2021:11,size2020:28,place:'CDMX',group:1918},
      {name:'HOSPITAL GENERAL IZTAPALAPA',size2021:10,size2020:15,place:'CDMX',group:1919},
      {name:'HOSPITAL GENERAL TICOMÁN',size2021:12,size2020:12,place:'CDMX',group:1926},
      {name:'HOSPITAL GENERAL LA VILLA',size2021:15,size2020:15,place:'CDMX',group:1929},
      {name:'HOSPITAL GENERAL AJUSCO MEDIO DRA. OBDULIA RODRÍGUEZ RODRÍGUEZ',size2021:2,size2020:10,place:'CDMX',group:1967},
      {name:'HOSPITAL GENERAL DR. ENRIQUE CABRERA',size2021:9,size2020:10,place:'CDMX',group:1968},
      {name:'HOSPITAL GENERAL RUBÉN LEÑERO',size2021:5,size2020:10,place:'CDMX',group:1969},
      {name:'HOSPITAL GENERAL DR. GREGORIO SALAS FLORES',size2021:10,size2020:10,place:'CDMX',group:1970},

    ],
    ip:[
      {name:'HOSPITAL ANGELES DE LAS LOMAS',size2021:2,size2020:10,place:'CDMX',group:1927},
      {name:'HOSPITAL DE JESÚS',size2021:12,size2020:12,place:'CDMX',group:1928},
      {name:'CENTRO MEDICO ABC',size2021:3,size2020:4,place:'CDMX',group:1934},
      {name:'FUNDACIÓN CLÍNICA MEDICA SUR',size2021:6,size2020:5,place:'CDMX',group:1936},
      {name:'HOSPITAL ANGELES MOCEL',size2021:2,size2020:5,place:'CDMX',group:1938},
      {name:'FUNDACIÓN MARÍA ANA MIER DE ESCADÓN',size2021:3,size2020:0,place:'CDMX',group:1956},
    ]

  },
  methods: {
    total(name){
      this[name].forEach(sede => {
        this[`${name}2021`]+=sede.size2021
        this[`${name}2020`]+=sede.size2020
      });
    }

    }


});

