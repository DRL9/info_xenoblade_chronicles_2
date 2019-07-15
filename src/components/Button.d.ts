import React from 'react';

interface ButtonProps {
    btnSize: ButtonSize;
    btnType: ButtonType;
}

export type ButtonSize = 'small' | 'large';
export type ButtonType = 'text' | 'plain';

declare const Button: React.FunctionComponent<
ButtonProps & React.HTMLProps<HTMLButtonElement>
>;

export default Button;
