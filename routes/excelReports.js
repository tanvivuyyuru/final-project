const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx')
const Excel = require('exceljs')

router.post("/downloadExcel", async (req, res) => {
    const excelData = req.body
    const fileName = "upload" + Date.now() + "-WrongData.xlsx";
    try {
        const worksheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: 1 });
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Wrong Data");

        XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

        XLSX.writeFile(workbook, "./client/public/uploads/excel/" + fileName)

        res.send(fileName);
    } catch (error) {
        res.send(null);
    }

});

router.post("/downloadLeads", async (req, res) => {
    const excelData = req.body
    const fileName = "upload" + Date.now() + "-LeadData.xlsx";
    try {
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet('Leads')
        worksheet.columns = [
            { header: '', key: 'VisitDate' },
            { header: '', key: 'Activity' },
            { header: '', key: 'Lead' },
            { header: '', key: 'ClientPhone' },
            { header: '', key: 'Project' },
            { header: '', key: 'ProjectName' },
            { header: '', key: 'Property' },
            { header: '', key: 'PropertyName' },
            { header: '', key: 'VisitStatus' },
            { header: '', key: 'Description' },
        ]
        worksheet.columns.forEach(column => {
            column.width = column.header.length < 18 ? 18 : column.header.length
        })
        worksheet.getRow(1).font = { bold: true }

        excelData.forEach(data => {
            worksheet.addRow(data)
        })

        worksheet.getRow(6).font = { bold: true }
        worksheet.getRow(6).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFFF7D7D"
            },
            bgColor: {
                argb: "FF000000"
            }
        }

        worksheet.getCell("B2").font = { bold: "true" }
        worksheet.getCell("B3").font = { bold: "true" }
        worksheet.getCell("C3").font = { bold: "true" }


        worksheet.getColumn(5).eachCell(function (cell, rowNumber) {
            if (cell.value === "Project") {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFF7D7D" },
                    bgColor: { argb: "FF000000" }
                }
            }
            cell.font = { bold: true }

        });

        worksheet.getColumn(7).eachCell(function (cell, rowNumber) {

            if (cell.value === "Property") {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFF7D7D" },
                    bgColor: { argb: "FF000000" }
                }
            }
            cell.font = { bold: true }

        });

        const filePath = path.resolve("./client/public/uploads/excel/" + fileName)
        workbook.xlsx.writeFile(filePath).then(function () {
            res.send(fileName);
        });

    } catch (error) {
        res.send(null);
    }

});

router.post("/downloadActivities", async (req, res) => {
    const excelData = req.body
    const fileName = "upload" + Date.now() + "-ActivityData.xlsx";
    try {
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet('Activity')
        worksheet.columns = [
            { header: '', key: 'Date', width: 16 },
            { header: '', key: 'Activity', width: 18 },
            { header: '', key: 'Description', width: 100 },
            { header: '', key: 'User', width: 20 },

        ]


        let data;
        for (let i = 0; i < excelData.length; i++) {
            data = excelData[i];
            worksheet.addRow(data)
        }

        worksheet.getRow(6).font = { bold: true }
        worksheet.getRow(6).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFFF7D7D"
            },
            bgColor: {
                argb: "FF000000"
            }
        }

        worksheet.getCell("B2").font = { bold: "true" }
        worksheet.getCell("B3").font = { bold: "true" }
        worksheet.getCell("C3").font = { bold: "true" }

        filePath = path.resolve("./client/public/uploads/excel/" + fileName)
        workbook.xlsx.writeFile(filePath).then(function () {
            res.send(fileName);
        });

    } catch (error) {
        console.log(error)
        res.send(null);
    }

});

router.get('/excel/:filename', (req, res) => {
    const filePath = path.join(__dirname, `../client/public/uploads/excel/${req.params.filename}`);
    res.sendFile(filePath);
});

router.delete('/deleteAllExcels', (req, res) => {
    const filePath = path.join(__dirname, `../client/public/uploads/excel`);

    fs.readdir(filePath, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(filePath, file), err => {
                if (err) throw err;
            });
        }
    });

})


module.exports = router