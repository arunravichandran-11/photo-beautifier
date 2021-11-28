const savePrintInformation = async (canvasProperties) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(canvasProperties),
    };

    const response = await fetch(
      "http://localhost:5000/print-information",
      options
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const importUploadFiles = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "http://localhost:5000/imported-prints",
    options
  );

  const { data } = await response.json();

  return data;
};

export { savePrintInformation, importUploadFiles };
