class publicacionView {
    constructor(nombre, text, kPb){
        this.nombrePb2 = nombre;
        this.textPb = text;
        this.k = kPb;
    }

    accionPublicar = () =>{
        let container = document.createElement('div'); 
        let container2 = document.createElement('div');//para almacenar boton y coms
        let containerFull = document.createElement('div');
        let user = document.createElement('p');
        let publicacion = document.createElement('small');

        //Primer container
        container.appendChild(user);
        container.appendChild(publicacion);

        //Cargar datos
        user.innerHTML = "@" + this.nombrePb2;
        publicacion.innerHTML = this.textPb;

        let respuesta = document.createElement('input');
        respuesta.placeholder = "Escribe una respuesta"
        respuesta.type = "text"

        let btnResponder = document.createElement('button');
        btnResponder.id = "btnRespon";
        btnResponder.innerHTML = "Responder";

        //Segundo container
        container2.appendChild(respuesta);
        container2.appendChild(btnResponder);

        let containerComents = document.createElement('div');

        containerFull.appendChild(container);
        containerFull.appendChild(container2);
        containerFull.appendChild(containerComents);

        database.ref('post/'+ this.k + '/respuestas').on('value',function(data){
            data.forEach(comment =>{
                let comments = comment.val();
                let comments_2 = document.createElement('div');
                let littleComment = document.createElement('p');
                littleComment.innerHTML = comments.responder;

                comments_2.appendChild(littleComment);
                containerComents.appendChild(comments_2);
            }

            )
        });
        btnResponder.addEventListener('click',()=>{
            let respuest = respuesta.value;
            let refe = database.ref('post/' + this.k + '/respuestas').push();
            let comment = {
                responder : respuest,
                k : refe.key,
            }
            respuesta.value ="";
            refe.set(comment);
        });

        
        return containerFull;
    }
}