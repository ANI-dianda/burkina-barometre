const { spawn } = require('child_process');

console.log('🚀 Test de démarrage du serveur...');

const server = spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('❌ Erreur:', error);
});

server.on('close', (code) => {
  console.log(`🔚 Serveur fermé avec le code ${code}`);
});

// Arrêter après 10 secondes pour le test
setTimeout(() => {
  console.log('⏰ Arrêt du test après 10 secondes');
  server.kill();
}, 10000);