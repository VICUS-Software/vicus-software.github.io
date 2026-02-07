---
title: "Erste Schritte"
description: "Übersicht der Benutzeroberfläche und Kernfunktionen von VICUS Districts"
order: 1
lang: de
---

# VICUS Districts: Quick Start Guide

This documentation provides an overview of the user interface and core functionalities of **VICUS Districts** for heating network simulation and building modeling.

---

## 1. Getting Started
When launching the software for the first time, it is recommended to explore the built-in examples.
* **Action:** Navigate to the **"Netzbeispiele"** (Network Examples) tab and open a sample project.
* **Benefit:** Quickly see how a network is structured, how stationary calculations are performed, and how results are visualized.

## 2. Interface Overview

### The Navigation Tree (Left Side)
The tree manages all project elements:
* **Selection:** Clicking an element in the tree highlights it in the map view.
* **Visibility:** Use the "Lightbulb" icons to toggle layers or specific elements on/off.
* **Editing:** Double-click any element in the tree to rename it.

### Interaction & Controls
* **Additive Selection:** Selecting multiple items adds them to the selection.
* **Deselect:** Press `ESC` to clear all current selections.
* **Navigation:** Hold the **Spacebar** while moving in the 3D/2D view to increase movement speed—especially useful for large models.

## 3. Network Design & Configuration

### Data Import
VICUS Districts supports several import formats to speed up model creation:
* GIS Data
* Open Street Maps (OSM)
* DXF Plans
* PDF Plans

### Key Configuration Tabs (Right Side)
| Tab | Function |
| :--- | :--- |
| **General** | Define the fluid type and use topology tools like "Auto-connect consumers." |
| **Building Demand** | Visualize connected loads and heating energy requirements. |
| **Pipe Dimensioning** | Assign pipe types and view lengths/dimensions directly in the scene. |
| **Systems (Anlagen)** | Configure house transfer stations and central energy plants. |
| **Soil Conditions** | Set ground temperatures and boundary conditions for heat loss. |

## 4. Calculation & Simulation

### Stationary Analysis
Provides a "snapshot" of the network performance.
* Displays the pressure curve.
* Identifies the "Schlechtpunkt" (hydraulically most remote point).
* Offers automatic pump dimensioning based on a built-in database.

### Dynamic Simulation
Uses time-dependent data for high-fidelity results.
* **Climate Data:** Import weather data directly from the German Weather Service (DWD).
* **Hourly Results:** Analyze hourly performance for heating power, COP, and network heat losses.

## 5. Reporting & Outputs
* **Massenauszug (Bill of Materials):** Generates a complete list of all pipes, T-pieces, reducers, and fittings.
* **Results Summary:** Provides a high-level overview of the most important simulation metrics.

---
**Reference:** [VICUS Basics Tutorial](https://www.youtube.com/watch?v=k7zjsrNO-7I)
