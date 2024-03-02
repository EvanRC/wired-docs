const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
let deferredPrompt; 
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt 
    event.preventDefault();

    // Stash the event so it can be triggered later 
    deferredPrompt = event; // Corrected variable name

    // Update UI to notify the user they can add to home screen
    butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt 
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        deferredPrompt = null; // Reset the deferredPrompt variable

        // Hide the install button after the prompt is shown 
        butInstall.style.display = 'none';
    }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA has been installed');
    // Optionally, hide the install button when the app is installed
    butInstall.style.display = 'none';
});