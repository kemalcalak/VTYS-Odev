const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js ve .env dosyalarını içeren Next.js uygulamasının yolu
  dir: './',
});

// Jest için özel yapılandırma
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Alias ve modüller için gerekirse yapılandırma
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // Hata mesajlarını daha net görebilmek için
  verbose: true,
  // Sadece değişen dosyaları test etmek için
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // Test çıktılarını daha düzenli görmek için
  reporters: [
    'default'
    // jest-junit modülü kurulu olmadığından kaldırıldı
  ],
};

// createJestConfig, Next.js'in gerektirdiği tüm yapılandırmayı alır
// ve onu Jest'e iletir
module.exports = createJestConfig(customJestConfig);
