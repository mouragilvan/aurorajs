const create = require("./crud/create");
const read = require("./crud/read");
const update = require("./crud/update");
const del = require("./crud/delete");


var DefaultControllerObject = function(collection, resource = null){

        
    this.index = (req, res) => {  
        read(req, res, collection, resource);
    }

   this.store = (req, res)=>{    
        create(req, res, collection);
     }

    this.update = (req, res)=> {        
        update(req, res, collection);
    }

    this.destroy = (req, res)=> {
        del(req,res,collection);
    }

}


module.exports = DefaultControllerObject