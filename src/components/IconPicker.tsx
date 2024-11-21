import { icons } from "feather-icons";
import { useState, useEffect } from "react";

export default function IconPicker({
//@ts-ignore
  rowsInOnePage ,  columnsInOnePage , iconHeight,iconWidth ,onClose,onSelect,
  pickerHeight = 500,
  pickerWidth = 500,
}) {
  const iconKeys = Object.keys(icons);

 
  const [currentPage, setCurrentPage] = useState(1);
  const [adjustedRows, setAdjustedRows] = useState(rowsInOnePage);
  const [adjustedColumns, setAdjustedColumns] = useState(columnsInOnePage);

  useEffect(() => {
   
    const maxRows = Math.floor(pickerHeight / iconHeight);
    const maxColumns = Math.floor(pickerWidth / iconWidth);

    setAdjustedRows(Math.min(rowsInOnePage, maxRows));
    setAdjustedColumns(Math.min(columnsInOnePage, maxColumns));
  }, [rowsInOnePage, columnsInOnePage, pickerHeight, pickerWidth, iconHeight, iconWidth]);

  const itemsPerPage = adjustedRows * adjustedColumns;


  const totalPages = Math.ceil(iconKeys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIcons = iconKeys.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col"
      style={{
        width: Math.max(columnsInOnePage * iconWidth * 1.2 + 150, 500) ,
        height:Math.max(rowsInOnePage * iconHeight*1.2 +150,500),
        margin: "auto",
        padding: "16px",
      }}
    >
      <div
        className="flex-1 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${adjustedColumns}, ${iconWidth}px)`,
          gridTemplateRows: `repeat(${adjustedRows}, ${iconHeight}px)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentIcons.map((key) => (
          <div
            key={key}
            className="flex h-full w-full items-center justify-center cursor-pointer border rounded"
            //@ts-ignore
            dangerouslySetInnerHTML={{ __html: icons[key].toSvg() }}
            onClick={() => {
              onSelect(key);
              onClose();
            }}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
