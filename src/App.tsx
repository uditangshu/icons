import { useState } from "react";
import { icons } from "feather-icons";

function IconPicker({
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

export default function Component() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // States for form fields
  const [rowsInOnePage, setRowsInOnePage] = useState(3);
  const [columnsInOnePage, setColumnsInOnePage] = useState(4);
  const [iconHeight, setIconHeight] = useState(50);
  const [iconWidth, setIconWidth] = useState(50);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormOpen(false);
    setPickerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Trigger for opening the configuration form */}
      <div
        className="w-24 h-24 bg-gray-200 border rounded-lg flex items-center justify-center cursor-pointer"
        onClick={() => setFormOpen(true)}
      >
        {selectedIcon ? (
          <div
            dangerouslySetInnerHTML={{
              __html: icons[selectedIcon]?.toSvg(),
            }}
          />
        ) : (
          "Pick Icon"
        )}
      </div>

      {/* Configuration Form */}
      {isFormOpen && (
        <form
          onSubmit={handleFormSubmit}
          className="absolute bg-white shadow-lg p-6 rounded-lg z-50"
          style={{ width: 300 }}
        >
          <h3 className="text-xl font-bold mb-4">Configure Icon Picker</h3>
          <label className="block mb-2 text-sm font-medium">Rows in One Page:</label>
          <input
            type="number"
            value={rowsInOnePage}
            onChange={(e) => setRowsInOnePage(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-full mb-4"
          />
          <label className="block mb-2 text-sm font-medium">Columns in One Page:</label>
          <input
            type="number"
            value={columnsInOnePage}
            onChange={(e) => setColumnsInOnePage(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-full mb-4"
          />
          <label className="block mb-2 text-sm font-medium">Icon Height (px):</label>
          <input
            type="number"
            value={iconHeight}
            onChange={(e) => setIconHeight(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-full mb-4"
          />
          <label className="block mb-2 text-sm font-medium">Icon Width (px):</label>
          <input
            type="number"
            value={iconWidth}
            onChange={(e) => setIconWidth(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-full mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Open Picker
            </button>
          </div>
        </form>
      )}

      {/* Icon Picker */}
      {isPickerOpen && (
        <IconPicker
          rowsInOnePage={rowsInOnePage}
          columnsInOnePage={columnsInOnePage}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
          onClose={() => setPickerOpen(false)}
          onSelect={(key: any) => setSelectedIcon(key)}
        />
      )}
    </div>
  );
}
