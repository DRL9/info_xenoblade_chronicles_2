import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { fetchMonsters } from '../store/actions';
import Paper from './Paper';
import { showPicture } from './Picture';
import Button from './Button';

const Table = styled.table`
    width: ${props => props.width || '100%'};
    margin: auto;
    border-spacing: 0;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    &:nth-of-type(2n) {
        background-color: rgb(245, 245, 245);
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const TableHead = styled.thead`
    color: rgba(0, 0, 0, 0.54);
    text-align: ${props => props.textAlign || 'left'};
    & > ${TableRow} {
        font-weight: 600;
    }
    & > ${TableRow}:hover {
        background-color: transparent;
    }
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
    padding: 0.5em 1em;
    ${props =>
        props.width &&
        css`
            width: ${props.width};
        `};

    ${props =>
        props.minWidth &&
        css`
            width: ${props.minWidth};
        `};
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
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.tableMap.map(item => (
                                <TableCell
                                    as="th"
                                    role={item.field}
                                    key={item.field}
                                    minWidth={'3em'}
                                >
                                    {item.fieldName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.monsters.map(monster => (
                            <TableRow key={monster.name}>
                                {this.tableMap.map(item => (
                                    <TableCell key={item.field}>
                                        {item.isImg ? (
                                            <Button
                                                btnSize="small"
                                                btnType="plain"
                                                onClick={showPicture.bind(
                                                    this,
                                                    `//res.cloudinary.com/dv0fvsitl/image/upload/v1562162826/Xenoblade_Chronicles_2/${
                                                        monster[item.field]
                                                    }`
                                                )}
                                            >
                                                查看大图
                                            </Button>
                                        ) : (
                                            <span>{monster[item.field]}</span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
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
