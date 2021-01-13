const productCategoryController = require('../controllers').productCategory;
const productController = require('../controllers').product;
const vendorController = require('../controllers').vendor;
const vendorDocumentController = require('../controllers').vendorDocument;

var rootAPIPath = '/api/procurement/v1/upload/';

module.exports = (app) => {
    app.get(rootAPIPath, (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    // Product Category
    app.post( rootAPIPath + 'product_category/photo', productCategoryController.productCategory );
    // Product
    app.post( rootAPIPath + 'product/photo', productController.product );
    //Vendor
    app.post( rootAPIPath + 'vendor/logo', vendorController.logo);

    app.post( rootAPIPath + 'vendor/siup', vendorDocumentController.uploadSIUP);
    app.post( rootAPIPath + 'vendor/npwp', vendorDocumentController.uploadNPWP);
    app.post( rootAPIPath + 'vendor/domisili', vendorDocumentController.uploadDomisili);
    app.post( rootAPIPath + 'vendor/tdp', vendorDocumentController.uploadTDP);
    app.post( rootAPIPath + 'vendor/akta', vendorDocumentController.uploadAkta);
    
}