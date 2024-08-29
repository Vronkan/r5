function AIChatHistory() {
  // ... existing code ...

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {history.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="text-xs text-gray-500">
            {item.date && item.date !== "null" ? item.date.trim() : ""}
          </div>
          <div className="text-sm">{item.text}</div>
        </div>
      ))}
    </div>
  );
}