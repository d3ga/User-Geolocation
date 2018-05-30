class ipData {
  constructor() {
    this.getData();
  }

  getData() {
    $.getJSON("https://ipinfo.io", data => {
      //console.log(data)
      this.initMap(data);
    });
  }

  initMap(data) {
    // console.log(data.loc.split(',')[1])
    let position = {
      lat: Number(data.loc.split(",")[0]),
      lng: Number(data.loc.split(",")[1])
    };

    let map = new google.maps.Map(document.getElementById("map"), {
      center: position,
      zoom: 15,
      minZoom: 1
    });

    let marker = new google.maps.Marker({
      position: position,
      map: map
    });

    // data.postal = 500;

    const fields = [
      { name: "City", key: "city" },
      { name: "Region", key: "region" },
      { name: "Country", key: "country" },
      { name: "Zipcode", key: "postal" },
      { name: "IP Address", key: "ip" },
      { name: "Provider", key: "org" },
      { name: "Geolocation", key: "loc" }
    ];

    let contentString = `
      <div>
        <h6 class="text-center">Estimated position based on IP</h6>
        <table class="table">
          <tbody>
          ${fields
            .map(field => {
              if (!data[field.key]) {
                return "";
              }

              return `
              <tr>
                <th scope="row">${field.name}</th>
                <td>${data[field.key]}</td>   
              </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>
      <div class="text-right">
        <span class="text-right">
          <a class="code-link" href="https://github.com/d3ga/user-geolocation-info" target="_blank" rel="noopener">&lt;/code&gt;</a>
        </span>
      </div>
    </div>`;

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    infowindow.open(map, marker);
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  }
}

let run = new ipData();
