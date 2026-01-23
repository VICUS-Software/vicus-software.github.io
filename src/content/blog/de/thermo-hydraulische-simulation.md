---
title: "Thermo-Hydraulische Simulation: Ein Deepdive"
description: "Die Energiewende verändert nicht nur die Wärmeversorgung, sondern auch die Art und Weise, wie wir Wärmenetze planen und betreiben. Ein technischer Tiefgang in die gekoppelte Berechnung."
pubDate: 2025-12-12
author: "Hauke Hirsch"
tags: ["Simulation", "Technik", "Wärmenetze"]
lang: "de"
---

# Thermo-Hydraulische Simulation: Ein Deepdive

Die Energiewende verändert nicht nur die Wärmeversorgung, sondern auch die Art und Weise, wie wir Wärmenetze planen und betreiben. Moderne, dynamische Netze erfordern gekoppelte thermische und hydraulische Berechnungen für eine präzise Planung.

## Warum gekoppelte Simulation?

In einem Wärmenetz beeinflussen sich Hydraulik und Thermik gegenseitig:

- **Temperatur beeinflusst Fluideigenschaften**: Dichte und Viskosität des Wassers ändern sich mit der Temperatur. Bei 20°C hat Wasser eine deutlich andere Viskosität als bei 90°C.
- **Strömung beeinflusst Wärmetransport**: Die Fließgeschwindigkeit bestimmt, wie schnell Wärme transportiert wird und wie groß die Wärmeverluste sind.
- **Wärmeverluste beeinflussen Temperatur**: Die Abkühlung im Netz hängt von Rohrdimensionen, Dämmung und Verweilzeit ab.

Diese Wechselwirkungen machen eine entkoppelte Berechnung unzureichend für moderne Netzplanung.

## Mathematische Grundlagen

### Hydraulische Berechnung

Die hydraulische Berechnung basiert auf den Grundgleichungen der Rohrhydraulik:

- **Kontinuitätsgleichung**: Massenerhaltung an Knotenpunkten
- **Impulsgleichung**: Druckverluste durch Reibung und lokale Widerstände
- **Newton-Raphson-Verfahren**: Iterative Lösung des nichtlinearen Gleichungssystems

### Thermische Berechnung

Die thermische Seite erfordert die Lösung von Transportgleichungen:

- **Advektions-Diffusions-Gleichung**: Wärmetransport im Fluid
- **Wärmeübergang**: Wärmeverluste an die Umgebung
- **CVODE-Löser**: Numerische Integration der Differentialgleichungen

## Implementierung in VICUS Districts

VICUS Districts verwendet einen vollständig gekoppelten Ansatz:

1. **Initialisierung**: Stationäre Berechnung für Startwerte
2. **Zeitschritt**: Hydraulische Lösung bei aktueller Temperaturverteilung
3. **Thermische Integration**: Lösung der Wärmetransportgleichungen
4. **Iteration**: Rückkopplung zwischen Hydraulik und Thermik

### Vorteile dieses Ansatzes

- **Hohe Genauigkeit**: Präzise Abbildung dynamischer Effekte
- **Stabilität**: Robuste numerische Verfahren
- **Effizienz**: Optimierte Algorithmen für schnelle Berechnungen

## Praktische Anwendungen

### Auslegung von Regelstrategien

Die dynamische Simulation ermöglicht die Untersuchung von:
- Schlechtpunktregelung
- Gleitender Vorlauftemperatur
- Lastprognose und -steuerung

### Betriebsoptimierung

Analyse von:
- Pumpenbetrieb und Energieverbrauch
- Speicherintegration
- Quellenmanagement bei mehreren Einspeisungen

### Netzausbau

Planung von:
- Erweiterungen bestehender Netze
- Integration neuer Wärmequellen
- Transformation zu niedrigeren Temperaturniveaus

## Fazit

Die thermo-hydraulische Simulation ist unverzichtbar für die Planung moderner Wärmenetze. Sie ermöglicht präzise Vorhersagen des Netzverhaltens und ist die Grundlage für wirtschaftliche und technisch optimierte Lösungen.

---

[Mehr über VICUS Districts](/de/vicus-districts) | [Tutorials ansehen](/de/tutorials-hilfe) | [Demo buchen](/de/demo)
