import React, { useContext } from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { Store } from '../../store';
import { updateCurrentTab } from '../../ducks/ui';

import { Home, Depot, Transactions, Escrow } from '../MintrTabs';
import { TabButton } from '../../components/Button';

const TabRow = ({ state }) => {
  const { t } = state;
  const {
    state: {
      ui: { currentTab },
    },
    dispatch,
  } = useContext(Store);
  return ['home', 'depot', 'transactionsHistory', 'escrow'].map(tab => {
    return (
      <TabButton
        key={tab}
        isSelected={tab === currentTab}
        onClick={() => updateCurrentTab(tab, dispatch)}
      >
        {/* i18next-extract-disable-next-line */}
        {t(`mainContent.header.buttons.${tab}`)}
      </TabButton>
    );
  });
};

const renderScreen = screen => {
  switch (screen) {
    case 'home':
    default:
      return <Home />;
    case 'depot':
      return <Depot />;
    case 'transactionsHistory':
      return <Transactions />;
    case 'escrow':
      return <Escrow />;
  }
};

const MainContainer = ({ t }) => {
  const {
    state: {
      ui: { currentTab },
    },
  } = useContext(Store);

  return (
    <MainContainerWrapper>
      <Header>
        <TabRow state={{ t }} />
      </Header>
      {renderScreen(currentTab)}
    </MainContainerWrapper>
  );
};

const MainContainerWrapper = styled('div')`
  width: 100%;
  background-color: ${props => props.theme.colorStyles.background};
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: ${props => props.theme.colorStyles.menu};
`;

export default withTranslation()(MainContainer);