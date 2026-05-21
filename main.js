/**
 * Optionnel : URL webhook (Make.com, etc.) en POST JSON.
 * Laissez vide pour ouvrir le courriel avec le résumé du formulaire.
 */
var WEBHOOK_URL = "";

/** Parcours Acheter / Vendre — change tout le site selon le choix */
(function initPathMode() {
  var STORAGE_KEY = "flash_immobilier_path";

  var COPY = {
    sell: {
      formKicker: "Estimation gratuite · Réponse en 24h",
      formTitle: "Votre demande d’estimation",
      formLead:
        "Quelques informations — nous préparons votre rapport personnalisé sans engagement.",
      formSubmit: "Recevoir mon estimation gratuite",
      stepsTitle: "Comment obtenir votre estimation gratuite",
      stepsSub: "3 étapes simples, aucune pression",
      aboutCta: "Demander mon estimation →",
      ctaTitle: "Prêt à connaître la valeur de votre propriété?",
      ctaLead: "Recevez votre estimation gratuite en 24h. Aucun engagement.",
      ctaBtn: "Demander mon estimation gratuite",
      thanksMsg:
        "Jennie Lee a bien reçu votre demande. Vous recevrez votre estimation dans les 24h. Pour les demandes urgentes, appelez directement le <a href=\"tel:+18733535386\" style=\"font-weight: 600; color: var(--primary)\">873-353-5386</a>.",
      mailSubject: "Demande d’estimation gratuite — Vendeur",
    },
    buy: {
      formKicker: "Accompagnement acheteur · Réponse en 24h",
      formTitle: "Parlez-nous de votre projet d’achat",
      formLead:
        "Décrivez ce que vous recherchez — Jennie Lee vous guide vers les bonnes propriétés à Gatineau.",
      formSubmit: "Être contacté gratuitement",
      stepsTitle: "Comment se déroule l’accompagnement",
      stepsSub: "Simple, humain, sans pression",
      aboutCta: "Décrire mon projet d’achat →",
      ctaTitle: "Prêt à trouver votre prochaine propriété?",
      ctaLead:
        "Partagez vos critères — Jennie Lee vous répond en 24h pour lancer votre recherche.",
      ctaBtn: "Décrire mon projet d’achat",
      thanksMsg:
        "Jennie Lee a bien reçu votre demande. Elle vous contactera dans les 24h pour préciser vos critères. Urgent? <a href=\"tel:+18733535386\" style=\"font-weight: 600; color: var(--primary)\">873-353-5386</a>.",
      mailSubject: "Demande accompagnement acheteur",
    },
  };

  function scrollToForm() {
    var el = document.getElementById("estimation-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateFormRequired(path) {
    document.querySelectorAll("[data-required-sell]").forEach(function (el) {
      el.required = path === "sell";
    });
    document.querySelectorAll("[data-required-buy]").forEach(function (el) {
      el.required = path === "buy";
    });
  }

  function applyPath(path, opts) {
    opts = opts || {};
    var c = COPY[path];
    if (!c) return;

    document.body.classList.remove("path-pending");
    document.body.dataset.path = path;
    sessionStorage.setItem(STORAGE_KEY, path);

    var intent = document.getElementById("intent");
    if (intent) intent.value = path;

    document.querySelectorAll("[data-copy]").forEach(function (el) {
      var key = el.getAttribute("data-copy");
      if (c[key] == null) return;
      if (key === "thanksMsg") {
        el.innerHTML = c[key];
      } else {
        el.textContent = c[key];
      }
    });

    var stepsSell = document.querySelector("[data-steps-sell]");
    var stepsBuy = document.querySelector("[data-steps-buy]");
    if (stepsSell) stepsSell.hidden = path !== "sell";
    if (stepsBuy) stepsBuy.hidden = path !== "buy";

    var faqSell = document.querySelector("[data-faq-sell]");
    var faqBuy = document.querySelector("[data-faq-buy]");
    if (faqSell) faqSell.hidden = path !== "sell";
    if (faqBuy) faqBuy.hidden = path !== "buy";

    updateFormRequired(path);

    var siteContent = document.getElementById("site-content");
    if (siteContent) {
      siteContent.hidden = false;
      siteContent.classList.add("is-visible");
    }

    var nav = document.querySelector("[data-path-nav]");
    if (nav) nav.removeAttribute("aria-hidden");

    if (!opts.skipScroll) {
      setTimeout(scrollToForm, opts.animateHero ? 480 : 80);
    }

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh(true);
    }

    document.dispatchEvent(
      new CustomEvent("flash:path", { detail: { path: path } })
    );
  }

  function collapseHero(path, done) {
    var hero = document.querySelector(".hero-split");
    if (!hero) {
      done();
      return;
    }

    var panel = hero.querySelector(".hero-split__panel--" + path);
    var other = hero.querySelector(
      ".hero-split__panel--" + (path === "buy" ? "sell" : "buy")
    );

    if (typeof gsap === "undefined") {
      hero.classList.add("hero-split--done");
      document.body.classList.add("hero-resolved");
      done();
      return;
    }

    var tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: function () {
        hero.classList.add("hero-split--done");
        document.body.classList.add("hero-resolved");
        done();
      },
    });

    if (other) tl.to(other, { autoAlpha: 0, duration: 0.4 }, 0);
    if (panel) {
      tl.to(
        panel,
        {
          flex: "1 1 100%",
          duration: 0.55,
        },
        0
      );
    }
    tl.to(hero, { height: 0, minHeight: 0, duration: 0.5 }, 0.2);
  }

  function selectPath(path, opts) {
    opts = opts || {};
    if (path !== "buy" && path !== "sell") return;

    if (document.body.dataset.path === path && !opts.force) {
      scrollToForm();
      return;
    }

    collapseHero(path, function () {
      applyPath(path, {
        skipScroll: opts.skipScroll,
        animateHero: true,
      });
    });
  }

  document.querySelectorAll("[data-path-select]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      selectPath(btn.getAttribute("data-path-select"), {});
    });
  });

  var saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved === "buy" || saved === "sell") {
    var hero = document.querySelector(".hero-split");
    if (hero) hero.classList.add("hero-split--done");
    document.body.classList.add("hero-resolved");
    applyPath(saved, { skipScroll: true });
  }

  window.flashSetPath = selectPath;
  window.flashScrollToForm = scrollToForm;
})();

