import React from 'react';
import styled from 'styled-components';

const Buttion = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

export default class App extends React.Component {
    render () {
        return (
            <section>
                Hello world
                <Buttion>click me</Buttion>
            </section>
        );
    }
}
