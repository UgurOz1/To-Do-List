# 🚀 To-Do-List - Modern Görev Yönetimi Uygulaması

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Görev%20Yönetimi-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)

**Modern, hızlı ve kullanıcı dostu görev yönetimi uygulaması**

[🚀 Canlı Demo](https://uguroz1.github.io/to-do-list/) • [📖 Dokümantasyon](#) • [🐛 Hata Bildir](#)

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
- Kullanıcı kayıt/giriş sistemi
- LocalStorage ile veri saklama
- Oturum yönetimi

### 📝 **Görev Yönetimi**
- ✅ Görev ekleme/silme
- ✅ Görev durumu değiştirme
- ✅ Kullanıcıya özel görevler
- ✅ Gerçek zamanlı güncelleme

### 🛠 **Teknoloji Stack**
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Package Manager**: Bun

---

## 🚀 Hızlı Başlangıç

### 📋 Gereksinimler
- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- [Bun](https://bun.sh/) (önerilen) veya npm

### 🔧 Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/UgurOz1/To-Do-List.git
cd taskflow
```

2. **Bağımlılıkları yükleyin**
```bash
bun install
# veya
npm install
```

3. **Development server'ı başlatın**
```bash
bun run dev
# veya
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

### 🏗️ Build

```bash
# Production build
bun run build

# Build önizleme
bun run preview
```

### 🚀 GitHub Pages'e Deploy

```bash
# Manuel deploy (gh-pages paketi gerekli)
npm run deploy
```

**Otomatik Deploy**: Bu proje GitHub Actions ile otomatik olarak deploy edilir. `main` branch'e push yaptığınızda otomatik olarak GitHub Pages'e deploy edilecektir.

---

## 📁 Proje Yapısı

```
taskflow/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── LoginForm.tsx      # Giriş formu
│   │   ├── Todo/
│   │   │   ├── AddTodo.tsx        # Görev ekleme
│   │   │   ├── TodoItem.tsx       # Görev öğesi
│   │   │   └── TodoList.tsx       # Görev listesi
│   │   ├── Layout.tsx             # Ana layout
│   │   └── Navbar.tsx             # Navigasyon
│   ├── stores/
│   │   ├── authStore.ts           # Kimlik doğrulama store
│   │   └── todoStore.ts           # Görev yönetimi store
│   ├── types/
│   │   └── index.ts               # TypeScript tipleri
│   ├── utils/
│   │   └── storage.ts             # LocalStorage yardımcıları
│   ├── App.tsx                    # Ana uygulama
│   └── main.tsx                   # Giriş noktası
├── public/                        # Statik dosyalar
├── dist/                          # Production build
└── package.json                   # Proje konfigürasyonu
```

---

## 🎯 Kullanım

### 🔐 **Giriş Yapma**
1. Ana sayfada giriş formunu doldurun
2. Ad, soyad ve e-posta adresinizi girin
3. "Giriş Yap" butonuna tıklayın

### 📝 **Görev Yönetimi**
1. **Görev Ekleme**: Üst kısımdaki formu kullanın
2. **Görev Tamamlama**: Checkbox'a tıklayın
3. **Görev Silme**: Hover'da görünen silme butonunu kullanın

### 👤 **Profil Yönetimi**
- Sağ üst köşedeki profil bölümünden çıkış yapabilirsiniz

---

## 🛠️ Geliştirme

### 📦 **Mevcut Scriptler**
```bash
bun run dev          # Development server
bun run build        # Production build
bun run preview      # Build önizleme
bun run lint         # ESLint kontrolü
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

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI kütüphanesi
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Vite](https://vitejs.dev/) - Build tool
- [Bun](https://bun.sh/) - JavaScript runtime

---


