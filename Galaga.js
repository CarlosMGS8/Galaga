function Cuadro(){
    let ctx = document.getElementById('canvas').getContext('2d');
    let nave   = new Image(); 
    let Marciano  = new Image();
    let naveEnem = new Image();
    let naveEnem2 = new Image();
    
    nave.src = "Imagenes/naveGuerra.png";
    Marciano.src = "Imagenes/alienPaul.png";
    naveEnem.src = "Imagenes/naveEnemiga.png";
    naveEnem2.src = "Imagenes/naveEnemiga2.png"

    let canvasAncho = ctx.canvas.width;
    let canvasAlto = ctx.canvas.height;

    let enemigos = function(opciones){
        return {
            id: opciones.id,
            x: opciones.x,
            y: opciones.y,
            an: opciones.an,
            al: opciones.al,
            image: opciones.image || Marciano
        }
    }
    let navesEnemigas = [
        new enemigos({id: 'enemigo1', x: 30, y: -200, an: 80, al:80}),
        new enemigos({id: 'enemigo2', x: 170, y: -200, an: 80, al:80}),
        new enemigos({id: 'enemigo3', x: 310, y:  -200, an: 80, al:80}),
        new enemigos({id: 'enemigo4', x: 420, y: -200, an: 80, al:80}),
        new enemigos({id: 'enemigo5', x: 540, y: -200, an: 80, al:80}),
        new enemigos({id: 'enemigo6', x: 30, y: -100, an: 80, al:80, image: naveEnem}),
        new enemigos({id: 'enemigo7', x: 170, y: -100, an: 80, al:80, image: naveEnem}),
        new enemigos({id: 'enemigo8', x: 310, y: -100, an: 80, al:80, image: naveEnem}),
        new enemigos({id: 'enemigo9', x: 420, y: -100, an: 80, al:80, image: naveEnem}),
        new enemigos({id: 'enemigo10', x: 540, y: -100, an: 80, al:80, image: naveEnem}),
        new enemigos({id: 'enemigo10', x: 420, y: 100, an: 80, al:80, image: naveEnem2}),
        new enemigos({id: 'enemigo10', x: 310, y: 100, an: 80, al:80, image: naveEnem2}),
        new enemigos({id: 'enemigo10', x: 170, y: 100, an: 80, al:80, image: naveEnem2}),
        new enemigos({id: 'enemigo10', x: 30, y: 100, an: 80, al:80, image: naveEnem2}),
        new enemigos({id: 'enemigo10', x: 540, y: 100, an: 80, al:80, image: naveEnem2}),

    ];

    let aparecerEnemigos = function (navesEnemigas){
        for (let i = 0; i < navesEnemigas.length; i++){
            let alien = navesEnemigas[i];
            ctx.drawImage(alien.image, alien.x, alien.y += .5, alien.an, alien.al);
        }
    }
    function NaveEspacial(){
        this.y = 500,
        this.x = canvasAncho*.5-55,
        this.an = 100,
        this.direccion,
        this.balitas = [];

        this.mostrar = function(){
            if(this.direccion === 'Izquierda'){
                this.x -= 4;
            }
            else if(this.direccion === 'Derecha'){
                this.x += 4;
            }
            else if(this.direccion === 'Abajo'){
                this.y += 4;
            }
            else if(this.direccion === 'Arriba'){
                this.y -= 4;
            }
            ctx.drawImage(nave, this.x, this.y, 150, 90);

            for(let i = 0; i < this.balitas.length; i++){
                let bala = this.balitas[i];
                ctx.fillRect(bala.x, bala.y -= 7, bala.an, bala.al);
                this.matar(bala, i);
                if(bala.y <= 0){
                this.balitas.splice(i, 1);
                }
            }
            if(nave.x && nave.y === navesEnemigas.y && navesEnemigas.x){
                alert("Pediste");
            }
        }
        this.matar = function(bala){
            for(let i = 0; i < navesEnemigas.length; i++){
                let naveEnemigo = navesEnemigas[i];

                if(bala.x + bala.an >= naveEnemigo.x && bala.x <= naveEnemigo.x + naveEnemigo.an && bala.y >= naveEnemigo.y && bala.y <= naveEnemigo.y + naveEnemigo.al){
                    navesEnemigas.splice(i, 1);
                }
            }
        }
    }
    let naveBatalla = new NaveEspacial();

    function animacion(){
        ctx.clearRect(0, 0, canvasAncho, canvasAlto);
        naveBatalla.mostrar();
        aparecerEnemigos(navesEnemigas);
    }
    setInterval(animacion, 6);

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 37){
            naveBatalla.direccion = 'Izquierda';
        }
    });
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 37){
            naveBatalla.x += 0;
            naveBatalla.direccion = '';
        }
    });
    document.addEventListener('keydown', function(event){
        if(event.keyCode === 39){
            naveBatalla.direccion = 'Derecha';
    }
});
    document.addEventListener('keyup', function(event){
    if(event.keyCode === 39){
        naveBatalla.x -= 0;
        naveBatalla.direccion = '';
}
    });
    document.addEventListener('keydown', function(event){
        if(event.keyCode === 38){
            naveBatalla.direccion = 'Arriba';
        }
    });
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 38){
            naveBatalla.y -= 0;
            naveBatalla.direccion = '';
    }
});
document.addEventListener('keydown', function(event){
    if(event.keyCode === 40){
        naveBatalla.direccion = 'Abajo';
}
    });
    document.addEventListener('keyup', function(event){
        if(event.keyCode === 40){
            naveBatalla.y += 0;
            naveBatalla.direccion = '';
    }
});
    document.addEventListener('keydown', function(event){
        if(event.keyCode === 32){
            naveBatalla.balitas.push({
                x: naveBatalla.x +70,
                y: naveBatalla.y,
                an: 10,
                al: 10
            });
        }
    });
}

window.addEventListener('load', function(){
    Cuadro();
});
