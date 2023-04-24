import React, { useState } from 'react';
import * as $ from 'jquery'
import DisplayTable from './DisplayTable'

function CollapsibleTable(props) {

    const [expandedIndex, setExpandedIndex] = useState("-1");

    const displayInnerTable = e => {
        const iconElem = $(e.target).find("i");
        $(".collapsibleTable tr>td>i").not(iconElem).removeClass("active");
        iconElem.toggleClass("active");

        const rowElem = $(e.target).find("i").hasClass("active") && $(e.target).parents("tr");

        setExpandedIndex(rowElem.length ? $(rowElem[0]).attr("index") : "-1")
    }

    return (
        <table className="collapsibleTable">
            <thead>
                <tr>
                    {props.displayField.map((data, index) =>
                        <th key={index}>{data}</th>
                    )}
                </tr>
            </thead>

            <tbody>

                {props.data.map((data, index) =>
                    <React.Fragment>
                        <tr key={index} index={index}>
                            {props.displayField.map((field, key) =>
                                key === 0 ? <td key={key} onClick={displayInnerTable}><i className="fas fa-chevron-right"></i> {data[field]}</td> : <td key={key}>{data[field]}</td>
                            )}
                        </tr>

                        {index == expandedIndex &&
                            <tr>
                                <td colSpan={String(props.displayField.length)}>
                                    <DisplayTable
                                        displayField={data.table.tableField}
                                        data={data.table.tableData}
                                    />
                                </td>
                            </tr>
                        }
                    </React.Fragment>
                )}



            </tbody>

        </table>

    )

}

export default React.memo(CollapsibleTable)