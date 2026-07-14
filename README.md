# AI Procurement Copilot

Tedarikçi değerlendirme sürecini destekleyen, yapay zeka destekli bir tedarik karar destek uygulaması. Sistem karar **vermez**, yalnızca analiz ve öneri sunar.

Bu proje **Yapay Zeka ve Teknoloji Akademisi Bootcamp 2026** kapsamında geliştirilmektedir.

## Takım Üyeleri

- [@mzeydkurt](https://github.com/mzeydkurt)
- [@eliftufekci](https://github.com/eliftufekci)
- [@ipekucr](https://github.com/ipekucr)
- [@AdemYrlts](https://github.com/AdemYrlts)

## Proje Hakkında

AI Procurement Copilot, tedarik uzmanlarının tedarikçileri teslimat performansı, finansal istikrar, kalite uyumluluğu, sürdürülebilirlik ve geçmiş olay verilerine göre değerlendirmesine yardımcı olur. Kural tabanlı bir risk skoru hesaplar ve bu skoru açıklayan bir yorum üretir.

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Backend | FastAPI |
| Veritabanı | SQLite + SQLAlchemy |
| Frontend | React + TypeScript + TailwindCSS |

## Bootcamp Sprint Süreci

Bootcamp kılavuzuna göre süreç toplam **3 sprint** üzerinden ilerlemektedir:

1. **İlk Sprint** — 19 Haziran 2026 - 5 Temmuz 2026
2. **2. Sprint** — 6 Temmuz 2026 - 19 Temmuz 2026
3. **Son Sprint** — 20 Temmuz 2026 - 2 Ağustos 2026

---

## Sprint 1 — Temel MVP (Tamamlandı)

### Hedef

Kimlik doğrulama, deployment, RAG veya gerçek bir LLM entegrasyonu olmadan; temiz ve genişletilebilir bir mimariyle çalışan bir temel (MVP) oluşturmak.

### Yapılanlar

- **Gösterge Paneli**: Toplam tedarikçi sayısı, son analizler ve ortalama risk skoru
- **Tedarikçi Analizi**: Firma bilgilerini alan form + kural tabanlı risk skoru hesaplama
- **AI Yorumu**: Şimdilik kural tabanlı, ileride gerçek bir LLM ile değiştirilebilecek şekilde ayrı bir serviste tasarlandı
- **Tedarikçi Listesi**: SQLite üzerinde saklanan analiz geçmişinin tablo halinde gösterimi
- Backend: `api / services / models / schemas / database / utils` şeklinde katmanlı mimari
- Frontend: `pages / components / services / types` şeklinde ayrılmış React + TypeScript yapısı

### Katkılar

| Katkıda Bulunan | Sorumluluk Alanı |
|---|---|
| [@mzeydkurt](https://github.com/mzeydkurt) | Proje mimarisi, klasör yapısı, veritabanı (SQLAlchemy + SQLite), model ve şema katmanları |
| [@eliftufekci](https://github.com/eliftufekci) | Risk hesaplama servisi ve AI açıklama servisi (kural tabanlı, LLM entegrasyonuna hazır mimari) |
| [@ipekucr](https://github.com/ipekucr) | Frontend scaffold (Vite + React + TypeScript + Tailwind), sayfa ve component yapısı |
| [@AdemYrlts](https://github.com/AdemYrlts) | API entegrasyonu, uçtan uca test, proje dokümantasyonu ve `.gitignore` düzenlemeleri |

### Kurulum ve Çalıştırma

**Backend**

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash)
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Uygulama `http://localhost:5173` üzerinden, backend `http://localhost:8000` üzerinden erişilebilir olacaktır.

---

## Sprint 2 — Planlanıyor

### Hedef

Sprint 1'de kurulan temel üzerine; gerçek AI entegrasyonu, tedarikçi karşılaştırma, gelişmiş listeleme/filtreleme ve temel test/kalite altyapısının eklenmesi.

> Aşağıdaki görevler 4 eşit gruba ayrılmıştır. Görevlerin ekip üyelerine dağılımı ekip içinde ayrıca belirlenecektir.

### Görev Grubu 1 — Backend & Veritabanı

- [ ] `Supplier` modeline yeni alanlar eklenmesi (sektör, ülke, tedarik kategorisi vb.)
- [ ] Tedarikçi karşılaştırma endpoint'i (`GET/POST /api/suppliers/compare`)
- [ ] Aynı tedarikçinin tekrar analiz edilmesi durumunda risk skoru geçmişinin/trendinin tutulması
- [ ] Tedarikçi güncelleme ve silme endpoint'lerinin eklenmesi (CRUD'un tamamlanması)
- [ ] `GET /api/suppliers` için filtreleme (risk seviyesine göre) ve sayfalama (pagination) desteği
- [ ] `.env` tabanlı konfigürasyon yönetimi (DB yolu, CORS origin vb. için `pydantic-settings`)

### Görev Grubu 2 — AI & Risk Motoru

- [ ] `ai_explanation` servisinin gerçek bir LLM sağlayıcısına bağlanması (API anahtarı `.env` üzerinden yönetilecek)
- [ ] Tedarikçi verisini yapılandırılmış bir prompt'a dönüştüren prompt şablonunun tasarlanması
- [ ] LLM çağrısı başarısız olduğunda (rate limit, hata vb.) mevcut kural tabanlı açıklamaya otomatik geri dönüş (fallback) mekanizması
- [ ] Risk skoru formülünün ağırlıklandırılabilir hale getirilmesi (ağırlıkların koddan değil konfigürasyondan okunması)
- [ ] `supplier_risk.csv` verisiyle karşılaştırmalı basit istatistik endpoint'i (örn. sektör/ortalama ile kıyaslama)
- [ ] `risk_calculator` ve `ai_explanation` servisleri için birim testlerinin yazılması

### Görev Grubu 3 — Frontend

- [ ] "Tedarikçi Karşılaştır" sayfası (birden fazla tedarikçiyi yan yana karşılaştıran tablo/görünüm)
- [ ] Tedarikçi Listesi sayfasına arama, risk seviyesine göre filtreleme ve sıralama eklenmesi
- [ ] Dashboard'a risk seviyesi dağılımını gösteren basit bir grafik eklenmesi
- [ ] Form validasyon mesajlarının geliştirilmesi (alan bazlı, satır içi hata gösterimi)
- [ ] Veri yüklenirken loading/skeleton durumlarının eklenmesi
- [ ] Tek bir tedarikçinin tüm geçmiş analizlerini gösteren detay sayfası
- [ ] Mobil/responsive görünüm iyileştirmeleri

### Görev Grubu 4 — Kalite, Test & Proje Yönetimi

- [ ] Backend için `pytest` ile temel endpoint testlerinin yazılması
- [ ] Frontend için Vitest + React Testing Library ile component testleri
- [ ] Lint/format araçlarının kurulması (backend: ruff/black, frontend: eslint/prettier)
- [ ] Basit bir GitHub Actions CI pipeline'ı (lint + test adımları)
- [ ] API dokümantasyonunun gözden geçirilmesi (FastAPI Swagger + README'ye örnek istek/yanıtların eklenmesi)
- [ ] Sprint 2 için beklenen Sprint Review / Retrospective dokümanlarının GitHub'a eklenmesi

---

## Son Sprint

> İçerik ilerleyen süreçte eklenecektir.
