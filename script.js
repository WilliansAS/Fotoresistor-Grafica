$(document).ready(function () {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
        type: "line", // Tipo de gráfica
        data: {
            labels: [], // Las etiquetas de tiempo
            datasets: [
                {
                    label: "Datos Foteresistor",
                    backgroundColor: "rgb(51, 141, 255)",
                    borderColor: "rgb(93, 164, 255)",
                    data: [], // Los datos del sensor
                },
            ],
        },
        options: {},
    });

    // Función para actualizar la gráfica y LEDs
    function fetchData() {
        $.ajax({
            url: "conexion.php", // Ajusta la URL según tu configuración
            type: "GET",
            success: function (data) {
                var parsedData = JSON.parse(data);
                var labels = [];
                var sensorData = [];

                parsedData.forEach(function (row) {
                    labels.push(row.fecha);
                    sensorData.push(row.valor);
                });

                chart.data.labels = labels;
                chart.data.datasets[0].data = sensorData;
                chart.update();

                // Cambiar el LED basado en la intensidad recibida
                var led1 = document.getElementById("led1");
                var led2 = document.getElementById("led2");
                var led3 = document.getElementById("led3");

                // Recuperar la intensidad del último registro
                var intenval = parsedData[0].intensidad;

                // Cambiar el estado de los LEDs según la intensidad recibida
                if (intenval === "Baja") {
                    led1.src = "IMG/ROJO-ON.png";
                    led2.src = "IMG/AMARILLO-OFF.png";
                    led3.src = "IMG/VERDE-OFF.png";
                } else if (intenval === "Media") {
                    led1.src = "IMG/ROJO-OFF.png";
                    led2.src = "IMG/AMARILLO-ON.png";
                    led3.src = "IMG/VERDE-OFF.png";
                } else if (intenval === "Alta") {
                    led1.src = "IMG/ROJO-OFF.png";
                    led2.src = "IMG/AMARILLO-OFF.png";
                    led3.src = "IMG/VERDE-ON.png";
                }
            },
        });
    }

    // Actualizar la gráfica y LEDs cada cierto tiempo, por ejemplo, cada 5 segundos
    setInterval(function () {
        fetchData(); // Actualizar la gráfica y LEDs
    }, 1000);
});
