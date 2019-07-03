import { createGlobalStyle } from 'styled-components';
import React from 'react';
import Monsters from './components/Monsters';

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
    }
`;

export default class App extends React.Component {
    render () {
        return (
            <section>
                <GlobalStyle />
                <Monsters />
            </section>
        );
    }
}
