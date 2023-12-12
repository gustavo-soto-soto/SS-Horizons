export const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
  
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Note: Months in JavaScript start from 0!
    const year = dateObject.getFullYear();
  
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  
    return formattedDate;
}