let acces_token;
let userid;
let oefeningid;
let langu;

export function getCurrentToken(callback) {
    if (callback) {
        callback(acces_token)
    } else {
        return acces_token
    }
    
}
export function setToken(token) {
    // console.log("Token has been set: " + token)
    acces_token = token
    console.log(token);
}

export function getUser(callback){
    if (callback) {
        callback(userid)
    } else {
        return userid
    }
}

export function setUser(id){
    userid = id;
    console.log(userid);
}

export function Getoefening(callback){
    if (callback) {
        callback(oefeningid)
    } else {
        return oefeningid
    }
}
export function setoefening(idoef){
    oefeningid = idoef;
    console.log(userid);
}

export function getBeschrijving(callback){
    if (callback) {
        callback(langu)
    } else {
        return langu    
    }
}
export function setBeschrijving(value){
    langu = value;
    console.log(value);
}
