const crypto = require('crypto');
var config = require('../config/config.json');
const encKey = config.cryptoKey.hashKey
const dateTime = require('node-datetime');
const axios = require('axios');
const IV_LENGTH = 16;
const urlQueryParser = require('query-string');
const { v4: uuidv4 } = require('uuid');

class GlobalUtility{

    async getCurrDateTime(){
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');
        return formatted;
    }

    async encrypt( pVal ){
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encKey), iv);
        let encrypted = cipher.update(pVal);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return ( iv.toString('hex') + ':' + encrypted.toString('hex') );
    }

    async decrypt( pVal ){
        if( pVal != '' ){

            try{
                let textParts = pVal.split(':');
                let iv = Buffer.from(textParts.shift(), 'hex');
                let encryptedText = Buffer.from(textParts.join(':'), 'hex');
                let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encKey), iv);
                let decrypted = decipher.update(encryptedText);
    
                decrypted = Buffer.concat([decrypted, decipher.final()]);
    
                return {
                    status_code: "00",
                    status_msg: "OK",
                    decrypted: decrypted.toString()
                };
            }catch( err ){
                return {
                    status_code: "-99",
                    status_msg: "Error",
                    err_msg: err
                };
            }
            
        }else{
            return {
                status_code: "-99",
                status_msg: "Value that want to decrypt not provided"
            };
        }
    }

    async axiosRequestPost( pUrl, pMethod, pBody ){
        var config = {};            
        let response = await axios.post(pUrl, pBody);
        return response.data;
    }

    async axiosRequest( pUrl, pConfig ){
        
        try{
            const res = await axios.get(pUrl, pConfig);
            return {
                "status_code": "00",
                "status_msg":"OK",
                "data": res.data
            };
        }catch(e){
            console.log(">>> e:" + e);
            return {
                "status_code": "-99",
                "status_msg": "Failed request",
                "err_msg": e.message
            };
        }
        
    }

    async parseQueryString( pString ){
        return urlQueryParser.parse(pString);
    }

    async imageFilter( pFile ){

        try{
            console.log(">>> File : " + pFile.name);
            if (!pFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|PDF|pdf)$/)) {
                return {
                    "status_code": "-99",
                    "status_msg": "File must be image file (PDF,JPG, JPEG, PNG or GIF)"
                };             
            }else{
                return {
                    "status_code": "00",
                    "status_msg": "OK"
                };
            }
        }catch(e){
            return {
                "status_code": "-98",
                "status_msg": "Error",
                "error_msg": e
            };            
        }
        
    }

    async generateUUID4(){
        return uuidv4();
    }

    async momentDateDiffInDay( pStartDate, pEndDate ){
        var startDate = moment( pStartDate, 'YYYY-MM-DD' );
        var endDate = moment(pEndDate, 'YYYY-MM-DD');
        //console.log(startDate);
        var duration = moment.duration( endDate.diff( startDate ) );
        var days = duration.asDays();
        return ( days + 1);
    }

    async momentDateAdd( pDate, pValue, pType ){
        var xNewDate = moment( pDate, 'YYYY-MM-DD' ).add(pValue, pType);
        return xNewDate.format('YYYY-MM-DD');
    }

    async parseQueryString( pString ){
        return urlQueryParser.parse(pString);
    }

    async fileFilter( pFile ){

        try{
            console.log(">>> File : " + pFile.name);
            if (!pFile.name.match(/\.(xls|xlsx|XLS|XLSX|pdf|PDF)$/)) {
                return {
                    "status_code": "-99",
                    "status_msg": "File must be image file (xls,xlsx or pdf)"
                };             
            }else{
                return {
                    "status_code": "00",
                    "status_msg": "OK"
                };
            }
        }catch(e){
            return {
                "status_code": "-98",
                "status_msg": "Error",
                "error_msg": e
            };            
        }
        
    }

    async generateRandomFileName( pPrefix, pSuffix ){
        var xName = ( pPrefix != '' ? ( pPrefix + '-' ) : '' ) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + ( pSuffix != '' ? ( pSuffix + '-' ) : '' );
        return xName;
    }

}

module.exports = GlobalUtility;