(function () {
  function scrollToForm() {
    if (window.flashScrollToForm) {
      window.flashScrollToForm();
      return;
    }
    var el = document.getElementById("estimation-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-scroll-form]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToForm();
    });
  });

  var header = document.querySelector(".site-header--lux");
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  var params = new URLSearchParams(window.location.search);
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ].forEach(function (key) {
    var v = params.get(key);
    var input = document.querySelector('input[name="' + key + '"]');
    if (input && v) input.value = v;
  });
  var ref = document.querySelector('input[name="referrer"]');
  if (ref) ref.value = document.referrer || "";
  var page = document.querySelector('input[name="page_url"]');
  if (page) page.value = window.location.href;

  var form = document.getElementById("lead-form");
  var modal = document.getElementById("thanks-modal");
  var thanksName = document.getElementById("thanks-name");

  if (!form) return;

  var phoneRe =
    /^(\+?1[\s.-]?)?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})$/;

  function getPath() {
    return document.body.dataset.path || "sell";
  }

  function validate(data) {
    var err = {};
    var path = getPath();
    if (!data.prenom.trim()) err.prenom = "Le prénom est requis";
    if (!data.nom.trim()) err.nom = "Le nom est requis";
    if (!phoneRe.test(data.telephone.replace(/\s/g, "")))
      err.telephone = "Format téléphone canadien attendu";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      err.email = "Courriel invalide";
    if (!data.typePropriete) err.typePropriete = "Choisissez un type";
    if (path === "sell") {
      if (data.adresse.trim().length < 5) err.adresse = "L’adresse est requise";
      if (!data.quandVendre) err.quandVendre = "Ce champ est requis";
    } else {
      if (data.secteur.trim().length < 2) err.secteur = "Indiquez un secteur ou quartier";
      if (!data.quandAcheter) err.quandAcheter = "Ce champ est requis";
    }
    return err;
  }

  function showErrors(err) {
    document.querySelectorAll("[data-error]").forEach(function (el) {
      el.textContent = "";
    });
    Object.keys(err).forEach(function (key) {
      var el = document.querySelector('[data-error="' + key + '"]');
      if (el) el.textContent = err[key];
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var data = {
      intent: fd.get("intent") || getPath(),
      prenom: fd.get("prenom") || "",
      nom: fd.get("nom") || "",
      telephone: fd.get("telephone") || "",
      email: fd.get("email") || "",
      adresse: fd.get("adresse") || "",
      secteur: fd.get("secteur") || "",
      typePropriete: fd.get("typePropriete") || "",
      quandVendre: fd.get("quandVendre") || "",
      quandAcheter: fd.get("quandAcheter") || "",
      budget: fd.get("budget") || "",
      utm_source: fd.get("utm_source") || "",
      utm_medium: fd.get("utm_medium") || "",
      utm_campaign: fd.get("utm_campaign") || "",
      utm_content: fd.get("utm_content") || "",
      utm_term: fd.get("utm_term") || "",
      referrer: fd.get("referrer") || "",
      page_url: fd.get("page_url") || "",
      gclid: fd.get("gclid") || "",
      fbclid: fd.get("fbclid") || "",
    };

    var err = validate(data);
    if (Object.keys(err).length) {
      showErrors(err);
      return;
    }
    showErrors({});

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    function doneOk() {
      if (thanksName) thanksName.textContent = data.prenom.trim();
      if (modal) modal.classList.add("is-open");
      if (submitBtn) submitBtn.disabled = false;
    }

    function doneFail() {
      alert(
        "L’envoi a échoué. Réessayez ou appelez le 873-353-5386. Si vous utilisez un webhook, vérifiez WEBHOOK_URL dans main.js."
      );
      if (submitBtn) submitBtn.disabled = false;
    }

    if (WEBHOOK_URL && WEBHOOK_URL.indexOf("http") === 0) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            doneOk();
          } else doneFail();
        })
        .catch(doneFail);
      return;
    }

    var lines = Object.keys(data)
      .map(function (k) {
        return k + ": " + data[k];
      })
      .join("\n");
    var path = getPath();
    var subjectText =
      path === "buy"
        ? "Demande accompagnement acheteur"
        : "Demande d’estimation gratuite";
    var subject = encodeURIComponent(subjectText);
    var body = encodeURIComponent(lines);
    window.location.href =
      "mailto:jennieleedesbiens@gmail.com?subject=" + subject + "&body=" + body;
    setTimeout(doneOk, 400);
  });

  var closeBtn = document.querySelector("[data-close-modal]");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("is-open");
    });
  }
})();

