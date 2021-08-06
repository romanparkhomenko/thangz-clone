import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { contextStore } from '../context/AppContext';
import LazyLoad from 'react-lazy-load';
import ModelCard from '../components/molecules/ModelCard';
import { Link } from 'react-router-dom';

const Home = ({ className }) => {
  const { state, dispatch } = useContext(contextStore);
  const { homePageLoading, models } = state;

  const getHomepageModels = () => {
    const url = `https://production-api.thangs.com/models/landing?sortBy=${state.sortModelsBy}&range=alltime&sortDir=desc&page=0&pageSize=48`;
    fetch(url)
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: 'updateModels',
          payload: response,
        });

        console.info(response);

        dispatch({ type: 'setHomeLoading', payload: false });
      });
  };

  const renderModels = () => {
    return (
      <div className="models">
        {models.map(model => {
          return (
            <LazyLoad offsetVertical={0} key={model.id}>
              <Link
                to={{
                  pathname: `/model/${model.id}`,
                  state: { modelData: model },
                }}
                style={{ textDecoration: 'none' }}
              >
                <ModelCard className="model-card" model={model} />
              </Link>
            </LazyLoad>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getHomepageModels();
  }, []);

  return (
    <div className={className}>
      {homePageLoading && models ? <p>Loading...</p> : renderModels()}
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string,
};

Home.defaultProps = {
  className: '',
};

export default styled(Home)`
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;

  .models {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
  }
`;
