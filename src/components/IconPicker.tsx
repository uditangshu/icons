import {icons} from "feather-icons";
import {useState} from "react";


export default function IconPicker({
    rowsInOnePage = 1,
    columnsInOnePage = 1,
    iconHeight = 50 ,
    iconWidth= 50,
    pickerHeight = 500,
    pickerWidth = 500,
    // @ts-ignore
    onClose,onSelect,
    
  }) {
    const itemsPerPage = rowsInOnePage * columnsInOnePage;
    const iconKeys = Object.keys(icons);
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(iconKeys.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentIcons = iconKeys.slice(startIndex, startIndex + itemsPerPage);
  
    const dynamicHeight = Math.max(pickerHeight, rowsInOnePage * iconHeight );
    const dynamicWidth = Math.max(pickerWidth,iconWidth * columnsInOnePage);
  
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
          width: dynamicWidth,
          height: dynamicHeight,
          margin: "auto",
          padding: "16px",
        }}
      >
        <div
          className="flex-1 grid gap-4 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
            gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight}px)`,
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