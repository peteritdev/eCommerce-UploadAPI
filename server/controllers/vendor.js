const env         = process.env.NODE_ENV || 'development';
const config      = require(__dirname + '/../config/config.json')[env];

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

module.exports = {logo};

async function logo( req, res ){
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

                    let xUploadPath = config.uploadPath.vendor.logo;
                    let xFilePhoto = null;
                    let uploadedPhoto = req.files.file;  
                    
        
                    let joValidateFile = await _utilInstance.imageFilter( uploadedPhoto );
                    if( joValidateFile.status_code == "00" ){

                        let xNewFileName = ( await _utilInstance.generateRandomFileName('Vendor','')) + path.extname(uploadedPhoto.name);
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