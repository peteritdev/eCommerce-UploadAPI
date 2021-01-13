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

const config = require('../config/config.json');

module.exports = {productCategory};

async function productCategory( req, res ){
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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.photo );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.photo;
                        let xNewFileName = ( await __utilInstance.generateRandomFileName('ProductCategoryPhoto','')) + path.extname(uploadedPhoto.name);
                        uploadedPhoto.mv(config.uploadPath.productCategory + xNewFileName);
        
                        joResult = {
                            status: true,
                            message: "File successfully uploaded",
                            data: {
                                name: uploadedPhoto.name,
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
                res.status(500).send(e);
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