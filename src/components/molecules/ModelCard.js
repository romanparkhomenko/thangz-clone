import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ModelCard = ({ className, model }) => {
  const getOwnerAvatar = () => {
    if (model.owner.profile.avatarUrl) {
      return (
        <img
          className="owner-avatar"
          src={model.owner.profile.avatarUrl}
          alt={model.owner.username}
        />
      );
    }
    const firstInitial = model.owner.username.substring(0, 1).toUpperCase();
    return <div className="owner-avatar-placeholder">{firstInitial}</div>;
  };

  const getModelName = () => {
    if (model.name.length > 20) {
      return <p>{`${model.name.substring(0, 20)}...`}</p>;
    }
    return <p>{model.name}</p>;
  };

  return (
    <div className={className}>
      <div className="owner-info">
        {getOwnerAvatar()}
        <p className="owner-name">{model.owner.username}</p>
      </div>
      <img
        className="model-thumbnail"
        src={model.parts[0].thumbnailUrl}
        alt={model.parts[0].description}
      />
      <div className="model-name">{getModelName()}</div>
    </div>
  );
};

ModelCard.propTypes = {
  className: PropTypes.string,
};

ModelCard.defaultProps = {
  className: '',
};

export default styled(ModelCard)`
  max-width: 290px;
  margin: 1rem 0.5rem;
  padding: 1rem;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  transition: all 250ms;

  .owner-info {
    display: flex;
    align-items: center;
    .owner-avatar {
      max-width: 30px;
      width: 100%;
      margin: 0;
      border-radius: 50%;
    }
    .owner-avatar-placeholder {
      max-width: 30px;
      width: 100%;
      margin: 0;
      border-radius: 50%;
      background: #0099cc;
      color: white;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      padding: 0.5rem 0;
    }
    .owner-name {
      font-size: 0.8rem;
      margin-left: 1rem;
      color: #484949;
    }
  }

  img.model-thumbnail {
    display: block;
    margin: 0 auto;
    max-width: 250px;
    width: 100%;
  }

  .model-name {
    p {
      font-size: 0.9rem;
      color: #484949;
      text-align: center;
    }
  }

  &:hover {
    box-shadow: 1px 1px 12px 1px rgba(0, 0, 0, 0.25);
    transform: scale(1.01);
    transition: all 250ms;
    cursor: pointer;
  }
`;
