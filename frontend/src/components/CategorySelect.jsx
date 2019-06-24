import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Select } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { allCategories } from '../constants';
import { setSelectedCategoryAction } from '../actions/filterActions';

const CATEGORIES = gql`
  query {
    categories(orderBy: tyyppi_ASC) {
      id
      tyyppi
    }
  }
`;

const CategorySelect = () => {
  const selectedCategory = useSelector(state => state.filter.selectedCategory);
  const dispatch = useDispatch();

  return (
    <Query query={CATEGORIES}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Select options={[]} />;
        }
        if (error) {
          return null;
        }
        const options = [
          allCategories,
          ...data.categories.map(c => ({
            key: c.id,
            text: c.tyyppi,
            value: c.id,
          })),
        ];
        return (
          <Select
            options={options}
            value={selectedCategory}
            onChange={(event, { value }) =>
              dispatch(setSelectedCategoryAction(value))
            }
          />
        );
      }}
    </Query>
  );
};

export default CategorySelect;
