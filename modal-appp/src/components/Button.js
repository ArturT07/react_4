import React from 'react';
import '../Button.scss';
import { connect } from 'react-redux';
import { clickButton } from '../redux/actions';

const Button = ({ backgroundColor, text, onClick }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <button className="custom-button" style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};
const mapDispatchToProps = {
  onClick: clickButton,
};

export default connect(mapDispatchToProps)(Button);
