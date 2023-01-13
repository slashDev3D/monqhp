


const film = document.querySelector('#filmWrap')
const media = document.querySelector('#mediaWrap')

function addFilm(time,id,title,name){
    console.log("addFilm")
    var thisLI = document.createElement('li')
    var thisP1 = document.createElement('p')
    var thisP2 = document.createElement('p')
    var thisP3 = document.createElement('p')
    var thisDIV = document.createElement('div')
    thisLI.classList.add('figure-list')
    film.append(thisLI)
    thisLI.append(thisP1)
    thisLI.append(thisDIV)
    thisLI.append(thisP2)
    thisLI.append(thisP3)

    thisP1.classList.add('figure-playTime')
    thisP1.innerHTML = time
    thisDIV.classList.add('img')
    thisDIV.setAttribute('data-video-id',id)
    thisP2.innerHTML = title
    thisP2.classList.add('project-title')
    thisP3.classList.add('project-name')
    thisP3.innerHTML = name
}
function addMedia(time,id,name){
    var thisLI = document.createElement('li')
    var thisP1 = document.createElement('p')
    var thisP2 = document.createElement('p')
    var thisP3 = document.createElement('p')
    var thisDIV = document.createElement('div')
    thisLI.classList.add('figure-list')
    media.append(thisLI)
    thisLI.append(thisP1)
    thisLI.append(thisDIV)
    thisLI.append(thisP2)

    thisP1.classList.add('figure-playTime')
    thisP1.innerHTML = time
    thisDIV.classList.add('img')
    thisDIV.setAttribute('data-video-id',id)
    thisP2.classList.add('project-name')
    thisP2.innerHTML = name
}

const getSheetData = async () => {
    const sheetId = '1H75owSrphevvaRn2WSgDFnMPloZC0_jSIoUHqaQmAn0';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'film';
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`
  
    const response = await fetch(url);
    data = await response.text();
    parsed = JSON.parse(data.substring(47).slice(0, -2))

    let items = parsed.table.rows
      .map(({ c }) => cleanRow(c))
    //   .map(([name, branch, typeMid, typeSmall, address, building, lon, lat]) => ({ name, branch, typeMid, typeSmall, address, building, lon, lat }))
  
    items.forEach(
      (item) => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = item.name
        body.textContent = item.typeSmall
        userCardContainer.append(card)
      }
    )
  
    return items
  };
  
  
  function cleanRow(row) {
    // row = [null,{v:'123'},null,{v:'hello'}]
    function replaceNull(item) {
      if (item == null) {return { v: '' }}
      return item
    }
    let this_company = row[0].v ? row[0].v : null;
    let this_title = row[1].v ? row[1].v : null;
    let this_time = row[2].f ? row[2].f : null;
    let this_video = row[6].f ? row[6].f : null;
    let this_type = row[8].v ? row[8].v : null;
    if(this_type === "film"){
        addFilm(this_time, this_video, this_company, this_title)
    } else if (this_type === "media"){
        addMedia(this_time, this_video, this_title)
    }
    data = row
      .map((item) => replaceNull(item))
      .map((item) => item.v)
    return data
  }
  
  users = getSheetData()

  console.log("done")