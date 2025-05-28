#  JUEGO DE LA MEMORIA

Este programa es un juego de memoria interactivo que permite al usuario poner a prueba su capacidad de memoria visual.

Al comenzar, se muestran todas las cartas brevemente para poder memorizarlas. Luego, se giran y el objetivo del jugador es
encontrar todos los pares de emojis iguales, utilizando su memoria para recordar la ubicación de los mismos. El juego finaliza cuando todos los pares fueron hallados.



## ¿Cómo jugar?

1. Observa todas las cartas y memoriza su posición.
2. Las cartas se girarán automáticamente.
3. Por cada turno, selecciona dos cartas para revelarlas.
4. Si los emojis son iguales, las cartas permanecerán visibles.
5. Si los emojis son diferentes, las cartas se ocultarán nuevamente, recuerda memorizar sus posiciones para los próximos turnos.
6. Repite el proceso hasta encontrar todas las parejas de emojis.

### Para jugar ingresa a:
https://julian-casalis.github.io/Trabajo-JavaScript/



## Desarrollo del juego

Este programa fue creado utilizando un fragmento de código base que no funcionaba correctamente. El objetivo principal fue
identificar y corregir errores, además de agregar fragmentos de código faltantes, para lograr que el juego fuera correctamente funcional.

Durante el proceso, revisamos la lógica y su funcionalidad, organizando y agregando partes del código para que las cartas se
muestren correctamente y se reconozcan los pares de emojis. Luego, desarrollamos fragmentos de la lógica para que, al reconocer emojis iguales las cartas se mantengan visibles y, en el caso de ser emojis distintos, las cartas se vuelvan a girar, asegurándonos de que el jugador solo pueda seleccionar dos cartas por turno.

Por último, agregamos funciones como un contador de turnos, el mensaje del principio para confirmar que el usuario está listo para
jugar, el mensaje de felicitaciones por ganar y ajustamos aspectos visuales como los tiempos de reacción y de ejecución de las acciones del juego.

El programa fue desarrollado utilizando JavaScript, HTML y CSS.

### Fragmentos modificados o agregados:

1. Modificamos el código para hacerlo completamente funcional.

 ```javascript
    let primera = null;
    let segunda = null;
    let esperando = false;
    
    function descubrir() {
    if (esperando || this.classList.contains("descubierta")) return;

    this.classList.add("descubierta");

    if (!primera) {
        primera = this;
    } else {
        segunda = this;
        esperando = true;
        turnos++;              
        actualizarContador(); 

        const emoji1 = primera.querySelector(".tarjeta__contenido").textContent;
        const emoji2 = segunda.querySelector(".tarjeta__contenido").textContent;

        if (emoji1 === emoji2) {
        // Son iguales: dejarlas descubiertas
        primera = null;
        segunda = null;
        esperando = false;

        // Verificar si ganaste
        if (document.querySelectorAll(".descubierta").length === totalTarjetas.length) {
            setTimeout(() => {
            mostrarPantallaFinal();
            }, 500);
        }
        } else {
        // Son distintas, ocultarlas otra vez
        setTimeout(() => {
            primera.classList.remove("descubierta");
            segunda.classList.remove("descubierta");
            primera = null;
            segunda = null;
            esperando = false;
        }, 500);
        }
    } 
```


2. Incluimos un contador de movimiento y temporizador.

```html

        <div id="tiempo">
    Tiempo: <span id="tiempoValor">0</span> segundos
    </div>
    
    <div id="contador" style="text-align:center; font-size: 1.5rem; margin-bottom: 1rem;">
        Turnos: <span id="turnos">0</span>
    </div>
```

```javascript

    // Temporizador
    function iniciarTemporizador() {
    
    setTimeout(() => {
        tiempo = 0;
        clearInterval(intervaloTiempo);
        intervaloTiempo = setInterval(() => {
        tiempo++;
        document.getElementById("tiempoValor").textContent = tiempo;
        }, 1000);
    }, 3000); 
    }

    // Contador movimientos
    let turnos = 0;

    function actualizarContador() {
    document.getElementById("turnos").textContent = turnos;

    turnos++;              
    actualizarContador();
```

```css
      #contador{
    color: white;
    text-align:center; 
    font-size: 1.5rem;
     margin-bottom: 1rem;
  }
  
  #tiempo{
    text-align:center;
     font-size: 1.5rem; 
     color: white;
  }
```

3. Ajustamos aspectos para lograr simetría y orden de los elementos.

```css

    .titulo{
    text-align: center;
    margin-top: 5rem;
    margin-bottom: -200px;
    color: white;
    }
    #contador{
        color: white;
    }
    #pantallaFinal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center; 
        align-items: center;
        flex-direction: column;   
        color: #ffffff;
        font-size: 5rem;
        text-align: center;
        z-index: 1000; 
    }

    p{
        justify-content: center;
        margin-top: 18rem;
    }
```

4. Agregamos un mensaje al ganar el juego.

```html

    <div id="pantallaFinal" style="display: none; text-align: center;">
        <p>¡Ganaste!</p>
        <div id="festejo" style="font-size: 3rem; margin-top: 10px;">🎉🎊🎉</div>

        <div id="emojiFallingContainer"></div>
    </div>
```

```javascript

    function mostrarPantallaFinal() {
    
    // Oculta la mesa de juego
    
    document.getElementById("mesa").style.display = "none";
    document.getElementById("titulo").style.display = "none";  
    document.getElementById("contador").style.display = "none";
    
    // Mostrar la pantalla de victoria
    
    document.getElementById("pantallaFinal").style.display = "block";
    
    // Agregar animacion de festejo
    document.getElementById("festejo").style.animation = "festejo 1s infinite";
    generarEmojisQueCaen();
    }

    //Funcion donde se generan los emojis aleatoriamente y luego se muestran
    function generarEmojisQueCaen() {
    const emojis = ["🎉", "🎊", "🥳", "🎈", "🎁","😎", "🍦", "🐸", "👽", "👾", "🤖", "👹"];
    const contenedor = document.getElementById("emojiFallingContainer");
    
    setInterval(() => {
        // Elegir un emoji aleatorio
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Crear un div para el emoji
        const emojiDiv = document.createElement("div");
        emojiDiv.classList.add("emoji-falling");
        emojiDiv.textContent = emoji;
        
        // Posicionar aleatoriamente en la parte superior
        emojiDiv.style.left = `${Math.random() * 100}vw`;
        
        contenedor.appendChild(emojiDiv);
    
        setTimeout(() => {
        emojiDiv.remove();
        }, 3000);
    }, 300);
    }
```

```css
    @keyframes festejo {
        0% {
        transform: scale(1);
        opacity: 1;
        }
        50% {
        transform: scale(1.5);
        opacity: 0.7;
        }
        100% {
        transform: scale(1);
        opacity: 1;
        }
    }

    @keyframes caer {
        0% {
        transform: translateY(-100px);
        opacity: 1;
        }
        100% {
        transform: translateY(100vh);
        opacity: 0;
        }
    }
    
    #festejo {
        animation: festejo 1s infinite;
        font-size: 4rem;
        margin-top: 20px;
    }
    .emoji-falling {
        position: absolute;
        top: -50px;
        font-size: 3rem;
        animation: caer 3s linear infinite;
        will-change: transform;
    }
```



## Visuales del juego

1. Muestra de cartas.

![alt text](<Assets/Muestra cartas.png>)

2. Inicio del juego.

![alt text](<Assets/Inicio juego.png>)

3. Contador y temporizador.

![alt text](<Assets/Cont y temp.png>)

4. Mensaje al ganar.

![alt text](<Assets/Final juego.png>)

