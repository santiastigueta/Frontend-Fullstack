
// esta funcion se ejecuta en cada peticion privada?

const authHeader = () => {
    const user = JSON.parse(localstorage.getItem("user"));
    if(user && user.accessToken){
        return {"x-auth-token": user.accessToken};
    }else{
        return {};
    }
}