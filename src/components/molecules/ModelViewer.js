import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import Communicator from 'communicator';

const ModelViewer = ({ className, modelUri, hwvReady }) => {
  const [viewerId, setViewerId] = useState(uuidv4());
  useEffect(() => {
    const hwv = new Communicator.WebViewer({
      containerId: viewerId,
      endpointUri: modelUri,
    });
    hwv.setCallbacks({
      sceneReady: () => {
        hwv.view.setBackgroundColor(Communicator.Color.white(), Communicator.Color.white());
      },
    });
    hwv.start();
    window.addEventListener('resize', () => {
      hwv.resizeCanvas();
    });
    hwvReady(hwv);
    console.info(hwv);
  }, [viewerId]);

  return (
    <div className={className}>
      <div className="hoops-viewer" id={viewerId}></div>
    </div>
  );
};

ModelViewer.propTypes = {
  className: PropTypes.string,
};

ModelViewer.defaultProps = {
  className: '',
};

export default styled(ModelViewer)`
  width: 100%;
  cursor: grab;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  border-radius: 1rem;
  height: 40rem;
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.15);
  margin: 2rem auto 0;
`;
