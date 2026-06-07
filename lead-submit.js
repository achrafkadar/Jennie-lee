/**
 * Envoi des formulaires vers un webhook Make.com.
 */
(function (global) {
  var phoneRe =
    /^(\+?1[\s.-]?)?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})$/;

  function config() {
    return global.LEAD_CONFIG || {};
  }

  function webhookUrl() {
    var cfg = config();
    var url = cfg.webhookUrl || cfg.apiUrl || "";
    if (url && url.indexOf("http") === 0) return url;
    return "";
  }

  function validatePhone(tel) {
    return phoneRe.test(String(tel || "").replace(/\s/g, ""));
  }

  function validateEmail(email) {
    if (!email || !String(email).trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  }

  function utmFromPage() {
    var params = new URLSearchParams(location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      gclid: params.get("gclid") || "",
      fbclid: params.get("fbclid") || "",
      referrer: document.referrer || "",
      page_url: location.href,
      submitted_at: new Date().toISOString(),
    };
  }

  function submit(payload) {
    var url = webhookUrl();
    if (!url) {
      return Promise.reject(new Error("LEAD_CONFIG.webhookUrl manquant"));
    }

    var body = Object.assign({}, utmFromPage(), payload);

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(function (res) {
      if (res.ok || res.status === 202) {
        return { success: true };
      }
      return res.text().then(function (text) {
        var err = new Error("Envoi impossible (" + res.status + ")");
        err.status = res.status;
        err.detail = text;
        throw err;
      });
    });
  }

  global.LeadSubmit = {
    webhookUrl: webhookUrl,
    apiUrl: webhookUrl,
    validatePhone: validatePhone,
    validateEmail: validateEmail,
    submit: submit,
    utmFromPage: utmFromPage,
  };
})(typeof window !== "undefined" ? window : this);
