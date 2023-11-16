import React, { useState, useEffect, useCallback } from 'react';
import classes from './Estilos.module.css';


function Formulario(){
    
    const [NomUser,setNomUser]= useState("");
    const [ApeUser,setApeUser]= useState("");
    const [Email,setEmail]= useState("");
    const [Sexo,setSexo]= useState("Masculino");
    const [Mensaje,setMensaje]= useState("");
    const [Condiciones,setCondiciones]= useState(false);
    const [MensajeError,setMensajeError]= useState("");
    const [MensajeError2,setMensajeError2]= useState("");
    const [MensajeError3,setMensajeError3]= useState("");
    const [MensajeError4,setMensajeError4]= useState("");
    const [ButtonActivado,setButtonActivado]= useState(true);

    const url = "http://localhost:5000/users";

    let usuario = {
        nombre: "",
        apellidos: "",
        email: "",
        sexo: "",
        mensaje: "",
        condicion: false
    };

    const handleInputChangeName = (e) =>{
        setNomUser(e.target.value)
    };

    async function fetchPost(url,usuario){
        await fetch(url, {
        method: "POST", 
        body: JSON.stringify(usuario), //convierte JS en JSON
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    
    const validar = useCallback(
        function(){
            if(NomUser.length<=10) {
                setMensajeError("");
            
            } else {
                setMensajeError("El máximo de caracteres para el Nombre son 10");
                
            }
            if(ApeUser.length<=20){
                setMensajeError2("");
            }else{
                setMensajeError2("El máximo de caracteres para el Apellido son 20");
            }
            if(Email.length<=20 && Email.includes("@")){
                setMensajeError3("");
            }else{
                setMensajeError3("El máximo de caracteres para el email son 20 y tiene que incluir @");
            }
            if(Mensaje.length<=500){
                setMensajeError4("");
            }else{
                setMensajeError4("El máximo de caracteres para el mensaje son 500");
            }
            if(NomUser.length <= 10 && ApeUser.length <= 20 && Email.length<=20 && Email.includes("@") && Mensaje.length <= 500 && Condiciones==true){
                setButtonActivado(false)
            }else{
                setButtonActivado(true)
            }
        },
        [NomUser,ApeUser,Email,Mensaje,ButtonActivado]
    )
    useEffect(
        function(){
            validar();
            console.log(NomUser.length)
        },
        [validar]
    )

    const handleInputChangeApe = (e) => {
        setApeUser(e.target.value);
    };

    const handleInputChangeEmail = (e) => {
        setEmail(e.target.value);    
    };

    const handleInputChangeSexo = (e) => {
        setSexo(e.target.value);
    };

    const handleInputChangeMensaje = (e) => {
        setMensaje(e.target.value);
    };

    const handleInputChangeCondiciones = (e) => {
        setCondiciones(e.target.checked);
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(NomUser.length <= 10 && ApeUser.length <= 20 && Email.includes('@') && Mensaje.length <= 500 && Condiciones==true){
            usuario = {
                nombre: NomUser,
                apellidos: ApeUser,
                email: Email,
                sexo: Sexo,
                mensaje: Mensaje,
                condicion: Condiciones
            };
            fetchPost(url,usuario).then((resetear)=>{
                setNomUser("");
                setApeUser("");
                setEmail("");
                setMensaje("");
                setCondiciones(false)
            });
            console.log(usuario);
            alert("Usuario creado")

            
        }
        
    }

    return(

        <form className={classes.form} onSubmit={handleSubmit}>
            <h1>FORMULARIO</h1>
            <div classname="Input">
                <label for="name">Introduce el nombre de usuario: </label>
                <br/>
                <input type="text" value={NomUser} id="name" onChange={handleInputChangeName} />
                <p>{MensajeError}</p>
            </div>
           

            <div class="form-example">
                <label for="email">Introduce el apellido de usuario: </label>
                <br/>
                <input type="email" value={ApeUser} id="email" onChange={handleInputChangeApe} />
                <p>{MensajeError2}</p>
            </div>
         

            <div class="form-example">
                <label for="email">Introduce el email de usuario: </label>
                <br/>
                <input type="email" value={Email} id="email" onChange={handleInputChangeEmail} />
                <p>{MensajeError3}</p>
            </div>
          

            <div>
                <label for="sexo">Introduce el sexo de usuario: </label>
                <select name="sexo" value={Sexo} id="sexo" onChange={handleInputChangeSexo}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Astronauta">Astronauta</option>
                </select>

            </div>
            

            <div>
                <label for="mensaje">Mensaje: </label>
                <br/>
                <textarea name="mensaje" value={Mensaje} onChange={handleInputChangeMensaje} />
                <p>{MensajeError4}</p>
            </div>
            
            <div>
                <label for="aceptaTerminos">Acepto los términos y condiciones: </label>
                <input type="checkbox" name="aceptaTerminos" onChange={handleInputChangeCondiciones} checked={Condiciones}  />
            
            </div>
            <br/>
            
            <div class="form-example">
                <button type="submit" disabled={ButtonActivado} onClick={handleSubmit}>Enviar</button>

            </div>
        </form>
    )
}
export default Formulario;