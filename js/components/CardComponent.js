let cardComponent= {
    template: '#card',
    props: {
        title: String, 
        preview:String,
        url:String,
    },
    data: function () {
        return {
            title:'Title card'
        }
    },
    mounted(){
        console.log("nueva tes")
    }
};

//export the current component as default to use un the module which are the main js 
export default cardComponent;