/** GSAP + ScrollTrigger : hero split, scroll, icônes, boutons magnétiques */
(function initLuxMotion() {
  if (typeof gsap === "undefined") return;

  function initHeroSplitIntro() {
    if (!document.body.classList.contains("path-pending")) return;
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-split__panel-inner > *", {
      y: 22,
      autoAlpha: 0,
      duration: 0.75,
      stagger: 0.08,
      delay: 0.15,
    });
  }

  function initMagneticButtons() {
    document.querySelectorAll(".btn-magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, {
          x: x * 0.14,
          y: y * 0.12,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
        });
      });
    });
  }

  function initIconFloat() {
    document.querySelectorAll("[data-icon-float]").forEach(function (el, i) {
      gsap.to(el, {
        y: -6,
        rotation: i % 2 === 0 ? 2 : -2,
        duration: 1.8 + i * 0.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.12,
      });
    });
  }

  function initScrollAnimations() {
    if (typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    var progressBar = document.querySelector(".scroll-progress__bar");
    if (progressBar) {
      gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: function (self) {
          gsap.set(progressBar, { scaleX: self.progress });
        },
      });
    }

    var formCard = document.querySelector(".form-lux-card");
    if (formCard) {
      gsap.from(formCard, {
        scrollTrigger: {
          trigger: formCard,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        scale: 0.96,
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }

    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    });

    gsap.utils.toArray("[data-stagger]").forEach(function (container) {
      var ch = gsap.utils.toArray(container.children);
      if (!ch.length) return;
      gsap.from(ch, {
        scrollTrigger: {
          trigger: container,
          start: "top 86%",
          toggleActions: "play none none none",
        },
        y: 28,
        autoAlpha: 0,
        scale: 0.98,
        stagger: 0.1,
        duration: 0.75,
        ease: "power2.out",
      });
    });

    document.querySelectorAll(".lux-card").forEach(function (card) {
      var icon = card.querySelector(".lux-card__icon");
      if (!icon) return;
      card.addEventListener("mouseenter", function () {
        gsap.to(icon, {
          scale: 1.08,
          rotation: 4,
          duration: 0.45,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.55,
          ease: "power2.out",
        });
      });
    });
  }

  function bootScrollFx() {
    initIconFloat();
    initScrollAnimations();
    initMagneticButtons();
  }

  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: reduce)", function () {
    gsap.set("[data-reveal], .form-lux-card, .hero-split__panel-inner", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    });
  });
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    initHeroSplitIntro();
    bootScrollFx();
  });

})();
