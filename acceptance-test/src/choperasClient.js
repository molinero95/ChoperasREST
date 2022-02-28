
export function getHealth(){
    return request.get("http://127.0.0.1/system/health");
}

export function getChoperas(){
    return request.get("http://127.0.0.1/api/choperas");
}
