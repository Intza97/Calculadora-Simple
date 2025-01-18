const valueDisplay = document.getElementById("value");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
let operator = null;
let previousValue = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.innerText;

    if (text === "AC") {
      // Resetea todo
      currentValue = "";
      operator = null;
      previousValue = "";
    } else if (text === "DEL") {
      // Elimina el último carácter
      currentValue = currentValue.slice(0, -1);
    } else if (text === "=") {
      // Realiza la operación
      if (operator && previousValue && currentValue) {
        try {
          if (operator === "%") {
            currentValue = (parseFloat(previousValue) * parseFloat(currentValue)) / 100;
          } else {
            currentValue = eval(`${previousValue} ${operator} ${currentValue}`);
          }
          currentValue = parseFloat(currentValue.toFixed(10)); // Redondea para evitar errores de precisión
          operator = null;
          previousValue = "";
        } catch {
          currentValue = "Error";
        }
      }
    } else if (["+", "-", "*", "/", "%"].includes(text)) {
      // Manejo de operadores
      if (currentValue) {
        if (operator && previousValue) {
          // Si hay un cálculo pendiente, realiza la operación
          if (operator === "%") {
            previousValue = (parseFloat(previousValue) * parseFloat(currentValue)) / 100;
          } else {
            previousValue = eval(`${previousValue} ${operator} ${currentValue}`);
          }
          currentValue = "";
        } else {
          previousValue = currentValue;
          currentValue = "";
        }
        operator = text;
      }
    } else {
      // Agrega dígitos o puntos decimales
      if (text === "." && currentValue.includes(".")) return; // Evita múltiples puntos
      currentValue += text;
    }

    // Actualiza la pantalla
    valueDisplay.innerText = currentValue || "0";
  });
});
