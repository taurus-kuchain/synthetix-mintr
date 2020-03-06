import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
	updateCurrentTab,
	getCurrentTab,
	getTransactionSettingsPopupIsVisible,
} from '../../ducks/ui';

import { Home, Depot, Transactions, Escrow, UniPool } from '../MintrTabs';
import { TabButton } from '../../components/Button';
import { TransactionSettingsPopup } from '../../components/Popup';

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
		case 'unipool':
			return <UniPool />;
	}
};

const MainContainer = ({ currentTab, transactionSettingsPopupIsVisible, updateCurrentTab }) => {
	const { t } = useTranslation();
	return (
		<MainContainerWrapper>
			<Overlay isVisible={transactionSettingsPopupIsVisible}></Overlay>
			<Header>
				{['home', 'depot', 'transactionsHistory', 'escrow', 'unipool'].map(tab => {
					return (
						<TabButton
							key={tab}
							isSelected={tab === currentTab}
							onClick={() => updateCurrentTab(tab)}
						>
							{/* i18next-extract-disable-next-line */}
							{t(`mainNavigation.tabs.${tab}`)}
						</TabButton>
					);
				})}
			</Header>
			{renderScreen(currentTab)}
			{transactionSettingsPopupIsVisible ? (
				<TransactionSettingsPopup></TransactionSettingsPopup>
			) : null}
		</MainContainerWrapper>
	);
};

const MainContainerWrapper = styled('div')`
	width: 100%;
	background-color: ${props => props.theme.colorStyles.background};
	position: relative;
`;

const Header = styled('div')`
	display: flex;
	justify-content: space-between;
	height: 80px;
	background-color: ${props => props.theme.colorStyles.menu};
`;

const Overlay = styled.div`
	visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgb(0, 0, 0, 0.7);
	z-index: 1000;
`;

const mapStateToProps = state => ({
	currentTab: getCurrentTab(state),
	transactionSettingsPopupIsVisible: getTransactionSettingsPopupIsVisible(state),
});

const mapDispatchToProps = {
	updateCurrentTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
