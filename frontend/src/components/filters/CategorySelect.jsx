import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { allCategories } from '../../constants';
import { setSelectedCategoryAction } from '../../actions/filterActions';

export const CATEGORY_QUERY = gql`
  query {
    categories(orderBy: tyyppi_ASC) {
      id
      tyyppi
    }
  }
`;

export const CategorySelect = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Query query={CATEGORY_QUERY}>
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
            onChange={(event, { value }) => setSelectedCategory(value)}
          />
        );
      }}
    </Query>
  );
};

CategorySelect.propTypes = {
  selectedCategory: string.isRequired,
  setSelectedCategory: func.isRequired,
};

const mapStateToProps = state => ({
  selectedCategory: state.filter.selectedCategory,
});

const mapDispatchToProps = {
  setSelectedCategory: setSelectedCategoryAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect);
