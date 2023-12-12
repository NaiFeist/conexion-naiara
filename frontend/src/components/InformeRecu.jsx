import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";


function InformeRecu(props) {
    const col = [
        { title: "Id", field: "id",filtering:false },
        { title: "Artículo", field: "articulo", filtering:true },
        { title: "Persona", field: "persona", filtering:false },
        { title: "Fecha", field: "fecha", filtering:false } // CAMBIAR AQUI A LO QUE PONGA EN LA BD

    ];

    console.log("Datos:", props.datos);
    return (
        <>

            <MaterialTable
                columns={col}
                data={props.datos}
                title="Informe de Préstamos"
                renderSummaryRow={({ column, data }) =>
          column.field === ""
            ? {
                value: data.reduce((total, row) => total + row.precio, 0),
                style: { background: "yellow" }, // Estilo de la fila de resumen
              }
            : undefined
        }
                options={{
                    filtering: true,
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
export default InformeRecu;
