document.getElementById("searchButton").addEventListener("click", function()
{
    fetch("http://localhost:3000/data")
        .then(response =>
        {
            if(!response.ok) throw new Error("Błąd:" + response.status);
            return response.json();
        })
        .then(data =>
        {
            const stations = data.results[5];
            console.log(stations);

            const tablebody = document.getElementById("rows");

            data.results.forEach(station =>
            {
                const tr = document.createElement("tr");

                tr.innerHTML =
                `
                    <td>${station.date}</td>
                    <td>${station.datatype}</td>
                    <td>${station.station}</td>
                    <td>${station.attributes}</td>
                `;
                tablebody.appendChild(tr);
            }
            )
        })
        .catch(error =>
        {
            console.error(error);
        }
        )
})