const buttonInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', event => {
    window.deferredPrompt = event;
    buttonInstall.classList.remove('hidden');
});

buttonInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
        promptEvent.prompt();
        window.deferredPrompt = null;
        buttonInstall.classList.add('hidden');
    }
});

window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
});
