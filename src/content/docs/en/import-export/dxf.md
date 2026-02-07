---
title: "DXF Export"
description: "Export network plans as DXF files for use in CAD programs"
order: 10
lang: en
---

# Exporting Network Plans as DXF

This document summarizes the tutorial on exporting heating networks as DXF files from VICUS Districts.

---

## 1. Starting the Export
* **Path:** `Export` > `DXF Drawing`
* The dialog offers various options for graphical and data preparation of the plan.

## 2. Pipe Display Options
There are two main ways to display the network:

| Option | Recommendation | Advantage |
| :--- | :--- | :--- |
| **Separate pipes** | Use a uniform color | Supply and return lines are drawn as separate lines. |
| **Single line** | Choose distinct colors | Each pipe dimension gets its own color for quick identification. |

## 3. Including Calculation Results
For technical values to appear in the plan, they must have been calculated beforehand:
1. **Stationary Calculation:** If options are grayed out, restart the stationary calculation in network mode.
2. **Data Selection:** In the export dialog, checkboxes can now be set for the following values:
    * Specific pressure loss
    * Volume flow
    * Pipe dimensions and IDs

## 4. DXF File Structure
* **Automatic Export:** The plan contains ready-made labels for all selected parameters.
* **Layer System:** All information (dimensions, results, OSM background data) is placed on **separate layers**. This allows easy toggling of details in CAD software.
* **OSM Integration:** OpenStreetMap data can optionally be included as a spatial reference.

---
**Source:** [VICUS Tutorial on YouTube](https://www.youtube.com/watch?v=gasCt28CoFI)
