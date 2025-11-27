const zipInput = document.getElementById("capitalInput");
const startInput = document.getElementById("startDateInput");
const endInput = document.getElementById("endDateInput");

document.getElementById("searchButton").addEventListener("click", function()
{
    const zip = zipInput.value.trim();
    const startDate = startInput.value;
    const endDate = endInput.value;

    if(!zip || !startDate || !endDate)
    {
        alert("Wszystkie dane musza być podane.")
        return;
    }

    fetch(`http://localhost:3000/data?datasetid=GHCND&locationid=ZIP:${zip}&startdate=${startDate}&enddate=${endDate}`)
        .then(response =>
        {
            if(!response.ok) throw new Error("Błąd:" + response.status);
            return response.json();
        })
        .then(data =>
        {
            if(data.results === 0 || !data.results)
            {
                alert("Brak wyników dla podanych filtrów.");
                return;
            }

            console.log(data.results);

            data.results.forEach(thing =>
            {
                const tr = document.createElement("tr");

                tr.innerHTML =
                `
                    <td>${thing.date}</td>
                    <td>${thing.datatype}</td>
                    <td>${thing.station}</td>
                    <td>${thing.value}</td>
                `;
                document.getElementById("rows").appendChild(tr);
            }
            )
        })
        .catch(error =>
        {
            console.error(error);
        }
        )
})