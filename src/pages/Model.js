import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import ModelViewer from '../components/molecules/ModelViewer';

const Model = ({ className }) => {
  const location = useLocation();
  const { modelData } = location.state;
  const [hwv, setHwv] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [isStructureReady, setIsStructureReady] = useState(false);

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
      <div className="main-header">
        <div className="nav">
          <Link className="home-link" to="/">
            Home
          </Link>
        </div>
        <div className="header-container">
          <h4 className="main-headline">
            Quick Disclaimer: engine-wasm likes to crash here, but if you refresh enough times I
            promise the model shows up.
          </h4>
          <a className="github-link" href="https://github.com/romanparkhomenko/thangz-clone">
            See The Code
          </a>
        </div>
      </div>
      <div className="container-body">
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
  .main-header {
    width: 100%;
    border-top: 0.125rem solid rgb(255, 188, 0);
    background: rgb(35, 37, 48);
    .header-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      padding: 1.5rem 0 3rem;
    }
    h4.main-headline {
      color: white;
    }
    .github-link,
    .home-link {
      padding: 0.5rem 1rem;
      text-align: center;
      color: white;
      text-decoration: none;
      background: rgb(255, 188, 0);
      transition: all 250ms;
      border-radius: 1.5rem;
      outline: none;
      margin: 1rem auto;
      color: black;
      &:hover {
        transition: all 250ms;
        background: #cb9602;
      }
    }
  }
  div.nav {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a.home-link {
      border-radius: 0.5rem;
      margin: 0;
    }
  }
  .container-body {
    max-width: 90%;
    margin: 0 auto;
  }
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
