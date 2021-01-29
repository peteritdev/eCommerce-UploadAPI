// OAuth Service
const OAuthService = require('../services/oauthservice.js');
const _oAuthServiceInstance = new OAuthService();

//Utility
const GlobalUtility = require('peters-globallib');
const _utilInstance = new GlobalUtility();

// const GlobalUtility = require('../utils/globalutility.js');
// const __utilInstance = new GlobalUtility();

// Multer
const multer = require('multer');
const path = require('path');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

const env         = process.env.NODE_ENV || 'development';
const config      = require(__dirname + '/../config/config.json')[env];

module.exports = { uploadBrochure, downloadBrochure }

async function downloadBrochure( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );   

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.data.status_code == "00" ){

            try{
                var xDirectoryPath = path.resolve(config.uploadPath.vendor.catalogueBrochure + req.params.file_name);
                res.download( xDirectoryPath, req.params.file_name, (err) => {
                    if( err ){
                        res.status(500).send({
                            message: "Could not download the file. " + err,
                        });
                    }
                } )
            }catch( e ){
                joResult = {
                    status: false,
                    message: "Error download file: " + e
                };
                res.status(500).send(joResult);
            }

        }else{
            console.log(JSON.stringify(oAuthResult));
            joResult = {
                status: false,
                message: "Error 4: " + oAuthResult.data.err_msg.name
            };
            res.status(500).send(joResult);
        }

    }else{
        joResult = JSON.stringify(oAuthResult);
        res.status(500).send(joResult);
    }
}

async function uploadBrochure( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );   

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.data.status_code == "00" ){

            try{
                if( !req.files ){
                    res.send({
                        status: false,
                        message: "No file uploaded"
                    });
                    res.status(200).send(joResult);
                }else{
        
                    let joValidateFile = await _utilInstance.attachmentFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('VendorCatalogueBrochure','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.catalogueBrochure + xNewFileName);
        
                        joResult = {
                            status: true,
                            message: "File successfully uploaded",
                            data: {
                                name: xNewFileName,
                                mimetype: uploadedPhoto.mimetype,
                                size: uploadedPhoto.size
                            }
                        };
                        res.status(200).send(joResult);
                    }else if( joValidateFile.status_code == "-99" ){
                        joResult = {
                            status: false,
                            message: "Error 1: " + joValidateFile.status_msg
                        };
                        res.status(200).send(joResult);
                    }else{
                        console.log(JSON.stringify(joValidateFile));
                        joResult = {
                            status: false,
                            message: "Error 2: " + joValidateFile.err_msg
                        };
                        res.status(200).send(joResult);
                    }            
                }
            }catch( e ){
                joResult = {
                    status: false,
                    message: "Error 3: " + e
                };
                res.status(500).send(joResult);
            }

        }else{
            console.log(JSON.stringify(oAuthResult));
            joResult = {
                status: false,
                message: "Error 4: " + oAuthResult.data.err_msg.name
            };
            res.status(500).send(joResult);
        }

    }else{
        joResult = JSON.stringify(oAuthResult);
        res.status(500).send(joResult);
    }
}