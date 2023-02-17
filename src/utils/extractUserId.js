import jwt from "jwt-decode";
// Esto me da el ID del usuario en sesion :)
const userIdFunction = () => {
    let user;
    try {
        user = localStorage.getItem("user").slice(17, -2);
        console.log("token del usuario: ", user);
    } catch (error) {
        console.log("No estas logueado");
    }

    const verify = jwt(user);
    const id = verify.userId._id

    return id;
};

export default userIdFunction;