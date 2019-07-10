import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    padding: 6px 16px;
    min-width: 64px;
    box-sizing: border-box;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    line-height: 1.75;
    font-weight: 500;
    font-size: 0.875rem;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    background-color: #e0e0e0;
    border: none;
    outline: none;
    cursor: pointer;

    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    ${props =>
        props.btnSize === 'small'
            ? css`
                  padding: 4px 8px;
                  font-size: 0.8125rem;
              `
            : props.btnSize === 'large'
                ? css`
                  padding: 8px 24px;
                  font-size: 0.9375rem;
              `
                : ''}

    ${props =>
        props.btnType === 'text'
            ? css`
                  background-color: transparent;
                  box-shadow: none;
              `
            : ''}

    &:hover {
        background-color: #d5d5d5;
    }
`;

Button.propTypes = {
    btnSize: PropTypes.oneOf(['small', 'large']),
    btnType: PropTypes.oneOf(['text'])
};

export default Button;
