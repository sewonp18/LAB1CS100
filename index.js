const API_KEY = "962db3e0-b77e-11e8-bf0e-e9322ccde4db";

// query API 
document.addEventListener("DOMContentLoaded", () => {
  const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
  showGalleries(url);
});

function showGalleries(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.records.forEach(gallery => {
      
      // Alert if empty gallery 
      let selector = ` <li> `;
      if (gallery.objectcount == 0) {
        selector += ` <a href="#${gallery.id}" onclick="Alert()"> `
      }

      else {
        selector += ` <a href="#${gallery.id}" onclick="showObjectsTable(${gallery.id})"> `
      }
      
      selector += ` Gallery #${gallery.id}: ${gallery.name} (Floor ${gallery.floor}) </a> </li> `;
      document.querySelector("#galleries").innerHTML += selector; 

    });
    if (data.info.next) {
      showGalleries(data.info.next);
    }
  })
}

function showObjectsTable(id) {
  // Fetch gallery ID information 
  const url = `https://api.harvardartmuseums.org/object?gallery=${id}&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    // display data
    data.records.forEach(object => {
      let item = 
      `
      <li> 
        <a href="#${object.objectnumber}" onclick="showObjectView(${object.objectnumber})"> Title: ${object.title} </a> <br>
        <img src=${object.primaryimageurl} style="width: 300px; height: 300px"> <br>
        <p> Link: ${object.url} </p>
      `
      object.people.forEach(person => { 
        item += ` People Involved: ${person.name} <br> `  
      });
      item += 
      `</li>`

      document.querySelector("#objects").innerHTML += item;
    })
  })

  document.querySelector("#all-objects").style.display = "block";
  document.querySelector("#all-galleries").style.display = "none";
}

function showObjectView(id) {
  // Fetch gallery ID information 
  const url = `https://api.harvardartmuseums.org/object?objectnumber=${id}&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // display data
    let item = data.records[0];
    document.querySelector("#objectdetails").innerHTML += `
      <div id="back2"> <li> 
        <p> Title: ${item.title} </p> 
        <p> Description: ${item.description} </p>
        <p> Provenance: ${item.provenance} </p> 
        <p> Accession year: ${item.accessionyear} </p>
        <img src=${item.primaryimageurl} style="width: 500px; height: 500px">
      </li> </div> 
      `;
  
  document.querySelector("#all-objectdetails").style.display = "block";
  document.querySelector("#all-objects").style.display = "none";
})
}

function backButton1() {
  window.location.replace("/index.html");
}

function backButton2() {
  document.querySelector("#back2").remove();
  document.querySelector("#all-objects").style.display = "block";
  document.querySelector("#all-objectdetails").style.display = "none";
}

function Alert() {
  alert("Nothing here!");
}

function goHome() {
  window.location.replace("/index.html");
}
