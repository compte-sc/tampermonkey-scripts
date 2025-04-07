// ==UserScript==
// @name         Auto-fill OVH IDP Code
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remplit automatiquement l'identifiant SSO OVH (5610-1147-08/idp) et clique sur Connexion
// @author       Mathieu via ChatGPT
// @match        https://www.ovh.com/auth/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const INTERVAL = 250;
    const MAX_TRY = 20;
    let attempts = 0;

    const intervalId = setInterval(() => {
        const input = document.querySelector('input[type="text"], input[type="email"]');
        const password = document.querySelector('input[type="password"]');
        const btn = document.querySelector('button[type="submit"]');

        if (input && btn) {
            input.value = "5610-1147-08/idp";
            input.dispatchEvent(new Event('input', { bubbles: true }));
            if (!password || password.value === '') {
                btn.click();
            }
            clearInterval(intervalId);
        } else if (++attempts > MAX_TRY) {
            clearInterval(intervalId);
            console.warn("OVH SSO Auto-fill: l'input n'a pas été trouvé.");
        }
    }, INTERVAL);
})();