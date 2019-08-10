import React from 'react';
import { arrayOf, element } from 'prop-types';
import { Router, Location } from '@reach/router';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import Background from './images/background.svg';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotFound from './pages/NotFound';
import TrackPageViews from './TrackPageViews';

const Container = styled.div`
  background-image: url(${Background});
  min-height: 100vh;

  a {
    color: hsl(0, 50%, 50%);
  }
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 0, beforeChildren: 100 },
  exit: { opacity: 0 },
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

PosedRouter.propTypes = {
  children: arrayOf(element).isRequired,
};

const App = () => (
  <Container>
    <TrackPageViews />
    <Header />
    <PosedRouter>
      <HomePage path="/" />
      <ProductPage path="/products/:productId" />
      <NotFound default />
    </PosedRouter>
    <Footer />
  </Container>
);

export default App;
