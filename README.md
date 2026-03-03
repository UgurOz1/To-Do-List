# 🚀 TaskFlow - Profesyonel Proje & Görev Yönetimi

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Proje%20Yönetimi-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?style=for-the-badge&logo=firebase)
![Zustand](https://img.shields.io/badge/Zustand-5.0.6-FF6B6B?style=for-the-badge&logo=zustand)

**Projelerinizi organize edin, fikirlerinizi takip edin, hatalarınızı yönetin!**

[🚀 Canlı Demo](https://uguroz1.github.io/To-Do-List) • [📖 Dokümantasyon](#) • [🐛 Hata Bildir](#)

</div>

---

## ✨ Özellikler

### 🎯 **Proje Yönetimi**
- ✅ Sınırsız proje oluşturma
- ✅ Özelleştirilebilir proje renkleri ve ikonları
- ✅ Proje bazlı görev organizasyonu
- ✅ Proje istatistikleri ve ilerleme takibi
- ✅ Drag & drop ile görevleri projeler arası taşıma

### 🏷️ **Akıllı Etiketleme Sistemi**
- 🐛 **Hata Düzeltmeleri** - Bug tracking
- 💡 **Fikirler** - Yeni özellik fikirleri
- ✨ **Özellikler** - Geliştirme görevleri
- 📝 **Notlar** - Genel notlar ve hatırlatmalar

### 📝 **Gelişmiş Görev Yönetimi**
- ✅ Alt görev (Sub-tasks) desteği
- ✅ Öncelik seviyeleri (Düşük/Orta/Yüksek)
- ✅ Son tarih (Due Date) yönetimi
- ✅ İlerleme çubuğu ve tamamlanma oranı
- ✅ Çoklu filtreleme ve sıralama
- ✅ Tamamlanan görevleri gizleme/gösterme

### 🎨 **Modern Tasarım**
- **Glassmorphism** efektleri
- **Gradient** renk paleti
- **Responsive** tasarım (Mobil, Tablet, Desktop)
- **Smooth animasyonlar**
- **Modern tipografi** (Inter font)
- **PWA desteği** - Offline çalışma

### 🔐 **Güvenli Kimlik Doğrulama**
- Firebase Authentication ile güvenli giriş/kayıt
- E-posta ve şifre tabanlı kimlik doğrulama
- Kullanıcı profil yönetimi
- Gerçek zamanlı oturum yönetimi
- Otomatik oturum durumu takibi

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
4. **Firestore Database** ayarları:
   - Firestore Database oluşturun
   - Güvenlik kurallarını ayarlayın:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /todos/{todoId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null;
       }
       match /projects/{projectId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null;
       }
     }
   }
   ```
5. **Web app** ekleyin ve config bilgilerini alın

#### Environment Variables
`.env` dosyasında Firebase config bilgilerini ayarlayın:
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
│   │   │   └── LoginForm.tsx          # Giriş/Kayıt formu
│   │   ├── Project/
│   │   │   ├── ProjectSidebar.tsx     # Proje listesi sidebar
│   │   │   └── AddProjectModal.tsx    # Proje ekleme modal
│   │   ├── Todo/
│   │   │   ├── AddTodo.tsx            # Görev ekleme (etiketlerle)
│   │   │   ├── TodoItem.tsx           # Görev öğesi (proje taşıma)
│   │   │   └── TodoList.tsx           # Görev listesi (filtreleme)
│   │   ├── Layout.tsx                 # Ana layout
│   │   └── Navbar.tsx                 # Navigasyon
│   ├── config/
│   │   └── firebase.ts                # Firebase konfigürasyonu
│   ├── services/
│   │   ├── authService.ts             # Kimlik doğrulama servisleri
│   │   ├── todoService.ts             # Görev yönetimi servisleri
│   │   └── projectService.ts          # Proje yönetimi servisleri
│   ├── stores/
│   │   ├── authStore.ts               # Auth store (Zustand)
│   │   ├── todoStore.ts               # Todo store (Zustand)
│   │   └── projectStore.ts            # Project store (Zustand)
│   ├── types/
│   │   └── index.ts                   # TypeScript tip tanımları
│   ├── utils/
│   │   ├── errorMessages.ts           # Hata mesajları
│   │   └── storage.ts                 # Local storage yönetimi
│   ├── App.tsx                        # Ana uygulama
│   └── main.tsx                       # Giriş noktası
├── public/                            # Statik dosyalar
└── package.json                       # Proje konfigürasyonu
```

---

## 🎯 Kullanım

### 📂 **Proje Yönetimi**
1. **Proje Oluşturma**:
   - Sol sidebar'daki + butonuna tıklayın
   - Proje adı, açıklama, ikon ve renk seçin
   - "Oluştur" butonuna tıklayın

2. **Proje Seçme**:
   - Sol sidebar'dan projeye tıklayın
   - Sadece o projeye ait görevler görünür

3. **Proje Silme**:
   - Proje üzerine gelin
   - Çöp kutusu ikonuna tıklayın
   - Onaylayın (görevler projesiz olur)

### ✏️ **Görev Yönetimi**
1. **Görev Ekleme**:
   - Görev metnini yazın
   - Etiket seçin (🐛 Hata, 💡 Fikir, ✨ Özellik, 📝 Not)
   - İsteğe bağlı: Son tarih ve öncelik ekleyin
   - "Görev Oluştur" butonuna tıklayın

2. **Görev Taşıma**:
   - Görev üzerindeki klasör ikonuna tıklayın
   - Hedef projeyi seçin

3. **Alt Görev Ekleme**:
   - Görev detaylarını açın (aşağı ok)
   - Alt görev ekleyin

### 🔍 **Filtreleme ve Sıralama**
- **Sıralama**: Tarih, öncelik, son tarih
- **Etiket Filtresi**: Sadece belirli etiketleri göster
- **Tamamlananlar**: Göster/Gizle

---

## 🎨 Özelleştirme

### Renk Paleti
Proje renkleri `src/components/Project/AddProjectModal.tsx` içinde:
```typescript
const PROJECT_COLORS = [
  '#3B82F6', // blue
  '#8B5CF6', // purple
  '#EC4899', // pink
  // ... daha fazla
];
```

### İkonlar
Proje ikonları `src/components/Project/AddProjectModal.tsx` içinde:
```typescript
const PROJECT_ICONS = ['📁', '💼', '🎯', '🚀', '💡', ...];
```

---

## 🤝 Katkıda Bulunma

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** oluşturun

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## 🗺️ Özellik Roadmap

### ✅ Tamamlanan
- ✅ Proje yönetimi sistemi
- ✅ Akıllı etiketleme (Bug, Idea, Feature, Note)
- ✅ Gelişmiş filtreleme ve sıralama
- ✅ Alt görev desteği
- ✅ Öncelik ve son tarih yönetimi
- ✅ Responsive tasarım
- ✅ Firebase entegrasyonu

### 🔄 Geliştirme Aşamasında
- 🔄 Drag & drop ile görev sıralama
- 🔄 Dark/Light tema desteği
- 🔄 Görev arama özelliği
- 🔄 Proje arşivleme

### 📋 Planlanan
- 📋 Takım çalışması özellikleri
- 📋 Görev paylaşımı
- 📋 Bildirimler
- 📋 Mobil uygulama
- 📋 Kanban board görünümü
- 📋 Gantt chart
- 📋 Raporlama ve analitik

---

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI kütüphanesi
- [Firebase](https://firebase.google.com/) - Backend servisleri
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

<div align="center">

**Yapımcı:** [UgurOz1](https://github.com/UgurOz1)

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

</div>


