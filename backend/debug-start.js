require('dotenv').config();

console.log('🔍 Diagnostic du serveur NestJS');
console.log('📁 Répertoire:', process.cwd());
console.log('🌍 Variables d\'environnement:');
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - PORT:', process.env.PORT);
console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '✅ Définie' : '❌ Manquante');
console.log('  - JWT_SECRET:', process.env.JWT_SECRET ? '✅ Définie' : '❌ Manquante');

try {
  console.log('🚀 Tentative de démarrage...');
  require('./dist/src/main.js');
} catch (error) {
  console.error('❌ Erreur de démarrage:', error.message);
  console.error('📋 Stack trace:', error.stack);
}