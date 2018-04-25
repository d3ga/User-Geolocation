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
    let contentString = `<div>
                          <h6>Your estimated position</h6>
                          <table class="table">
                            <tbody>
                              <tr>
                                <th scope="row">City</th>
                                <td>${data.city}</td>   
                              </tr>
                              <tr>
                                <th scope="row">Region</th>
                                <td>${data.region}</td>   
                              </tr>
                              <tr>
                                <th scope="row">Country</th>
                                <td>${data.country}</td>   
                              </tr>
                              <tr>
                                <th scope="row">Postal Code</th>
                                <td>${data.postal}</td>   
                              </tr>
                              <tr>
                                <th scope="row">IP</th>
                                <td>${data.ip}</td>   
                              </tr>
                              <tr>
                                <th scope="row">Provider</th>
                                <td>${data.org}</td>   
                              </tr>
                              <tr>
                                <th scope="row">Geolocation</th>
                                <td>${data.loc}</td>   
                              </tr>
                            </tbody>
                          </table>
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
