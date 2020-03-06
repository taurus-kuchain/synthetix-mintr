import React, { useContext } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Cross } from '../Icons';

import { toggleTransactionSettingsPopup } from '../../ducks/ui';

const Popup = ({ children, toggleTransactionSettingsPopup }) => {
	return (
		<PopupWrapper>
			<Nav>
				<ButtonClose onClick={() => toggleTransactionSettingsPopup(false)}>
					<Cross />
				</ButtonClose>
			</Nav>
			{children}
		</PopupWrapper>
	);
};

const PopupWrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 1001;
`;

const Nav = styled.div`
	position: relative;
	display: flex;
	flex-direction: row-reverse;
	top: 80px;
	right: 40px;
`;

const ButtonClose = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
`;

const mapDispatchToProps = {
	toggleTransactionSettingsPopup,
};

export default connect(null, mapDispatchToProps)(Popup);
