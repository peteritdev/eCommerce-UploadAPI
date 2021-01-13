// OAuth Service
const OAuthService = require('../services/oauthservice.js');
const oAuthServiceInstance = new OAuthService();

//Utility
const GlobalUtility = require('peters-globallib');
const _utilInstance = new GlobalUtility();

// const GlobalUtility = require('../utils/globalutility.js');
// const __utilInstance = new GlobalUtility();

// Multer
const multer = require('multer');
const path = require('path');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

const config = require('../config/config.json');

module.exports = { uploadSIUP, uploadNPWP, uploadDomisili, uploadTDP, uploadAkta }

async function uploadSIUP( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );   

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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('siup','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.siup + xNewFileName);
        
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

async function uploadNPWP( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('siup','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.siup + xNewFileName);
        
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

async function uploadDomisili( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('siup','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.siup + xNewFileName);
        
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

async function uploadTDP( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('siup','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.siup + xNewFileName);
        
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

async function uploadAkta( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

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
        
                    let joValidateFile = await _utilInstance.imageFilter( req.files.file );
                    if( joValidateFile.status_code == "00" ){
                        let uploadedPhoto = req.files.file;
                        var xFileExt = path.extname(uploadedPhoto.name);
                        var xNewFileName = await _utilInstance.generateRandomFileName('siup','') + xFileExt;
                        uploadedPhoto.mv(config.uploadPath.vendor.siup + xNewFileName);
        
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