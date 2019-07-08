import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

const RootContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;

    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const Mask = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Figure = styled.figure`
    position: relative;
    z-index: 1;
`;

const Img = styled.img`
    max-width: 100%;
    max-height: 90%;
`;

export const Picture = ({ src, onClose }) => (
    <RootContainer>
        <Mask onClick={onClose} />
        <Figure>
            <Img src={src} />
        </Figure>
    </RootContainer>
);

Picture.propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export function showPicture (src) {
    const $div = document.createElement('div');
    const rawBodyStyle = document.body.style;
    render(
        <Picture
            src={src}
            onClose={() => {
                document.body.removeChild($div);
                document.body.style = rawBodyStyle;
            }}
        />,
        $div
    );
    document.body.appendChild($div);
    document.body.style = rawBodyStyle + ';overflow:hidden';
}
