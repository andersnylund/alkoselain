import React, { FC, useEffect } from 'react';
import { Select } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { allCategories } from '../../constants';
import { setSelectedCategoryAction } from '../../actions/filterActions';
import { getCategoriesAction } from '../../actions/categoryActions';
import { AppState } from '../../store';
import { Category } from '../../../../shared/types';

export interface Props {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  getCategories: () => void;
  categories: Category[];
}

export const CategorySelect: FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  getCategories,
  categories,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const options = [
    allCategories,
    ...categories.map(c => ({
      key: c.id,
      text: c.tyyppi,
      value: c.id,
    })),
  ];
  return (
    <Select
      options={options}
      value={selectedCategory}
      onChange={(event, e) => {
        if (typeof e.value === 'string') {
          setSelectedCategory(e.value);
        }
      }}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedCategory: state.filter.selectedCategory,
  categories: state.category.categories,
});

const mapDispatchToProps = {
  setSelectedCategory: setSelectedCategoryAction,
  getCategories: getCategoriesAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect);
