import React, { ReactElement, useEffect } from 'react'
import './StatisticsBar.css'

interface Props {
    name: string;
    type: string;
    content_arr: any[];
}

function StatisticsBar(props: Props): ReactElement {
    const barTotalPx = 550
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

    function calculateBarRadius(arr: string[]): number {
        let ret = 10
        arr.forEach(str => {
            if (statistics[str][0] != 0) ret = 0
        })
        return ret
    }

    function handleHover(e: any, bool: boolean) {
        let id = e.currentTarget.id
        let element = document.getElementById("text" + id)
        bool
            ? element?.classList.add("text-active")
            : element?.classList.remove("text-active")
    }


    //Calculate bars on load since it will be static, can be modified into states if statistics need to be dynamic
    calculateBars()
    // Vars used to calculate the bar radius, 0 if another bar exists, 10 if its the only bar, or is the first/last one
    let bar_radius_left;
    let bar_radius_right = calculateBarRadius(["Watching", "On hold", "Droped", "Planning to view"]);
    const finished_style = {
        backgroundColor: "#DCDCDC",
        width: statistics["Finished"][1],
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: bar_radius_right,
        borderBottomRightRadius: bar_radius_right
    };

    bar_radius_left = calculateBarRadius(["Finished"])
    bar_radius_right = calculateBarRadius(["On hold", "Droped", "Planning to view"])
    const watching_style = {
        backgroundColor: '#978172',
        width: statistics["Watching"][1],
        borderTopLeftRadius: bar_radius_left,
        borderBottomLeftRadius: bar_radius_left,
        borderTopRightRadius: bar_radius_right,
        borderBottomRightRadius: bar_radius_right
    };

    bar_radius_left = calculateBarRadius(["Finished", "Watching"])
    bar_radius_right = calculateBarRadius(["Droped", "Planning to view"])
    const onhold_style = {
        backgroundColor: '#E9C2A7',
        width: statistics["On hold"][1],
        borderTopLeftRadius: bar_radius_left,
        borderBottomLeftRadius: bar_radius_left,
        borderTopRightRadius: bar_radius_right,
        borderBottomRightRadius: bar_radius_right
    };

    bar_radius_left = calculateBarRadius(["Finished", "Watching", "On hold"])
    bar_radius_right = calculateBarRadius(["Planning to view"])
    const dropped_style = {
        backgroundColor: '#D8844A',
        width: statistics["Droped"][1],
        borderTopLeftRadius: bar_radius_left,
        borderBottomLeftRadius: bar_radius_left,
        borderTopRightRadius: bar_radius_right,
        borderBottomRightRadius: bar_radius_right
    };

    bar_radius_left = calculateBarRadius(["Finished", "Watching", "On hold", "Droped"])
    const ptw_style = {
        backgroundColor: "#D86313",
        width: statistics["Planning to view"][1],
        borderTopLeftRadius: bar_radius_left,
        borderBottomLeftRadius: bar_radius_left,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    };

    return props.content_arr == [] ? <></> : (
        <div className='statistics-bar'>
            <div className="bar-holder">
                <span className="bar" id="1" style={finished_style} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)} />
                <span className="bar" id="2" style={watching_style} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)} />
                <span className="bar" id="3" style={onhold_style} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)} />
                <span className="bar" id="4" style={dropped_style} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)} />
                <span className="bar" id="5" style={ptw_style} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)} />
            </div>
            <div className="text-holder">
                <div className="text" id="text1">Finished: {statistics["Finished"][0]}</div>
                <div className="text" id="text2">Watching: {statistics["Watching"][0]}</div>
                <div className="text" id="text3">On Hold: {statistics["On hold"][0]}</div>
                <div className="text" id="text4">Dropped: {statistics["Droped"][0]}</div>
                <div className="text" id="text5">Plan To Watch: {statistics["Planning to view"][0]}</div>
            </div>
        </div>
    )
}


export default StatisticsBar