import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";


function InformeColeccion(props) {
    const col = [
        { title: "Nombre", field: "nombre" },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo", type: "numeric", filtering: true },
        { title: "Precio", field: "precio", type: "numeric", filtering: false, }
    ];

    console.log("Datos:", props.datos);
    return (
        <>

            <MaterialTable
                columns={col}
                data={props.datos}
                title="Fuert Sacrificio de Tabla"
                renderSummaryRow={({ column, data }) =>
          column.field === "precio"
            ? {
                value: data.reduce((total, row) => total + row.precio, 0),
                style: { background: "yellow" }, // Estilo de la fila de resumen
              }
            : undefined
        }
                options={{
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, "PDF"),
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, "CSV"),
                        },
                    ],
                    headerStyle: {
                        backgroundColor: "#282c34", 
                        color: "white", 
                      },
                      draggable: false,
                      columnsButton: true,
                }}
            />
        </>
    );
}
export default InformeColeccion;
