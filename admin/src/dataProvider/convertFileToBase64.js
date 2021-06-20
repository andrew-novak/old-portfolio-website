const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });

export default convertFileToBase64;
