
  // LOGIN DE USUARIO DE INSTAGRAM 
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const res = await fetch("validar.php", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (data.repetido) {
      
          Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "!!El usuario ya partició¡¡",
          backdrop: `
            rgba(123, 0, 0, 0.4)
            url("js/nyan-cat.gif")
            left bottom
            no-repeat
          `
        });
      
    } else {
      localStorage.setItem("usuarioInstagram", username);
      document.getElementById("login").style.display = "none";
      document.querySelector("main").style.display = "block";
      document.getElementById("contador").style.display = "block";
      document.getElementById("tiempo").style.display = "block";
      reparteTarjetas();
    }
  });
});



// Emojis del juego (duplicados para formar pares)
//const grupoTarjetas = ["😎", "🍦", "🐸", "👽", "👾", "🤖", "👹","🤣","🐱‍👓","🐱‍🐉","🐱‍👤","🐱‍🏍","🗿","🦍"];

//emojis del juego, para pruebas
const grupoTarjetas = ["😎", "🍦", "🐸"];

const totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

// Variables de estado
let turnos = 0;
let primera = null;
let segunda = null;
let esperando = false;
let tiempo = 0;
let intervaloTiempo = null;

// 🔹 Mezclar cartas
function barajaTarjetas() {
  return totalTarjetas.sort(() => 0.5 - Math.random());
}

// 🔹 Repartir cartas en la mesa
function reparteTarjetas() {
  const mesa = document.querySelector("#mesa");
  const tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach((elemento) => {
    const tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
      <div class="tarjeta">
        <div class="tarjeta__contenido">${elemento}</div>
      </div>`;
    mesa.appendChild(tarjeta);
  });

  mostrarTemporalmente();
  iniciarTemporizador();
  agregarEventos();
}

// 🔹 Mostrar todas las cartas por 3 segundos al inicio
function mostrarTemporalmente() {
  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => tarjeta.classList.add("descubierta"));

  setTimeout(() => {
    tarjetas.forEach((tarjeta) => tarjeta.classList.remove("descubierta"));
  }, 3000);
}

// 🔹 Temporizador
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

// 🔹 Actualizar contador de turnos
function actualizarContador() {
  document.getElementById("turnos").textContent = turnos;
}

// 🔹 Función principal de descubrimiento de cartas
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
      // Par correcto
      primera = null;
      segunda = null;
      esperando = false;

      if (document.querySelectorAll(".descubierta").length === totalTarjetas.length) {
        setTimeout(() => {
          mostrarPantallaFinal();
        }, 500);
      }
    } else {
      // Par incorrecto
      setTimeout(() => {
        primera.classList.remove("descubierta");
        segunda.classList.remove("descubierta");
        primera = null;
        segunda = null;
        esperando = false;
      }, 500);
    }
  }
}

// 🔹 Agregar eventos a las tarjetas
function agregarEventos() {
  document.querySelectorAll(".tarjeta").forEach((elemento) => {
    elemento.addEventListener("click", descubrir);
  });
}

// 🔹 Mostrar pantalla de victoria
function mostrarPantallaFinal() {
  document.getElementById("mesa").style.display = "none";
  document.getElementById("titulo").style.display = "none";
  document.getElementById("contador").style.display = "none";
  document.getElementById("pantallaFinal").style.display = "block";
  document.getElementById("festejo").style.animation = "festejo 1s infinite";

  clearInterval(intervaloTiempo);
  generarEmojisQueCaen();

  const tiempoFinal = document.createElement("p");
  tiempoFinal.style.fontSize = "2rem";
  tiempoFinal.style.marginTop = "1rem";
  tiempoFinal.style.color = "white";
  tiempoFinal.textContent = `Terminaste en ${tiempo} segundos con ${turnos} turnos.`;
  document.getElementById("pantallaFinal").appendChild(tiempoFinal);

  const btn = document.createElement("button");
  btn.textContent = "Reiniciar";
  btn.style.fontSize = "2rem";
  btn.style.marginTop = "8rem";
    btn.style.background = "#white";
    btn.style.borderRadius = "10px";
    btn.style.color = "#000";
    btn.style.cursor = "pointer";
    btn.style.outline = "none";
    
    btn.onclick = async () => {
    
      const username = localStorage.getItem("usuarioInstagram");
    
    
      if (!username) return;


      const datos = { username, tiempo, movimientos: turnos};

    await fetch("guardar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    localStorage.clear();
    location.reload();
  };

  document.getElementById("pantallaFinal").appendChild(btn);
}
// 🔹 Generar emojis de festejo que caen
function generarEmojisQueCaen() {
  const emojis = ["🎉", "🎊", "🥳", "🎈", "🎁", "😎", "🍦", "🐸", "👽", "👾", "🤖", "👹"];
  const contenedor = document.getElementById("emojiFallingContainer");

  setInterval(() => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const emojiDiv = document.createElement("div");
    emojiDiv.classList.add("emoji-falling");
    emojiDiv.textContent = emoji;
    emojiDiv.style.left = `${Math.random() * 100}vw`;

    contenedor.appendChild(emojiDiv);
    setTimeout(() => {
      emojiDiv.remove();
    }, 3000);
  }, 200);


  
}

// // 🔹 Iniciar el juego
// reparteTarjetas();