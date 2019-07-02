import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchMonsters } from '../store/actions';

const Img = styled.img`
    max-width: 100px;
`;

class MonstersRaw extends React.Component {
    constructor (props) {
        super(props);
        this.tableMap = [
            {
                field: 'area',
                fieldName: '区域'
            },
            {
                field: 'name',
                fieldName: '名称'
            },
            {
                field: 'level',
                fieldName: '等级'
            },
            {
                field: 'position',
                fieldName: '地点'
            },
            {
                field: 'outwardImg',
                fieldName: '样子',
                isImg: true
            },
            {
                field: 'mapImg',
                fieldName: '地图位置',
                isImg: true
            }
        ];
    }
    componentDidMount () {
        this.props.fetchMonsters();
    }
    render () {
        return (
            <table>
                <thead>
                    <tr>
                        {this.tableMap.map(item => (
                            <th role={item.field} key={item.field}>
                                {item.fieldName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.monsters.map(monster => (
                        <tr key={monster.name}>
                            {this.tableMap.map(item => (
                                <td key={item.field}>
                                    {item.isImg ? (
                                        <Img src={'./public/imgs/' + monster[item.field]} />
                                    ) : (
                                        <span>{monster[item.field]}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

MonstersRaw.propTypes = {
    monsters: PropTypes.arrayOf(Object).isRequired,
    fetchMonsters: PropTypes.func.isRequired
};

export default connect(
    state => ({
        monsters: state.monsters
    }),
    {
        fetchMonsters
    }
)(MonstersRaw);
