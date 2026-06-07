(function (global) {
  var STORAGE_KEY = "flash-site-lang";

  var copy = {
    fr: {
      "meta.title.sell":
        "Évaluation gratuite · Gatineau & Outaouais · FlashImmobilier",
      "meta.title.buy":
        "Acheter en Outaouais · FlashImmobilier · Jennie Lee Desbiens",
      "meta.description":
        "Évaluation gratuite pour vendre, ou accompagnement acheteur à Gatineau et en Outaouais. Jennie Lee Desbiens, courtière FlashImmobilier.",
      "topbar":
        'Réponse garantie sous <span>24 heures</span> · Évaluation <span>100% gratuite</span> · Sans engagement',
      "nav.cta.sell": "Évaluation gratuite",
      "nav.cta.buy": "Parler à Jennie-Lee",
      "nav.lang": "Langue du site",
      "hero.badge": "Gatineau & Outaouais",
      "hero.project": "Quel est votre projet ?",
      "hero.project.aria": "Votre projet",
      "hero.sell.label": "Je veux vendre",
      "hero.sell.hint": "Évaluation gratuite",
      "hero.buy.label": "Je veux acheter",
      "hero.buy.hint": "Accompagnement acheteur",
      "hero.sell.title":
        'Combien vaut<br /><em>vraiment</em> votre<br />propriété ?',
      "hero.sell.sub":
        "Obtenez une évaluation comparative précise pour Gatineau et l’Outaouais, basée sur les ventes réelles dans votre secteur — pas un estimateur automatique, pas de données périmées.",
      "hero.buy.title":
        'Trouvez la maison<br /><em>qu’il vous faut</em><br />en Outaouais',
      "hero.buy.sub":
        "Accompagnement acheteur personnalisé : secteurs, visites, analyse du marché et stratégie d’offre — sans pression, avec une courtière qui connaît Gatineau et les environs.",
      "stat.google": "Note Google · 120 avis",
      "stat.response": "Pour vous répondre",
      "stat.transactions": "Transactions accompagnées",
      "stat.firstHome": "Maison bien accompagnée",
      "form.sell.title": "Recevez votre évaluation gratuite",
      "form.sell.sub": "Quelques informations · Réponse sous 24 h",
      "form.buy.title": "Démarrez votre recherche",
      "form.buy.sub": "Quelques informations · Réponse sous 24 h",
      "form.address": "Adresse de la propriété *",
      "form.firstName": "Prénom *",
      "form.lastName": "Nom de famille *",
      "form.phone": "Numéro de téléphone *",
      "form.email": "Courriel *",
      "form.langLegend": "Langue de préférence *",
      "form.lang.fr": "Français",
      "form.lang.en": "English",
      "form.submit.sell": "Recevoir mon évaluation gratuite",
      "form.submit.buy": "Parler à Jennie-Lee de mon projet",
      "form.trust":
        "Vos informations sont confidentielles et ne seront jamais revendues.",
      "form.placeholder.address": "123 rue Exemple, Gatineau",
      "form.placeholder.email": "vous@exemple.com",
      "err.required": "Requis",
      "err.phone": "Téléphone invalide",
      "err.email": "Courriel invalide",
      "err.lang": "Choisissez FR ou EN",
      "err.webhook":
        "Webhook Make non configuré (lead-config.js). Appelez le 873-353-5386.",
      "err.send":
        "Envoi impossible. Réessayez ou appelez le 873-353-5386.",
      "err.sending": "Envoi en cours…",
      "modal.thanks": "Merci",
      "modal.sub":
        "Votre demande a bien été envoyée. Jennie-Lee vous contacte sous 24 h.",
      "modal.close": "Fermer",
      "bio.tag": "Votre courtière",
      "bio.role":
        "Courtière immobilière · FlashImmobilier · Gatineau & Outaouais",
      "bio.text":
        "Passionnée et à l’écoute, j’accompagne vendeurs et acheteurs en Outaouais avec une analyse de marché honnête — pas d’estimation automatique, pas de pression inutile.",
      "bio.sell":
        "Mon approche : disponibilité, transparence et connaissance fine du terrain local. Que vous vendiez bientôt ou que vous vous renseigniez simplement, vous obtenez une réponse claire sous 24 h.",
      "bio.buy":
        "Mon approche : disponibilité, transparence et connaissance fine du terrain local. Que vous achetiez votre première maison ou que vous changiez de secteur, vous obtenez un accompagnement clair sous 24 h.",
      "bio.h1": "Courtier certifié OACIQ",
      "bio.h2": "5,0 / 5 · 120 avis Google vérifiés",
      "bio.h3": "Gatineau, Aylmer, Hull & environs",
      "bio.cta.sell": "Demander mon évaluation gratuite →",
      "bio.cta.buy": "Parler à Jennie-Lee de mon achat →",
      "bio.imgAlt":
        "Jennie Lee Desbiens, courtière immobilière à Gatineau",
      "how.tag": "Comment ça fonctionne",
      "how.title": "Simple, rapide,<br />sans obligation",
      "how.lead.sell":
        "En 3 étapes, vous obtenez une analyse de marché honnête pour prendre la meilleure décision.",
      "how.lead.buy":
        "En 3 étapes, vous êtes accompagné pour trouver la bonne propriété en Outaouais.",
      "how.sell.s1.title": "Vous remplissez le formulaire",
      "how.sell.s1.desc":
        "Adresse et coordonnées. Aucune visite à planifier à ce stade.",
      "how.sell.s2.title": "On analyse les ventes comparables",
      "how.sell.s2.desc":
        "Transactions réelles dans votre secteur, ajustements selon l’état et le marché actuel.",
      "how.sell.s3.title": "Vous recevez votre rapport",
      "how.sell.s3.desc":
        "Sous 24 h par téléphone. Fourchette de prix réaliste, sans pression de vendre.",
      "how.buy.s1.title": "Vous partagez votre projet",
      "how.buy.s1.desc":
        "On clarifie vos priorités dès le premier contact.",
      "how.buy.s2.title": "On cible les bonnes propriétés",
      "how.buy.s2.desc":
        "Analyse du marché, sélection alignée sur vos critères et visites pertinentes.",
      "how.buy.s3.title": "Vous avancez en confiance",
      "how.buy.s3.desc":
        "Stratégie d’offre, négociation et suivi jusqu’à la transaction — sans pression inutile.",
      "how.right.sell.title":
        "Ce que votre évaluation<br />comprend exactement",
      "how.right.buy.title":
        "Ce que votre accompagnement<br />acheteur comprend",
      "how.f.sell.1":
        "<strong>Analyse des comparables récents</strong> — ventes réelles des 6 derniers mois dans un rayon de 500 m à 1 km.",
      "how.f.sell.2":
        "<strong>Tendance du marché local</strong> — demande actuelle dans votre quartier, délais de vente typiques.",
      "how.f.sell.3":
        "<strong>Fourchette de prix recommandée</strong> — optimisée pour vendre vite et au meilleur prix.",
      "how.f.sell.4":
        "<strong>Conseils de mise en valeur</strong> — les ajustements simples qui ont le plus d’impact sur le prix final.",
      "how.f.buy.1":
        "<strong>Connaissance des secteurs</strong> — Gatineau, Aylmer, Hull et environs : quartiers, prix et délais réels.",
      "how.f.buy.2":
        "<strong>Propriétés alignées sur vos critères</strong> — moins de visites inutiles, plus de clarté sur chaque option.",
      "how.f.buy.3":
        "<strong>Stratégie d’offre et négociation</strong> — pour protéger vos intérêts et avancer au bon rythme.",
      "how.f.buy.4":
        "<strong>Réseau de professionnels</strong> — inspecteurs, notaires et partenaires de confiance au besoin.",
      "how.quote.sell":
        "« Ce n’est pas une estimation automatique. C’est une analyse faite par un courtier qui connaît votre marché. »",
      "how.quote.buy":
        "« Un accompagnement humain, pas un catalogue de maisons. On avance à votre rythme. »",
      "ts.pill": "Témoignages Google",
      "ts.title": "Ce que disent les clients",
      "ts.lead":
        'Note moyenne <strong>5,0 sur 5</strong>, basée sur <strong>120 avis Google vérifiés</strong>.',
      "ts.verified": "Avis Google vérifié",
      "ts.rating": "Basé sur 120 avis Google vérifiés",
      "why.tag.sell": "Pourquoi une évaluation professionnelle",
      "why.title.sell":
        "Les estimateurs automatiques<br />peuvent vous coûter cher",
      "why.tag.buy": "Pourquoi être accompagné",
      "why.title.buy": "Acheter sans courtier<br />peut vous coûter cher",
      "why.sell.1.t": "Prix optimal",
      "why.sell.1.d":
        "Un prix trop bas vous coûte des milliers. Trop haut, la propriété stagne et se dévalorise.",
      "why.sell.2.t": "Bon timing",
      "why.sell.2.d":
        "Savoir si c’est le bon moment pour vendre dans votre quartier précis, pas le marché général.",
      "why.sell.3.t": "Données réelles",
      "why.sell.3.d":
        "Basé sur les transactions réelles, pas des algorithmes avec des données périmées.",
      "why.sell.4.t": "Zéro obligation",
      "why.sell.4.d":
        "L’évaluation est gratuite. Vous décidez de la suite — vendre, attendre, ou vous informer.",
      "why.buy.1.t": "Bonnes opportunités",
      "why.buy.1.d":
        "Accès à des propriétés alignées sur vos critères, pas seulement ce qui est visible en ligne.",
      "why.buy.2.t": "Négociation",
      "why.buy.2.d":
        "Une stratégie d’offre solide pour protéger vos intérêts et éviter les erreurs coûteuses.",
      "why.buy.3.t": "Connaissance locale",
      "why.buy.3.d":
        "Quartiers, prix au pied carré et délais réels — l’essentiel pour acheter au bon moment.",
      "why.buy.4.t": "Zéro obligation",
      "why.buy.4.d":
        "Premier contact gratuit. Vous avancez seulement si l’accompagnement vous convient.",
      "cta.label.sell": "Prêt à savoir",
      "cta.label.buy": "Prêt à avancer",
      "cta.title.sell":
        'Quelle est la valeur<br /><em>réelle</em> de votre propriété ?',
      "cta.title.buy":
        'Trouvons ensemble<br /><em>votre prochaine</em> maison',
      "cta.sub.sell":
        "Gratuit, rapide, sans engagement. Vous obtenez une réponse concrète sous 24 heures.",
      "cta.sub.buy":
        "Gratuit, rapide, sans engagement. Parlez de votre projet d’achat avec Jennie-Lee.",
      "cta.btn.sell": "Obtenir mon évaluation gratuite →",
      "cta.btn.buy": "Démarrer ma recherche →",
      "cta.note": "✓ Gratuit &nbsp;&nbsp; ✓ Sans engagement &nbsp;&nbsp; ✓ Réponse sous 24 h",
      "trust.oaciq": "Courtier certifié OACIQ",
      "trust.privacy": "Données confidentielles",
      "trust.response": "Réponse sous 24 heures",
      "trust.google": "5,0 / 5 · 120 avis Google",
      "footer.line1":
        '© 2026 FlashImmobilier · <a href="#">Politique de confidentialité</a> · <a href="#">Conditions d’utilisation</a>',
      "footer.line2": "Courtier immobilier agréé · OACIQ · Gatineau, Outaouais",
      "footer.line3":
        'Tous droits réservés. Site web fait par <a href="https://www.wenov.ca" target="_blank" rel="noopener noreferrer">Wenov</a>',
    },
    en: {
      "meta.title.sell":
        "Free home evaluation · Gatineau & Outaouais · FlashImmobilier",
      "meta.title.buy":
        "Buy in Outaouais · FlashImmobilier · Jennie Lee Desbiens",
      "meta.description":
        "Free home evaluation to sell, or buyer support in Gatineau and Outaouais. Jennie Lee Desbiens, FlashImmobilier broker.",
      "topbar":
        'Guaranteed response within <span>24 hours</span> · <span>100% free</span> evaluation · No obligation',
      "nav.cta.sell": "Free evaluation",
      "nav.cta.buy": "Talk to Jennie-Lee",
      "nav.lang": "Site language",
      "hero.badge": "Gatineau & Outaouais",
      "hero.project": "What is your project?",
      "hero.project.aria": "Your project",
      "hero.sell.label": "I want to sell",
      "hero.sell.hint": "Free evaluation",
      "hero.buy.label": "I want to buy",
      "hero.buy.hint": "Buyer support",
      "hero.sell.title":
        'How much is your<br />property <em>really</em><br />worth?',
      "hero.sell.sub":
        "Get an accurate comparative market evaluation for Gatineau and Outaouais, based on real sales in your area — not an automated estimator or outdated data.",
      "hero.buy.title":
        'Find the home<br /><em>that fits you</em><br />in Outaouais',
      "hero.buy.sub":
        "Personalized buyer support: neighbourhoods, showings, market analysis and offer strategy — no pressure, with a broker who knows Gatineau and the surrounding area.",
      "stat.google": "Google rating · 120 reviews",
      "stat.response": "To respond to you",
      "stat.transactions": "Transactions supported",
      "stat.firstHome": "First home well supported",
      "form.sell.title": "Get your free evaluation",
      "form.sell.sub": "A few details · Response within 24 h",
      "form.buy.title": "Start your search",
      "form.buy.sub": "A few details · Response within 24 h",
      "form.address": "Property address *",
      "form.firstName": "First name *",
      "form.lastName": "Last name *",
      "form.phone": "Phone number *",
      "form.email": "Email *",
      "form.langLegend": "Preferred language *",
      "form.lang.fr": "Français",
      "form.lang.en": "English",
      "form.submit.sell": "Get my free evaluation",
      "form.submit.buy": "Talk to Jennie-Lee about my project",
      "form.trust": "Your information is confidential and will never be sold.",
      "form.placeholder.address": "123 Example St, Gatineau",
      "form.placeholder.email": "you@example.com",
      "err.required": "Required",
      "err.phone": "Invalid phone number",
      "err.email": "Invalid email",
      "err.lang": "Choose FR or EN",
      "err.webhook":
        "Make webhook not configured (lead-config.js). Call 873-353-5386.",
      "err.send": "Unable to send. Try again or call 873-353-5386.",
      "err.sending": "Sending…",
      "modal.thanks": "Thank you",
      "modal.sub":
        "Your request has been sent. Jennie-Lee will contact you within 24 h.",
      "modal.close": "Close",
      "bio.tag": "Your broker",
      "bio.role":
        "Real estate broker · FlashImmobilier · Gatineau & Outaouais",
      "bio.text":
        "Passionate and attentive, I support sellers and buyers in Outaouais with honest market analysis — no automated estimates, no unnecessary pressure.",
      "bio.sell":
        "My approach: availability, transparency and deep local knowledge. Whether you plan to sell soon or are simply gathering information, you get a clear answer within 24 h.",
      "bio.buy":
        "My approach: availability, transparency and deep local knowledge. Whether you are buying your first home or changing neighbourhoods, you get clear support within 24 h.",
      "bio.h1": "OACIQ certified broker",
      "bio.h2": "5.0 / 5 · 120 verified Google reviews",
      "bio.h3": "Gatineau, Aylmer, Hull & surrounding areas",
      "bio.cta.sell": "Request my free evaluation →",
      "bio.cta.buy": "Talk to Jennie-Lee about buying →",
      "bio.imgAlt": "Jennie Lee Desbiens, real estate broker in Gatineau",
      "how.tag": "How it works",
      "how.title": "Simple, fast,<br />no obligation",
      "how.lead.sell":
        "In 3 steps, you get an honest market analysis to make the best decision.",
      "how.lead.buy":
        "In 3 steps, you are supported to find the right property in Outaouais.",
      "how.sell.s1.title": "You fill out the form",
      "how.sell.s1.desc":
        "Address and contact details. No showing required at this stage.",
      "how.sell.s2.title": "We analyze comparable sales",
      "how.sell.s2.desc":
        "Real transactions in your area, adjusted for condition and current market.",
      "how.sell.s3.title": "You receive your report",
      "how.sell.s3.desc":
        "Within 24 h by phone. A realistic price range, with no pressure to sell.",
      "how.buy.s1.title": "You share your project",
      "how.buy.s1.desc": "We clarify your priorities from the first contact.",
      "how.buy.s2.title": "We target the right properties",
      "how.buy.s2.desc":
        "Market analysis, selection aligned with your criteria and relevant showings.",
      "how.buy.s3.title": "You move forward with confidence",
      "how.buy.s3.desc":
        "Offer strategy, negotiation and follow-up through closing — without unnecessary pressure.",
      "how.right.sell.title": "What your evaluation<br />includes exactly",
      "how.right.buy.title": "What your buyer support<br />includes",
      "how.f.sell.1":
        "<strong>Recent comparable analysis</strong> — real sales from the last 6 months within 500 m to 1 km.",
      "how.f.sell.2":
        "<strong>Local market trend</strong> — current demand in your neighbourhood, typical days on market.",
      "how.f.sell.3":
        "<strong>Recommended price range</strong> — optimized to sell quickly at the best price.",
      "how.f.sell.4":
        "<strong>Staging advice</strong> — simple improvements with the biggest impact on final price.",
      "how.f.buy.1":
        "<strong>Neighbourhood knowledge</strong> — Gatineau, Aylmer, Hull and surrounding areas: prices and real timelines.",
      "how.f.buy.2":
        "<strong>Properties aligned with your criteria</strong> — fewer wasted showings, more clarity on each option.",
      "how.f.buy.3":
        "<strong>Offer strategy and negotiation</strong> — to protect your interests and move at the right pace.",
      "how.f.buy.4":
        "<strong>Professional network</strong> — inspectors, notaries and trusted partners when needed.",
      "how.quote.sell":
        "“This is not an automated estimate. It is an analysis done by a broker who knows your market.”",
      "how.quote.buy":
        "“Human support, not a catalogue of homes. We move at your pace.”",
      "ts.pill": "Google reviews",
      "ts.title": "What clients say",
      "ts.lead":
        'Average rating <strong>5.0 out of 5</strong>, based on <strong>120 verified Google reviews</strong>.',
      "ts.verified": "Verified Google review",
      "ts.rating": "Based on 120 verified Google reviews",
      "why.tag.sell": "Why a professional evaluation",
      "why.title.sell":
        "Automated estimators<br />can cost you money",
      "why.tag.buy": "Why work with a broker",
      "why.title.buy": "Buying without a broker<br />can cost you money",
      "why.sell.1.t": "Optimal price",
      "why.sell.1.d":
        "A price too low costs you thousands. Too high, and the property sits and loses value.",
      "why.sell.2.t": "Right timing",
      "why.sell.2.d":
        "Know whether it is the right time to sell in your specific neighbourhood, not the general market.",
      "why.sell.3.t": "Real data",
      "why.sell.3.d":
        "Based on actual transactions, not algorithms with outdated data.",
      "why.sell.4.t": "Zero obligation",
      "why.sell.4.d":
        "The evaluation is free. You decide what comes next — sell, wait, or gather information.",
      "why.buy.1.t": "Better opportunities",
      "why.buy.1.d":
        "Access to properties aligned with your criteria, not only what is visible online.",
      "why.buy.2.t": "Negotiation",
      "why.buy.2.d":
        "A solid offer strategy to protect your interests and avoid costly mistakes.",
      "why.buy.3.t": "Local knowledge",
      "why.buy.3.d":
        "Neighbourhoods, price per square foot and real timelines — essential to buy at the right time.",
      "why.buy.4.t": "Zero obligation",
      "why.buy.4.d":
        "First contact is free. You move forward only if the support fits your needs.",
      "cta.label.sell": "Ready to find out",
      "cta.label.buy": "Ready to move forward",
      "cta.title.sell":
        'What is the <em>real</em> value<br />of your property?',
      "cta.title.buy":
        'Let’s find<br /><em>your next</em> home together',
      "cta.sub.sell":
        "Free, fast, no obligation. You get a concrete answer within 24 hours.",
      "cta.sub.buy":
        "Free, fast, no obligation. Talk about your buying project with Jennie-Lee.",
      "cta.btn.sell": "Get my free evaluation →",
      "cta.btn.buy": "Start my search →",
      "cta.note": "✓ Free &nbsp;&nbsp; ✓ No obligation &nbsp;&nbsp; ✓ Response within 24 h",
      "trust.oaciq": "OACIQ certified broker",
      "trust.privacy": "Confidential data",
      "trust.response": "Response within 24 hours",
      "trust.google": "5.0 / 5 · 120 Google reviews",
      "footer.line1":
        '© 2026 FlashImmobilier · <a href="#">Privacy policy</a> · <a href="#">Terms of use</a>',
      "footer.line2": "Licensed real estate broker · OACIQ · Gatineau, Outaouais",
      "footer.line3":
        'All rights reserved. Website by <a href="https://www.wenov.ca" target="_blank" rel="noopener noreferrer">Wenov</a>',
    },
  };

  var lang = "fr";

  function normalizeLang(value) {
    return value === "en" ? "en" : "fr";
  }

  function t(key) {
    var table = copy[lang] || copy.fr;
    if (table[key] !== undefined) return table[key];
    return copy.fr[key] || key;
  }

  function syncFormLangRadios() {
    var value = lang === "en" ? "EN" : "FR";
    document.querySelectorAll('input[name="langue"][value="' + value + '"]').forEach(function (input) {
      if (!input.disabled) input.checked = true;
    });
  }

  function updateMeta() {
    var intent = document.body.getAttribute("data-intent") === "buy" ? "buy" : "sell";
    document.documentElement.lang = lang;
    document.title = t("meta.title." + intent);
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta.description"));
  }

  function updateNavCta() {
    var navCta = document.getElementById("nav-cta");
    if (!navCta) return;
    var intent = document.body.getAttribute("data-intent") === "buy" ? "buy" : "sell";
    navCta.textContent = t("nav.cta." + intent);
  }

  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-set-lang") === lang);
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    syncFormLangRadios();
    updateNavCta();
    updateMeta();
  }

  function setLang(nextLang) {
    lang = normalizeLang(nextLang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyStatic();
  }

  function init() {
    var saved = "";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {}
    var params = new URLSearchParams(window.location.search);
    lang = normalizeLang(params.get("lang") || saved || document.documentElement.lang || "fr");
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-set-lang"));
      });
    });
    document.addEventListener("site-intent-changed", updateNavCta);
    applyStatic();
  }

  global.SiteI18n = {
    init: init,
    setLang: setLang,
    t: t,
    getLang: function () {
      return lang;
    },
    apply: applyStatic,
    onIntentChanged: updateNavCta,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
