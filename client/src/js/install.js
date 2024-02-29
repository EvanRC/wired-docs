const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automattically showing the prompt 
    event.preventDefualt();

    // Stash the event so it can be triggered later 
    defferredPrompt = event;

    // Update UI to notify the user they can add to home screen
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (defferredPrompt) {
        // Show the install prompt
        defferredPrompt.prompt();

        // Wait for the user to respond to the prompt 
        const { outcome } = await defferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }


        deferredPrompt = null;

        // Hide the install button after the prompt is shown 
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA has been installed');
    butInstall.style.display = 'none';
});
