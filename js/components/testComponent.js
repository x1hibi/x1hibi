let testComponent= {
    template: '#test',
    props: {
        data: String, 
    },
    data: function () {
        return {
            test:'testVAlue'
        }
    }
};

//export the current component as default to use un the module which are the main js 
export default testComponent;

