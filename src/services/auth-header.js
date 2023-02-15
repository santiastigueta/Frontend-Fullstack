// esta funcion se ejecuta en cada peticion privada?

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.loginUsuario) {
        console.log("si hay x-auth-token :)")
        return { "x-auth-token": user.loginUsuario };
    } else {
        console.log("no hay x-auth-token")
    }
}


export default authHeader;