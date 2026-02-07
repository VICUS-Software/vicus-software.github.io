---
title: "DXF Export"
description: "Netzpläne als DXF-Datei exportieren und in CAD-Programmen verwenden"
order: 10
lang: de
---

# Netzplan als DXF erzeugen

Dieses Dokument fasst das Tutorial zum Export von Nahwärmenetzen als DXF-Datei aus VICUS Districts zusammen.

---

## 1. Export-Vorgang starten
* **Pfad:** `Export` > `DXF Zeichnung`
* Der Dialog bietet verschiedene Optionen zur grafischen und datentechnischen Aufbereitung des Plans.

## 2. Darstellungsoptionen der Leitungen
Es gibt zwei Hauptarten, das Netz darzustellen:

| Option | Empfehlung | Vorteil |
| :--- | :--- | :--- |
| **Getrennte Leitungen** | Einheitliche Farbe verwenden | Vor- und Rücklauf werden als separate Linien gezeichnet. |
| **Einheitliche Linie** | Eindeutige Farben wählen | Jede Rohrdimension erhält eine eigene Farbe zur schnellen Unterscheidung. |

## 3. Einbinden von Berechnungsergebnissen
Damit technische Werte im Plan erscheinen, müssen diese zuvor berechnet worden sein:
1. **Stationäre Berechnung:** Falls Optionen ausgegraut sind, im Netzmodus die stationäre Berechnung neu starten.
2. **Datenauswahl:** Im Export-Dialog können nun Häkchen für folgende Werte gesetzt werden:
    * Spezifischer Druckverlust
    * Volumenstrom
    * Rohrdimensionen und IDs

## 4. Struktur der DXF-Datei
* **Automatischer Export:** Der Plan enthält fertige Beschriftungen für alle gewählten Parameter.
* **Layer-System:** Alle Informationen (Dimensionen, Ergebnisse, OSM-Hintergrunddaten) liegen auf **separaten Layern**. Dies ermöglicht ein einfaches Ein- und Ausblenden der Details im CAD-Programm.
* **OSM-Integration:** OpenStreetMap-Daten können optional als räumliche Referenz mitgeliefert werden.

---
**Quelle:** [VICUS Tutorial auf YouTube](https://www.youtube.com/watch?v=gasCt28CoFI)
