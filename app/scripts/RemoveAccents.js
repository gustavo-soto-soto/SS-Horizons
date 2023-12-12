const ACCENTS = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};

export const removeAccents = (string) =>{
    return string.split('').map( letter => ACCENTS[letter] || letter).join('').toString();	
}