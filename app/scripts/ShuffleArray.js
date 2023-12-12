export const shuffleArray = (array) => {
    // Utiliza el algoritmo de Fisher-Yates para mezclar el array de forma aleatoria
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}