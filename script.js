const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const header = $(".header");
const progress = $(".progress");
const navbar = $(".navbar");
const btnMenu = $(".btn-menu");
const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== BOTÃO VOLTAR AO TOPO =====
const botaoTopo = document.createElement("button");
botaoTopo.innerHTML = '<i class="bi bi-arrow-up"></i>';
botaoTopo.className = "botao-topo";
botaoTopo.setAttribute("aria-label", "Voltar ao topo");
document.body.appendChild(botaoTopo);
botaoTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== SCROLL: header, progresso e botão do topo (um único listener) =====
let ticking = false;
function aoRolar() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;

  header.classList.toggle("scrolled", y > 50);
  botaoTopo.classList.toggle("visivel", y > 400);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) { requestAnimationFrame(aoRolar); ticking = true; }
}, { passive: true });
aoRolar();

// ===== MENU MOBILE =====
function fecharMenu() {
  navbar.classList.remove("aberto");
  btnMenu.setAttribute("aria-expanded", "false");
  btnMenu.innerHTML = '<i class="bi bi-list"></i>';
}
btnMenu.addEventListener("click", () => {
  const aberto = navbar.classList.toggle("aberto");
  btnMenu.setAttribute("aria-expanded", aberto);
  btnMenu.innerHTML = `<i class="bi bi-${aberto ? "x-lg" : "list"}"></i>`;
});

// ===== ROLAGEM SUAVE + DESTAQUE DO ENDEREÇO =====
const endereco = $("#Address");
let timerDestaque;

$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const destino = $(link.getAttribute("href"));
    if (!destino) return;
    e.preventDefault();
    destino.scrollIntoView({ behavior: reduzMovimento ? "auto" : "smooth" });
    fecharMenu();

    // botões "Compre Já" fazem o mapa brilhar por 3 segundos
    if (destino === endereco) {
      endereco.classList.add("highlight");
      clearTimeout(timerDestaque);
      timerDestaque = setTimeout(() => endereco.classList.remove("highlight"), 3000);
    }
  });
});

// ===== ANIMAÇÃO DE ENTRADA (uma vez, com atraso escalonado) =====
const revelar = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    obs.unobserve(entry.target);
  });
}, { threshold: 0.15 });

$$(".title, .titulo-galeria, .About .row, .box, .passo, .resumo, .Eco h3.sub, .faq details, .eco-cta, .address-container, .box-imagens").forEach(el => {
  // cards da mesma grade entram em sequência
  const irmaos = el.matches(".box, .passo, details") ? [...el.parentElement.children] : [];
  el.style.setProperty("--i", irmaos.indexOf(el) > 0 ? irmaos.indexOf(el) % 4 : 0);
  el.classList.add("hidden");
  revelar.observe(el);
});

// ===== LINK ATIVO NO MENU =====
const links = $$(".navbar a");
const secoes = links.map(a => $(a.getAttribute("href"))).filter(Boolean);

const ativo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });

secoes.forEach(s => ativo.observe(s));

// ===== CARROSSEL: SETAS =====
const carrossel = $(".carrossel-container");
if (carrossel) {
  const caixa = carrossel.parentElement;
  [["esquerda", "&#10094;", -1, "Anterior"], ["direita", "&#10095;", 1, "Próxima"]].forEach(([classe, icone, dir, rotulo]) => {
    const seta = document.createElement("button");
    seta.className = `seta ${classe}`;
    seta.innerHTML = icone;
    seta.setAttribute("aria-label", `Foto ${rotulo.toLowerCase()}`);
    seta.addEventListener("click", () => carrossel.scrollBy({ left: dir * 350, behavior: "smooth" }));
    caixa.appendChild(seta);
  });
}

// ===== LIGHTBOX DA GALERIA =====
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = "<img alt=''>";
document.body.appendChild(lightbox);

const imgLightbox = $("img", lightbox);
$$(".carrossel-container img").forEach(img => {
  img.addEventListener("click", () => {
    imgLightbox.src = img.src;
    imgLightbox.alt = img.alt;
    lightbox.classList.add("open");
  });
});
lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", e => { if (e.key === "Escape") { lightbox.classList.remove("open"); fecharMenu(); } });
