const productCategoryController = require('../controllers').productCategory;
const productController = require('../controllers').product;
const vendorController = require('../controllers').vendor;
const vendorDocumentController = require('../controllers').vendorDocument;
const vendorCatalogueController = require('../controllers').vendorCatalogue;

var rootAPIPath = '/api/procurement/v1/upload/';
var rootAPIDownloadPath = '/api/procurement/v1/download/';

module.exports = (app) => {
    app.get(rootAPIPath, (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-method, x-token");
        next();
    });

    // Vendor Document
    app.post( rootAPIPath + 'product_category/photo', productCategoryController.productCategory );
    // Product
    app.post( rootAPIPath + 'product/photo', productController.product );
    //Vendor
    app.post( rootAPIPath + 'vendor/logo', vendorController.logo);

    app.post( rootAPIPath + 'vendor/siup', vendorDocumentController.uploadSIUP);
    app.get( rootAPIDownloadPath + 'vendor/siup/:file_name', vendorDocumentController.downloadSIUP );

    app.post( rootAPIPath + 'vendor/npwp', vendorDocumentController.uploadNPWP);
    app.get( rootAPIDownloadPath + 'vendor/npwp/:file_name', vendorDocumentController.downloadNPWP );

    app.post( rootAPIPath + 'vendor/domisili', vendorDocumentController.uploadDomisili);
    app.get( rootAPIDownloadPath + 'vendor/domisili/:file_name', vendorDocumentController.downloadDomisili );

    app.post( rootAPIPath + 'vendor/tdp', vendorDocumentController.uploadTDP);
    app.get( rootAPIDownloadPath + 'vendor/tdp/:file_name', vendorDocumentController.downloadTDP );

    app.post( rootAPIPath + 'vendor/akta', vendorDocumentController.uploadAkta);
    app.get( rootAPIDownloadPath + 'vendor/akta/:file_name', vendorDocumentController.downloadAkta );

    // Vendor Catalogue
    app.post( rootAPIPath + 'vendor_catalogue/brochure', vendorCatalogueController.uploadBrochure );
    app.get( rootAPIDownloadPath + 'vendor_catalogue/brochure/:file_name', vendorCatalogueController.downloadBrochure );

    // Vendor Quotation
    app.post( rootAPIPath + 'vendor_quotation/file', vendorDocumentController.uploadQuotation );
    app.get( rootAPIDownloadPath + 'vendor_quotation/file/:file_name', vendorDocumentController.downloadQuotation );

    app.get( rootAPIPath + 'getPath', productController.getPath );
    
}