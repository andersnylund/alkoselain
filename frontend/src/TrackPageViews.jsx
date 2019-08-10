import React from 'react';
import Component from '@reactions/component';
import { Location } from '@reach/router';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-145417753-1');

// from https://github.com/reach/router/issues/43#issuecomment-395492569

const track = pathname => {
  ReactGA.pageview(pathname);
};

const TrackPageViews = () => (
  <Location>
    {({ location }) => (
      <Component
        location={location}
        didMount={() => track(location.pathname)}
        didUpdate={({ prevProps }) => {
          if (prevProps.location !== location) {
            track(location.pathname);
          }
        }}
      />
    )}
  </Location>
);

export default TrackPageViews;
