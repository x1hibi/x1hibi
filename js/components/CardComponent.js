let cardComponent= {
    template: '#card',
    props: {
        title: String, 
        preview:String,
        url:String,
        tags:Array,
        description:String,
    },
    data: function () {
        return {
            title:'Title card'
        }
    },
    mounted(){
    }
};

//export the current component as default to use un the module which are the main js 
export default cardComponent;

