!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequire7bc7;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=r);var o=r("h6c0i"),i={form:document.querySelector(".form"),submitBtn:document.querySelector("[data-start]")};function u(e,t){var n=Math.random()>.3;return new Promise((function(r,o){setTimeout((function(){n?r({position:e,delay:t}):o({position:e,delay:t})}),t)}))}i.form.addEventListener("submit",(function(e){e.preventDefault();var t=Number(e.currentTarget.delay.value),n=Number(e.currentTarget.step.value),r=Number(e.currentTarget.amount.value);i.submitBtn.setAttribute("disabled",!0);for(var a=1;a<=r;a+=1)u(a,t).then((function(e){var t=e.position,n=e.delay;o.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;o.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),t+=n;setTimeout((function(){i.submitBtn.removeAttribute("disabled")}),t+2e3)}))}();
//# sourceMappingURL=03-promises.926fd10d.js.map