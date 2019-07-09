import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

const Mask = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const FadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Figure = styled.figure`
    position: relative;
    z-index: 1;
`;

const Img = styled.img`
    max-width: 100%;
    max-height: 90%;
`;

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

    & ${Figure} {
        animation: ${FadeIn} ${props => props.duration || '1s'} linear;
    }
    ${props =>
        props.hidden &&
        css`
            & ${Figure} {
                animation: ${FadeOut} ${props => props.duration || '1s'} linear;
            }
        `}
`;

export class Picture extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hidden: false
        };
        this.onClose = this.onClose.bind(this);
        this.duration = props.duration || 300;
    }
    onClose () {
        this.setState({
            hidden: true
        });
        setTimeout(() => {
            this.props.onClose();
        }, this.duration);
    }
    render () {
        return (
            <RootContainer
                hidden={this.state.hidden}
                duration={this.duration + 'ms'}
            >
                <Mask onClick={this.onClose} />
                <Figure>
                    <Img src={this.props.src} />
                </Figure>
            </RootContainer>
        );
    }
}

Picture.propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number
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
