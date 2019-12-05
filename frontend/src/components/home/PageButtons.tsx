import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import { AppState } from '../../store';
import { setPageAction } from '../../actions/pageActions';
import { connect } from 'react-redux';

interface Props {
  page: number;
  setPage: (page: number) => void;
}

const PageButtons: FunctionComponent<Props> = ({ page, setPage }) => {
  return (
    <ButtonContainer>
      <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        ←
      </Button>
      Sivu {page}
      <Button onClick={() => setPage(page + 1)}>→</Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const mapStateToProps = (state: AppState) => ({
  page: state.page.page,
});

const mapDispatchToProps = {
  setPage: setPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageButtons);
