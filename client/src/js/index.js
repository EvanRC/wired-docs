import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { putDb, getDb } from './database';


const main = document.querySelector('#main');
main.innerHTML = ''; // Clears the main element

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Function to remove spinner 
const removeSpinner = () => {
  const spinner = document.querySelector('.spinner'); // select the spinner element
  if (spinner) {
    spinner.remove();
  }
};



// Retrive data from indexDB on DOMcontentLoaded
document.addEventListener('DOMContentLoaded', async () => {
  loadSpinner(); // Call load spinner function here

  const editor = new Editor();
  main.appendChild(editor.element); // Append the editor once created 

  const data = await getDb();
  if (data.lentth > 0) {
    editor.setContent(data[0].content); // Set the editor content
  }

  // Save data to IndexDB on blur event 
editor.element.addEventListener('blur', async () => {
  const content = editor.getContent();
  await putDb(content);
 });

  removeSpinner(); // Remove spinner after setting the content

  // Save data to IndexDB on blur event
  editor.element.on('blur', async () => {
    const content = editor.editor.getValue();
    await putDb(content);
  });
});

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}