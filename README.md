# Cricket Video Classification Project

This project implements a "Ball by Ball" classification system for cricket videos, integrating a Deep Learning model with a web-based interface.

## Project Structure

The project is organized into the following main components:

- **`algoritham/`**: Contains the core Python scripts for the classification logic.
    - Uses `tensorflow` and `keras` for the LRCN model.
    - Classifies video segments into events: **Boundary**, **No Run**, **Runs**, **Wicket**.
- **`backend/`**: A Node.js backend server.
    - Handles video processing, storage, and API endpoints.
    - Manages generated data folders like `/merged`, `/output`, etc.
- **`frontend/`**: The user interface built with **React**.
    - Allows users to upload/view videos and see classification results.
- **Root Directory**: Contains trained model files (`.h5`) and sample media.

## Prerequisites

- **Python** (for the classification algorithms)
    - Key libraries: `tensorflow`, `numpy`, `opencv-python` (`cv2`), `fastapi`, `uvicorn`.
- **Node.js** (for backend and frontend)

## Setup

1.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm start
    ```

2.  **Backend**:
    ```bash
    cd backend
    npm install
    node index.js
    ```

3.  **Algorithm**:
    Ensure the required Python libraries are installed (`tensorflow`, `opencv-python`, etc.) before running the classification scripts.

## Usage

The system takes cricket video footage, analyzes it frame-by-frame (or sequence-by-sequence), and predicts the outcome of each ball (e.g., whether it was a wicket or a boundary).
