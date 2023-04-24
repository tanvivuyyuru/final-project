import React, { Component } from 'react'
import DisplayTable from '../../components/DisplayTable'

class FeeInvoices extends Component {

    state = {
        invoices: [
            {
                InvoiceNo: "INV/2023/12345",
                InvoiceDate: "2022-09-17",
                DueDate: "2022-09-28",
                Term: "Fall 2022",
                Semester: "1st Semester",
                ReceiptFor: "Semester Fee",
                Barcode: "123123",
                TotalAmount: "131220",
                Status: "Paid",
                Download: "s"
            },
            {
                InvoiceNo: "INV/2023/98292",
                InvoiceDate: "2023-03-25",
                DueDate: "2023-04-02",
                Term: "Spring 2023",
                Semester: "2nd Semester",
                ReceiptFor: "Semester Fee",
                Barcode: "123123",
                TotalAmount: "131220",
                Status: "Paid",
                Download: "s"
            }
        ]
    }

    constructor(props) {
        super(props);
        if (props.state.currentPage !== "Fee Invoices") {
            props.state.setCurrentPage("Fee Invoices")
        }
    }

    render() {
        return (
            <div className="content">
                
                <h2>Invoices</h2>
                
                <section className="box">
                    
                    <h2>Invoices List</h2>

                    <DisplayTable 
                        displayField = {["InvoiceNo", "InvoiceDate", "DueDate", "Term", "ReceiptFor", "Barcode", "TotalAmount", "Status", "Download"]}
                        data = {this.state.invoices}
                    />
                    

                </section>

            </div>
        )
    }

}

export default FeeInvoices;