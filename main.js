/**
 * Optionnel : URL webhook (Make.com, etc.) en POST JSON.
 * Laissez vide pour ouvrir le courriel avec le résumé du formulaire.
 */
var WEBHOOK_URL = "";

(function () {
  function scrollToForm() {
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

  function validate(data) {
    var err = {};
    if (!data.prenom.trim()) err.prenom = "Le prénom est requis";
    if (!data.nom.trim()) err.nom = "Le nom est requis";
    if (!phoneRe.test(data.telephone.replace(/\s/g, "")))
      err.telephone = "Format téléphone canadien attendu";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      err.email = "Courriel invalide";
    if (data.adresse.trim().length < 5) err.adresse = "L’adresse est requise";
    if (!data.typePropriete) err.typePropriete = "Choisissez un type";
    if (!data.quandVendre) err.quandVendre = "Ce champ est requis";
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
      prenom: fd.get("prenom") || "",
      nom: fd.get("nom") || "",
      telephone: fd.get("telephone") || "",
      email: fd.get("email") || "",
      adresse: fd.get("adresse") || "",
      typePropriete: fd.get("typePropriete") || "",
      quandVendre: fd.get("quandVendre") || "",
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
    var subject = encodeURIComponent("Demande d’estimation gratuite");
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

/** GSAP + ScrollTrigger : hero, scroll, icônes, boutons magnétiques */
(function initLuxMotion() {
  if (typeof gsap === "undefined") return;

  function splitHeroTitle() {
    var title = document.querySelector("[data-hero-title]");
    if (!title || title.dataset.split === "1") return;
    var text = title.textContent.trim();
    var words = text.split(/\s+/);
    title.innerHTML = words
      .map(function (w) {
        return (
          '<span class="hero-word"><span class="hero-word__inner">' +
          w +
          "</span></span>"
        );
      })
      .join("");
    title.dataset.split = "1";
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

    var hero = document.querySelector(".hero-landing");
    if (hero) {
      gsap.to(hero, {
        backgroundPosition: "50% 28%",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
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

  function initHeroIntro() {
    splitHeroTitle();
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    var words = document.querySelectorAll(".hero-word__inner");
    if (words.length) {
      tl.from(words, {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.035,
      });
    }
    tl.from(
      "[data-hero-item]",
      {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
      },
      words.length ? "-=0.35" : 0
    );
  }

  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: reduce)", function () {
    splitHeroTitle();
    gsap.set("[data-hero-item], [data-reveal], .form-lux-card", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    });
  });
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    initHeroIntro();
    initIconFloat();
    initScrollAnimations();
    initMagneticButtons();
  });
})();
