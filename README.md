# 🚀 To-Do-List - Modern Görev Yönetimi Uygulaması

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Görev%20Yönetimi-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?style=for-the-badge&logo=firebase)
![Zustand](https://img.shields.io/badge/Zustand-5.0.6-FF6B6B?style=for-the-badge&logo=zustand)

**Modern, hızlı ve kullanıcı dostu görev yönetimi uygulaması**

[🚀 Canlı Demo](https://uguroz1.github.io/To-Do-List) • [📖 Dokümantasyon](#) • [🐛 Hata Bildir](#)

</div>

---

## ✨ Özellikler

### 🎨 **Modern Tasarım**
- **Glassmorphism** efektleri
- **Gradient** renk paleti
- **Responsive** tasarım
- **Smooth animasyonlar**
- **Modern tipografi** (Inter font)

### 🔐 **Güvenli Kimlik Doğrulama**
- Firebase Authentication ile güvenli giriş/kayıt
- E-posta ve şifre tabanlı kimlik doğrulama
- Kullanıcı profil yönetimi (ad, soyad, e-posta)
- Gerçek zamanlı oturum yönetimi
- Otomatik oturum durumu takibi
- Güvenli çıkış işlemi

### 📝 **Görev Yönetimi**
- ✅ Görev ekleme/silme/düzenleme
- ✅ Görev durumu değiştirme (tamamlandı/beklemede)
- ✅ Kullanıcıya özel görevler
- ✅ Firebase Firestore ile gerçek zamanlı senkronizasyon
- ✅ Cloud tabanlı veri saklama
- ✅ Tarihe göre otomatik sıralama
- ✅ Anlık veri güncellemeleri

### 🛡️ **Hata Yönetimi**
- Türkçe hata mesajları
- Firebase hata kodlarının yerelleştirilmesi
- Kullanıcı dostu hata bildirimleri
- Ağ bağlantısı hata yönetimi

### 🛠 **Teknoloji Stack**
- **Frontend**: React 19 + TypeScript
- **Backend**: Firebase (Authentication + Firestore)
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Package Manager**: npm/bun
- **Deployment**: GitHub Pages

---

## 🚀 Hızlı Başlangıç

### 📋 Gereksinimler
- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- [Bun](https://bun.sh/) (önerilen) veya npm

### 🔧 Kurulum

#### Firebase Kurulumu
1. [Firebase Console](https://console.firebase.google.com/)'a gidin
2. Yeni proje oluşturun
3. **Authentication** ayarları:
   - Authentication > Sign-in method > Email/Password'ü etkinleştirin
   - Kullanıcı kayıt işlemini etkinleştirin
4. **Firestore Database** ayarları:
   - Firestore Database oluşturun (test mode'da başlayın)
   - Güvenlik kurallarını ayarlayın
5. **Web app** ekleyin ve config bilgilerini alın

#### Environment Variables
`.env` dosyasında aşağıdaki Firebase config bilgilerini ayarlayın:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Proje Kurulumu
1. **Projeyi klonlayın**
```bash
git clone https://github.com/UgurOz1/To-Do-List.git
cd To-Do-List
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
bun install
```

3. **Environment variables'ı ayarlayın**
```bash
cp .env.example .env
# .env dosyasını Firebase config bilgilerinizle doldurun
```

4. **Development server'ı başlatın**
```bash
npm run dev
```

5. **Tarayıcıda açın**
```
http://localhost:5173
```

### 🏗️ Build & Deploy

```bash
# Production build
npm run build

# Build önizleme
npm run preview

# GitHub Pages'e deploy
npm run deploy
```

---

## 📁 Proje Yapısı

```
To-Do-List/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── LoginForm.tsx      # Giriş/Kayıt formu
│   │   ├── Todo/
│   │   │   ├── AddTodo.tsx        # Görev ekleme
│   │   │   ├── TodoItem.tsx       # Görev öğesi
│   │   │   └── TodoList.tsx       # Görev listesi
│   │   ├── Layout.tsx             # Ana layout
│   │   └── Navbar.tsx             # Navigasyon
│   ├── config/
│   │   └── firebase.ts            # Firebase konfigürasyonu
│   ├── services/
│   │   ├── authService.ts         # Kimlik doğrulama servisleri
│   │   └── todoService.ts         # Görev yönetimi servisleri
│   ├── stores/
│   │   ├── authStore.ts           # Kimlik doğrulama store (Zustand)
│   │   └── todoStore.ts           # Görev yönetimi store (Zustand)
│   ├── types/
│   │   └── index.ts               # TypeScript tip tanımları
│   ├── utils/
│   │   └── errorMessages.ts       # Hata mesajları yönetimi
│   ├── App.tsx                    # Ana uygulama bileşeni
│   └── main.tsx                   # Giriş noktası
├── public/                        # Statik dosyalar
├── dist/                          # Production build
├── .env.example                   # Environment variables örneği
└── package.json                   # Proje konfigürasyonu
```

---

## 🎯 Kullanım

### 🔐 **Hesap İşlemleri**
1. **Kayıt Olma**: 
   - Ad, soyad, e-posta ve şifre bilgilerinizi girin
   - "Kayıt Ol" butonuna tıklayın
   - Otomatik olarak giriş yapılır

2. **Giriş Yapma**:
   - E-posta ve şifrenizi girin
   - "Giriş Yap" butonuna tıklayın
   - Oturum bilgileri otomatik kaydedilir

### � **Göörev Yönetimi**
1. **Görev Ekleme**: 
   - Üst kısımdaki input alanına görev metnini yazın
   - Enter tuşuna basın veya "Ekle" butonuna tıklayın

2. **Görev Tamamlama**: 
   - Görevin yanındaki checkbox'a tıklayın
   - Tamamlanan görevler çizgili görünür

3. **Görev Silme**: 
   - Görevin üzerine geldiğinizde çöp kutusu ikonuna tıklayın
   - Görev kalıcı olarak silinir

### 👤 **Profil Yönetimi**
- Sağ üst köşedeki kullanıcı adınıza tıklayarak çıkış yapabilirsiniz
- Çıkış yaptığınızda tüm veriler güvenli şekilde temizlenir

---

## 🛠️ Geliştirme

### 📦 **Mevcut Scriptler**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Build önizleme
npm run lint         # ESLint kontrolü
npm run deploy       # GitHub Pages'e deploy
```

### 🎨 **Stil Geliştirme**
- Tailwind CSS kullanılıyor
- Custom component'ler `src/index.css`'de tanımlı
- Responsive tasarım için Tailwind breakpoint'leri

### 🔧 **Konfigürasyon Dosyaları**
- `tailwind.config.js` - Tailwind CSS ayarları
- `postcss.config.js` - PostCSS ayarları
- `vite.config.ts` - Vite build ayarları
- `tsconfig.json` - TypeScript konfigürasyonu
- `eslint.config.js` - ESLint kuralları
- `src/config/firebase.ts` - Firebase ayarları

### 🏗️ **Mimari Yaklaşım**
- **Service Layer**: API çağrıları ve iş mantığı ayrımı
- **Store Pattern**: Zustand ile merkezi state yönetimi
- **Error Handling**: Merkezi hata yönetimi ve yerelleştirme
- **Type Safety**: Tam TypeScript desteği
- **Real-time Updates**: Firebase Firestore ile anlık güncellemeler

---

## 🤝 Katkıda Bulunma

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** oluşturun

### 📝 **Kod Standartları**
- TypeScript kullanın
- ESLint kurallarına uyun
- Tailwind CSS class'larını tercih edin
- Component'leri küçük ve yeniden kullanılabilir tutun

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## � Özşellik Roadmap

### ✅ Tamamlanan
- Firebase Authentication entegrasyonu
- Gerçek zamanlı görev senkronizasyonu
- Türkçe hata mesajları
- Responsive tasarım
- GitHub Pages deployment

### 🔄 Geliştirme Aşamasında
- Görev kategorileri
- Görev öncelik seviyeleri
- Görev arama ve filtreleme
- Dark/Light tema desteği

### 📋 Planlanan
- Görev paylaşımı
- Takım çalışması özellikleri
- Mobil uygulama
- Offline destek

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI kütüphanesi
- [Firebase](https://firebase.google.com/) - Backend servisleri
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---


