import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ModelViewer from '../components/molecules/ModelViewer';

const Model = ({ className }) => {
  const location = useLocation();
  const { modelData } = location.state;
  const [hwv, setHwv] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [isStructureReady, setIsStructureReady] = useState(false);
  const [modelURL, setModelURL] = useState('');

  const hwvReady = newHWV => {
    setHwv(newHWV);
  };

  const resetCamera = () => {
    hwv.view.resetCamera();
  };

  useEffect(() => {
    if (hwv) {
      console.info('viewer ready');
      hwv.setCallbacks({
        sceneReady: () => {
          setCameraStatus(hwv.view.getCamera().toJson());
        },
        modelStructureReady: () => {
          setIsStructureReady(true);
        },
        camera: () => {
          setCameraStatus(hwv.view.getCamera().toJson());
        },
      });
    }
  }, [hwv]);

  return (
    <div className={className}>
      <h3 className="model-title">{modelData.name}</h3>
      <div className="model-view-container">
        {modelData && (
          <ModelViewer
            className="model-viewer"
            modelUri={modelData.parts[0].viewerUrl}
            hwvReady={hwvReady}
          />
        )}
      </div>
      <div className="model-view-controls">
        <button className="reset-camera" onClick={resetCamera}>
          Reset Camera
        </button>
      </div>
    </div>
  );
};

Model.propTypes = {
  className: PropTypes.string,
};

Model.defaultProps = {
  className: '',
};

export default styled(Model)`
  font-family: 'Montserrat', sans-serif;
  padding: 3rem;
  .model-title {
    text-align: left;
    max-width: 90%;
    width: 100%;
  }
  .model-view-container {
    width: 100%;
    margin: 0 auto;
  }
  .model-view-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    padding: 1rem;
    margin: 1.25rem 0 0 0;
  }
  button.reset-camera {
    border: 2px solid black;
    color: black;
    border-radius: 1.5rem;
    padding: 0.5rem 0.75rem;
    -webkit-appearance: none;
    cursor: pointer;
    background: white;
    &:hover {
      background: #f0f0f0;
    }
  }
`;
