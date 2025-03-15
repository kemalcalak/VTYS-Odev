# JWT ile Giriş Kontrolü

Bu proje, Next.js kullanılarak geliştirilen modern bir web uygulamasıdır. JWT ile kullanıcı kimlik doğrulama sistemi ve responsive tasarım özellikleriyle donatılmıştır.

## Proje Hakkında

Bu proje, Tailwind CSS ve modern React yapıları kullanılarak geliştirilmiş bir web uygulamasıdır. Proje, kullanıcı girişi, kayıt ve profil yönetimi gibi temel kimlik doğrulama özelliklerini içermektedir.

### Temel Özellikler

- Kullanıcı kimlik doğrulama sistemi (kayıt olma, giriş yapma, çıkış yapma)
- Responsive tasarım (mobil, tablet ve masaüstü cihazlar için optimize edilmiş)
- Modern UI bileşenleri (Tailwind CSS ve shadcn/ui)
- API entegrasyonu

### Teknoloji Stack'i

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI bileşenleri
- **Authentication**: API tabanlı doğrulama sistemi
- **Database**: MongoDB

## Kurulum Adımları

### Ön Gereksinimler

- Node.js (v16 veya üstü)
- npm, yarn veya bun paket yöneticisi

### Kurulum

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/kemalcalak/VTYS-Odev.git
   cd VTYS-Odev
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   # veya
   bun install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   # veya
   yarn dev
   # veya
   pnpm dev
   # veya
   bun dev
   ```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyin.

### Veritabanı Kurulumu

Bu proje MongoDB veritabanı kullanmaktadır. Veritabanını kurmak ve yapılandırmak için aşağıdaki adımları izleyin:

#### MongoDB Kurulumu:

MongoDB Atlas kullanmak isterseniz:

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)'a kaydolun yada [MongoDB Atlas](https://account.mongodb.com/account/login)'a giriş yapın

2. Yeni bir cluster oluşturun (ücretsiz tier seçebilirsiniz)

3. "Database Access" bölümünden bir kullanıcı oluşturun

4. "Network Access" bölümünden IP adresinizi whitelist'e ekleyin (veya `0.0.0.0/0` ile tüm IP'lere izin verin)

5. "Clusters" bölümünde "Connect" butonuna tıklayın ve "Connect your application" seçeneğini seçin

6. Verilen bağlantı URL'sini `.env` dosyanızdaki `MONGO_DB_CONNECTION` değişkenine ekleyin

### .env Dosyası Örneği

Projenin kök dizininde `.env` adında bir dosya oluşturup aşağıdaki içeriği ekleyin:

```
# MongoDB bağlantısı
MONGO_DB_CONNECTION= Sizin MongoDB bağlantınız

# JWT kimlik doğrulama
JWT_SECRET="bu-gizli-bir-anahtar-olmali"
```

**Not:** Gerçek bir ürün ortamında bu gizli anahtarları değiştirdiğinizden ve güvenli bir şekilde sakladığınızdan emin olun.

## Klasör Yapısı

```
VTYS-Odev/
├── app/                
│   ├── api/            # Backend API rotaları
│   ├── auth/           # Kimlik doğrulama sayfaları
│   └── profile/        # Profil sayfası
├── components/         # Yeniden kullanılabilir bileşenler
│   └── ui/             # UI bileşenleri (shadcn/ui)
├── lib/                # Yardımcı fonksiyonlar ve MongoDB bağlantısı
│   ├── db/             # MongoDB bağlantı kodları
│   └── models/         # MongoDB şema ve model tanımları
├── __tests__/          # Jest test dosyaları
│   ├── components/     # Bileşen testleri
│   ├── api/            # API testleri
│   └── integration/    # Entegrasyon testleri
└── __mocks__/          # Test için mock/sahte modüller
```

## Sayfalar ve Bileşenler

### Ana Sayfalar

- **/** - Ana sayfa
- **/auth/login** - Giriş sayfası
- **/auth/register** - Kayıt sayfası
- **/profile** - Kullanıcı profil sayfası (giriş yapılması gerekir)

## Test

### Test Ortamını Kurma

Projenin test ortamını kurmak için aşağıdaki adımları izleyin:

1. Test bağımlılıklarının yüklü olduğundan emin olun:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. Test betiklerini çalıştırın:
   ```bash
   npm test
   # veya
   yarn test
   ```

### Test Kapsamı

Bu projede aşağıdaki test türleri bulunmaktadır:

- **Birim Testleri**: Bireysel bileşenlerin ve fonksiyonların işlevselliğini test eder
- **Entegrasyon Testleri**: Birden fazla bileşenin birlikte çalışmasını test eder
- **API Testleri**: Backend API endpoint'lerinin doğru şekilde çalışıp çalışmadığını kontrol eder
- **End-to-End Testleri**: Kullanıcı deneyimini simüle ederek tam uygulama akışını test eder

### Test Komutları

```bash
# Tüm testleri çalıştır
npm test

# Belirli bir test dosyasını çalıştır
npm test -- path/to/test-file.test.js

# Coverage raporu oluştur
npm test -- --coverage

# Watch modunda testleri çalıştır (değişiklikler olduğunda yeniden çalıştırır)
npm test -- --watch
```

## Dağıtım

Bu Next.js uygulamasını dağıtmak için [Vercel Platform](https://vercel.com/new) kullanabilirsiniz:

1. GitHub, GitLab veya BitBucket'a projenizi yükleyin
2. Vercel'e giriş yapın ve projenizi import edin
3. Gerekli yapılandırmaları yapın ve dağıtımı başlatın

