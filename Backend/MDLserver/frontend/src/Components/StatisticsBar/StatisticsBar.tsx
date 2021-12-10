import React, { ReactElement, useEffect } from 'react'
import './StatisticsBar.css'

interface Props {
    name: string;
    type: string;
    content_arr: any[];
}

function StatisticsBar(props: Props): ReactElement {
    const barTotalPx = 500
    let statistics: any = {
        //STATE: [CUANTITY, BARLENGTH]
        "Watching": [0, 10],
        "On hold": [0, 10],
        "Planning to view": [0, 10],
        "Finished": [0, 10],
        "Droped": [0, 10],
    }

    function calculateBars() {
        let bar_array = props.content_arr.filter(e => { if (e[1] == props.type) return e })
        bar_array.forEach(item => {
            statistics[item[0]][0] = statistics[item[0]][0] + 1
        })
        for (const key in statistics) {
            let item = statistics[key]
            item[1] = (item[0] * barTotalPx) / bar_array.length
        }
    }

    //Calculate bars on load since it will be static, can be modified into states if statistics need to be dynamic
    calculateBars()

    const finished_style = {
        backgroundColor: 'blue',
        width: statistics["Finished"][1],
    };

    const watching_style = {
        backgroundColor: 'green',
        width: statistics["Watching"][1],
    };

    const onhold_style = {
        backgroundColor: 'yellow',
        width: statistics["On hold"][1],
    };

    const dropped_style = {
        backgroundColor: 'red',
        width: statistics["Droped"][1],
    };

    const ptw_style = {
        backgroundColor: 'grey',
        width: statistics["Planning to view"][1],
    };

    return (
        <div className='film-statistics-bar'>
            <h1> {props.name} </h1>
            <span className="bar" style={finished_style}></span>
            <span className="bar" style={watching_style}></span>
            <span className="bar" style={onhold_style}></span>
            <span className="bar" style={dropped_style}></span>
            <span className="bar" style={ptw_style}></span>
            <table>
                <tr>
                    <td><span className="dot" style={{ backgroundColor: "blue" }} /> Finished: {statistics["Finished"][0]}</td>
                    <td><span className="dot" style={{ backgroundColor: "green" }} /> Watching: {statistics["Watching"][0]}</td>
                </tr>
                <tr>
                    <td><span className="dot" style={{ backgroundColor: "yellow" }} /> On Hold: {statistics["On hold"][0]}</td>
                    <td><span className="dot" style={{ backgroundColor: "red" }} /> Dropped: {statistics["Droped"][0]} </td>
                    <td><span className="dot" style={{ backgroundColor: "grey" }} /> Plan To Watch: {statistics["Planning to view"][0]}</td>
                </tr>
            </table>
        </div>
    )
}


export default StatisticsBar