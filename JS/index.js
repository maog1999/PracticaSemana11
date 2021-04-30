const nombres = document.getElementById("nombre");
const publicacion = document.getElementById("publicacion");
const btnPublicar = document.getElementById("btnPublicar");
const publicacionesContainer = document.getElementById("publicacionesContainer");

const publicar = () => {
    let nombrePb = nombres.value;
    let publicacionPb = publicacion.value;
    let referencia = database.ref('post').push();
    
    let publica = {
        nombrePb2 : nombrePb,
        textPb : publicacionPb,
        k : referencia.key,
    }
    nombres.value = "";
    publicacion.value = "";

    referencia.set(publica);

}
database.ref('post').on('value',function(data){
    publicacionesContainer.innerHTML = '';
    data.forEach(responder =>{
        let infoRespuesta = responder.val();
        let obj = new publicacionView(infoRespuesta.nombrePb2, infoRespuesta.textPb, infoRespuesta.k);
        publicacionesContainer.appendChild(obj.accionPublicar());
    })
});

btnPublicar.addEventListener('click', publicar);