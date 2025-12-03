# AutoM8 - HCI + Computer Graphics Course Project

A visually brilliant, fully interactive "chatbot → n8n automation animator" simulation.

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to `http://localhost:5173`

## 🎨 Features & HCI Principles

### 1. Landing Page (Aesthetic Minimalism)
- **HCI**: Clean design with clear affordances (CTA buttons).
- **CG**: 3D Parallax background using React Three Fiber.

### 2. Chat -> Workflow Animator (Visibility of System Status)
- **HCI**: Real-time feedback during "generation" and "execution".
- **CG**: Particle flow animations along edges to simulate data transfer.

### 3. Workflow Builder (User Control & Freedom)
- **HCI**: Drag-and-drop interface with snap-to-grid (implied physics).
- **CG**: Spring-based animations for natural movement.

### 4. Execution Dashboard (Match between System & Real World)
- **HCI**: Visual metaphors for system health (charts, logs).
- **CG**: Animated charts and live execution tracking.

### 5. Settings (Flexibility & Efficiency)
- **HCI**: Accessibility controls (High Contrast, Reduced Motion).
- **CG**: Smooth theme transitions.

## 🛠 Tech Stack

- **React + Vite**: Core framework.
- **Tailwind CSS**: Styling and design tokens.
- **Framer Motion**: 2D animations and layout transitions.
- **React Three Fiber**: 3D background elements.
- **Zustand**: Global state management.
