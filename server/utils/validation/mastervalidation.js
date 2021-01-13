class MasterValidation{
    constructor(){}

    // Document Type
    async listDocumentType( req ){
        req.check("limit","Limit must be a number and can not empty").not().isEmpty().isInt();
        req.check("offset","Offset must be a number and can not empty").not().isEmpty().isInt();
        var errors = req.validationErrors();
        return errors;
    }

    async addDocumentType( req ){
        req.checkBody("name").not().isEmpty().withMessage("Document type name cannot be empty");
        req.checkBody("is_mandatory","Is Mandatory must be a number").not().isEmpty().isInt();
        var errors = req.validationErrors();
        return errors;
    }

    async updateDocumentType( req ){
        req.checkBody("name").not().isEmpty().withMessage("Document type name cannot be empty");
        req.checkBody("is_mandatory","Is Mandatory must be a number").not().isEmpty().isInt();
        req.checkBody("id").not().isEmpty().withMessage("Id cannot be empty");
        var errors = req.validationErrors();
        return errors;
    }

    async deleteDocumentType( req ){
        req.check("id","Id can not empty").not().isEmpty();
        req.check("user_id","User Id can not empty").not().isEmpty();
        var errors = req.validationErrors();
        return errors;
    }


    // Product Category
    async listProductCategory( req ){
        req.check("limit","Limit must be a number and can not empty").not().isEmpty().isInt();
        req.check("offset","Offset must be a number and can not empty").not().isEmpty().isInt();
        var errors = req.validationErrors();
        return errors;
    }

    async addProductCategory( req ){
        req.checkBody("name").not().isEmpty().withMessage("Product Category Name cannot be empty");
        var errors = req.validationErrors();
        return errors;
    }

    async updateProductCategory( req ){
        req.checkBody("name").not().isEmpty().withMessage("Product Category Name cannot be empty");
        req.checkBody("id").not().isEmpty().withMessage("Id cannot be empty");
        var errors = req.validationErrors();
        return errors;
    }

    async deleteProductCategory( req ){
        req.check("id","Id can not empty").not().isEmpty();
        //req.check("user_id","User Id can not empty").not().isEmpty();
        var errors = req.validationErrors();
        return errors;
    }
}

module.exports = MasterValidation;