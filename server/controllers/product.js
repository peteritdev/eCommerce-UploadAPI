const config = require('../config/config.json');

// OAuth Service
const OAuthService = require('../services/oauthservice.js');
const _oAuthServiceInstance = new OAuthService();

//Utility
const GlobalUtility = require('peters-globallib');
const _utilInstance = new GlobalUtility();

// Multer
const multer = require('multer');
const path = require('path');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

module.exports = {product};

async function product( req, res ){
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

                    let xUploadPath = "";
                    let xFilePhoto = null;
                    let uploadedPhoto = req.files.photo;   
                        
                    if( req.body.index == "1" ){
                        xUploadPath = config.uploadPath.product_1;
                    }else if( req.body.index == "2" ){
                        xUploadPath = config.uploadPath.product_2;
                    }else if( req.body.index == "3" ){
                        xUploadPath = config.uploadPath.product_3;
                    }else if( req.body.index == "4" ){
                        xUploadPath = config.uploadPath.product_4;
                    }else if( req.body.index == "5" ){
                        xUploadPath = config.uploadPath.product_5;
                    }
        
                    let joValidateFile = await _utilInstance.imageFilter( uploadedPhoto );
                    if( joValidateFile.status_code == "00" ){

                        let xNewFileName = ( await _utilInstance.generateRandomFileName('ProductPhoto','')) + path.extname(uploadedPhoto.name);
                        uploadedPhoto.mv( xUploadPath + xNewFileName);
        
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
                            message: "Error: " + joValidateFile.status_msg
                        };
                        res.status(200).send(joResult);
                    }else{
                        joResult = {
                            status: false,
                            message: "Error: " + joValidateFile.err_msg
                        };
                        res.status(200).send(joResult);
                    }            
                }
            }catch( e ){
                joResult = {
                    status: false,
                    message: "Error: " + e
                };
                res.status(500).send(joResult);
            }

        }else{
            joResult = {
                status: false,
                message: "Error: " + oAuthResult.data.err_msg.name
            };
            res.status(500).send(joResult);
        }

    }else{
        joResult = JSON.stringify(oAuthResult);
        res.status(500).send(joResult);
    }
    

}