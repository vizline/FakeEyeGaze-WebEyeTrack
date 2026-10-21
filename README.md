# FakeEyeGaze — WebEyeTrack

Alternatywna, przeglądarkowa wersja procedury eksperymentalnej wykorzystująca
[WebEyeTrack](https://github.com/RedForestAI/WebEyeTrack) zamiast WebGazer.js.

Procedura obejmuje ankietę demograficzną, dwustopniową kalibrację z walidacją,
zadanie pamięciowe, losową ekspozycję postów, ocenę wiarygodności, kontrolę
uwagi oraz lokalne mapy cieplne. Dane nie są zapisywane ani wysyłane.

## Uruchomienie

```bash
npm install
npm run dev
```

Kamera działa wyłącznie przez `localhost` lub HTTPS.

## Technologia i licencja

Projekt używa pakietu `webeyetrack` 0.0.2 oraz modelu BlazeGaze udostępnionego
przez autorów WebEyeTrack na licencji MIT. Zob. repozytorium źródłowe i artykuł:
Davalos et al., *WEBEYETRACK: Scalable Eye-Tracking for the Browser via
On-Device Few-Shot Personalization* (2025).
