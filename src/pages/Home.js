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
      <div className="github-header">
        <h1 className="main-headline">Let's work together.</h1>
        <a className="github-link" href="https://github.com/romanparkhomenko/thangz-clone">
          See The Code
        </a>
      </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  .github-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 100%;
    padding: 3rem 0;
    border-top: 0.125rem solid rgb(255, 188, 0);
    background: rgb(35, 37, 48);
    h1.main-headline {
      color: white;
      font-size: 3rem;
    }
    .github-link {
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

  .models {
    margin: 1rem auto;
    width: 100%;
    max-width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
  }
`;
