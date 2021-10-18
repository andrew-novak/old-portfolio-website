const convertFileToBase64 = (rawFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(rawFile);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });

export default convertFileToBase64;
