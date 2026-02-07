---
title: "Erste Schritte"
description: "Übersicht der Benutzeroberfläche und Kernfunktionen von VICUS Districts"
order: 1
lang: de
---

# VICUS Districts: Schnelleinstieg

Diese Dokumentation bietet eine Übersicht über die Benutzeroberfläche und die Kernfunktionen von **VICUS Districts** für die Wärmenetzsimulation und Gebäudemodellierung.

---

## 1. Erste Schritte
Beim ersten Start der Software empfiehlt es sich, die integrierten Beispiele zu erkunden.
* **Aktion:** Navigieren Sie zum Tab **„Netzbeispiele"** und öffnen Sie ein Beispielprojekt.
* **Vorteil:** So sehen Sie schnell, wie ein Netz aufgebaut ist, wie stationäre Berechnungen durchgeführt werden und wie Ergebnisse visualisiert werden.

## 2. Benutzeroberfläche

### Der Navigationsbaum (linke Seite)
Der Baum verwaltet alle Projektelemente:
* **Auswahl:** Ein Klick auf ein Element im Baum hebt es in der Kartenansicht hervor.
* **Sichtbarkeit:** Über die „Glühbirnen"-Symbole können Layer oder einzelne Elemente ein-/ausgeblendet werden.
* **Bearbeiten:** Doppelklick auf ein Element im Baum, um es umzubenennen.

### Interaktion & Steuerung
* **Additive Auswahl:** Das Auswählen mehrerer Elemente fügt sie zur Selektion hinzu.
* **Abwählen:** Mit `ESC` wird die gesamte Auswahl aufgehoben.
* **Navigation:** Halten Sie die **Leertaste** beim Bewegen in der 3D-/2D-Ansicht, um die Bewegungsgeschwindigkeit zu erhöhen — besonders nützlich bei großen Modellen.

## 3. Netzplanung & Konfiguration

### Datenimport
VICUS Districts unterstützt mehrere Importformate zur schnellen Modellerstellung:
* GIS-Daten
* OpenStreetMap (OSM)
* DXF-Pläne
* PDF-Pläne

### Wichtige Konfigurationstabs (rechte Seite)
| Tab | Funktion |
| :--- | :--- |
| **Allgemein** | Fluidtyp festlegen und Topologie-Werkzeuge wie „Verbraucher automatisch verbinden" nutzen. |
| **Gebäudebedarf** | Angeschlossene Lasten und Heizenergiebedarf visualisieren. |
| **Rohrdimensionierung** | Rohrtypen zuweisen und Längen/Dimensionen direkt in der Szene anzeigen. |
| **Anlagen** | Hausübergabestationen und zentrale Energieanlagen konfigurieren. |
| **Bodenverhältnisse** | Bodentemperaturen und Randbedingungen für Wärmeverluste einstellen. |

## 4. Berechnung & Simulation

### Stationäre Analyse
Liefert eine „Momentaufnahme" der Netzleistung.
* Zeigt die Druckkurve an.
* Identifiziert den „Schlechtpunkt" (hydraulisch ungünstigster Punkt).
* Bietet automatische Pumpendimensionierung auf Basis einer integrierten Datenbank.

### Dynamische Simulation
Nutzt zeitabhängige Daten für hochgenaue Ergebnisse.
* **Klimadaten:** Wetterdaten direkt vom Deutschen Wetterdienst (DWD) importieren.
* **Stündliche Ergebnisse:** Stündliche Analyse von Heizleistung, COP und Netzwärmeverlusten.

## 5. Berichte & Ausgaben
* **Massenauszug:** Erstellt eine vollständige Liste aller Rohre, T-Stücke, Reduzierstücke und Formteile.
* **Ergebnisübersicht:** Bietet eine Zusammenfassung der wichtigsten Simulationskennwerte.

---
**Referenz:** [VICUS Basics Tutorial](https://www.youtube.com/watch?v=k7zjsrNO-7I)
