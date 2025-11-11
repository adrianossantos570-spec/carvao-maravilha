// Efeito de destaque suave na seção de endereço ao clicar no botão "Compre Já"
document.querySelectorAll('.btn[href="#Address"]').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    const addressSection = document.querySelector('.Address');
    addressSection.scrollIntoView({ behavior: 'smooth' });

    addressSection.classList.add('highlight');
    setTimeout(() => {
      addressSection.classList.remove('highlight');
    }, 3000);
  });
});
// ===== MENU FIXO E EFEITO AO ROLAR =====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== ROLAGEM SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute("href"));
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== SETAS DO CARROSSEL =====
const carrossel = document.querySelector(".carrossel-container");
if (carrossel) {
  const setaEsq = document.createElement("button");
  const setaDir = document.createElement("button");

  setaEsq.innerHTML = "&#10094;";
  setaDir.innerHTML = "&#10095;";
  setaEsq.className = "seta esquerda";
  setaDir.className = "seta direita";

  carrossel.parentElement.appendChild(setaEsq);
  carrossel.parentElement.appendChild(setaDir);

  const scrollStep = 350;

  setaEsq.addEventListener("click", () => {
    carrossel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });
  setaDir.addEventListener("click", () => {
    carrossel.scrollBy({ left: scrollStep, behavior: "smooth" });
  });
}

// ===== BOTÃO VOLTAR AO TOPO =====
const botaoTopo = document.createElement("button");
botaoTopo.innerText = "⬆";
botaoTopo.classList.add("botao-topo");
document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  botaoTopo.style.display = window.scrollY > 400 ? "block" : "none";
});

// ===== ANIMAÇÃO DE ENTRADA SUAVE =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .box, .cordefundo-text").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ===== EFEITO DE BRILHO NO MAPA =====
const mapa = document.querySelector(".address-container");
if (mapa) {
  const mapaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapa.classList.add("highlight");
      } else {
        mapa.classList.remove("highlight");
      }
    });
  });
  mapaObserver.observe(mapa);
}

  // Cria overlay (fundo escuro) se não existir
  var overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    // estilo inline mínimo para garantir que funcione sem CSS extra
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.45)';
    overlay.style.zIndex = '998';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.transition = 'opacity 0.3s ease, visibility 0.3s';
    document.body.appendChild(overlay);
  }



