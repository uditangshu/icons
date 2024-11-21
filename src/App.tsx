import { useState } from "react";
import { icons } from "feather-icons";
import IconPicker from "./components/IconPicker";

export default function Component() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

 
  const [rowsInOnePage, setRowsInOnePage] = useState(1);
  const [columnsInOnePage, setColumnsInOnePage] = useState(1);
  const [iconHeight, setIconHeight] = useState(50);
  const [iconWidth, setIconWidth] = useState(50);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormOpen(false);
    setPickerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
     
      <div
        className="w-24 h-24 bg-blue-400 border rounded-lg flex items-center justify-center cursor-pointer"
        onClick={() => setFormOpen(true)}
      >
        {selectedIcon ? (
          <div
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: icons[selectedIcon]?.toSvg(),
            }}
          />
        ) : (
          "Pick Icon"
        )}
      </div>

      
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
