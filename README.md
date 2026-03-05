# 🚀 CodeVault - Personal Snippet Manager

CodeVault, yazılımcıların sık kullandıkları kod parçacıklarını (snippet) hızlıca kaydedip, düzenleyip, dillerine göre filtreleyebilecekleri modern ve hızlı bir web uygulamasıdır. Veriler tamamen tarayıcı belleğinde (Local Storage) tutulur, böylece sunucu bağımlılığı olmadan anında tepki verir.

## ✨ Öne Çıkan Özellikler

- **💾 Kalıcı Veri (Local Storage):** Tarayıcıyı kapatsanız bile kodlarınız kaybolmaz. Next.js Hydration sorunları özel bir `isMounted` hook'u ile çözülmüştür.
- **⚡ Merkezi State Yönetimi:** React Context API sayesinde uygulama içi veri akışı (ekleme, silme, güncelleme) anlık ve pürüzsüz olarak gerçekleşir.
- **🧠 Akıllı Bileşenler:** Düzenleme ekranında sadece veri değiştiğinde aktifleşen "Güncelle" butonu (Derived State mantığı) ile gereksiz render ve işlemlerin önüne geçilir.
- **🎨 Modern ve Akıcı UI:** Tailwind CSS kullanılarak tasarlanmış interaktif butonlar, custom scrollbar'lar ve estetik hover efektleri.
- **🛡️ Güvenli İşlemler:** Silme ve güncelleme adımlarında özel tasarlanmış Onay Modalı (Confirm Modal) ve `react-toastify` ile anlık bildirimler.
- **🏷️ Dinamik Filtreleme:** Eklenen kodları dillerine göre (C#, JavaScript, SQL, HTML vb.) anında filtreleme.

## 🛠️ Kullanılan Teknolojiler

- **Framework:** Next.js (App Router)
- **Kütüphane:** React (Context API, Hooks)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **Araçlar:** React-Toastify
<img width="1920" height="1080" alt="Ekran görüntüsü 2026-03-05 142151" src="https://github.com/user-attachments/assets/fcc9265b-7575-4939-bc19-d100840bfa01" />
