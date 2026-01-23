---
title: "Thermo-Hydraulic Simulation: A Deep Dive"
description: "The energy transition is changing not only heat supply but also how we plan and operate heat networks. A technical deep dive into coupled calculations."
pubDate: 2025-12-12
author: "Hauke Hirsch"
tags: ["Simulation", "Technology", "Heat Networks"]
lang: "en"
---

# Thermo-Hydraulic Simulation: A Deep Dive

The energy transition is changing not only heat supply but also how we plan and operate heat networks. Modern, dynamic networks require coupled thermal and hydraulic calculations for precise planning.

## Why Coupled Simulation?

In a heat network, hydraulics and thermal behavior influence each other:

- **Temperature affects fluid properties**: Water density and viscosity change with temperature. At 20°C, water has a significantly different viscosity than at 90°C.
- **Flow affects heat transport**: The flow velocity determines how quickly heat is transported and how large the heat losses are.
- **Heat losses affect temperature**: The cooling in the network depends on pipe dimensions, insulation, and residence time.

These interactions make decoupled calculations insufficient for modern network planning.

## Mathematical Foundations

### Hydraulic Calculation

The hydraulic calculation is based on the fundamental equations of pipe hydraulics:

- **Continuity equation**: Mass conservation at nodes
- **Momentum equation**: Pressure losses due to friction and local resistances
- **Newton-Raphson method**: Iterative solution of the nonlinear system of equations

### Thermal Calculation

The thermal side requires solving transport equations:

- **Advection-diffusion equation**: Heat transport in the fluid
- **Heat transfer**: Heat losses to the environment
- **CVODE solver**: Numerical integration of differential equations

## Implementation in VICUS Districts

VICUS Districts uses a fully coupled approach:

1. **Initialization**: Steady-state calculation for initial values
2. **Time step**: Hydraulic solution at current temperature distribution
3. **Thermal integration**: Solution of heat transport equations
4. **Iteration**: Feedback between hydraulics and thermal behavior

### Advantages of This Approach

- **High accuracy**: Precise representation of dynamic effects
- **Stability**: Robust numerical methods
- **Efficiency**: Optimized algorithms for fast calculations

## Practical Applications

### Design of Control Strategies

Dynamic simulation enables investigation of:
- Critical point control
- Variable supply temperature
- Load forecasting and control

### Operational Optimization

Analysis of:
- Pump operation and energy consumption
- Storage integration
- Source management with multiple feed-ins

### Network Expansion

Planning of:
- Extensions to existing networks
- Integration of new heat sources
- Transformation to lower temperature levels

## Conclusion

Thermo-hydraulic simulation is indispensable for planning modern heat networks. It enables precise predictions of network behavior and is the foundation for economically and technically optimized solutions.

---

[More about VICUS Districts](/en/vicus-districts) | [View tutorials](/en/tutorials-help) | [Book a demo](/en/demo)
