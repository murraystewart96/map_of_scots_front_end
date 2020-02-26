class FilterHelper {

  filterByGender(gender, scots){

    let fileteredScots = [];

    if(gender ==="male"){
      for(let i = 0; i < scots.length; i++){
        if(scots[i].gender === gender) fileteredScots.push(scots[i]);
      }
    }else if(gender === "female"){
      for(let i = 0; i < scots.length; i++){
        if(scots[i].gender === gender) fileteredScots.push(scots[i]);
      }
    }

    return fileteredScots;
  }
  

  filterByDOA(doa, scots){
    let fileteredScots = [];

    if(doa ==="dead"){
      for(let i = 0; i < scots.length; i++){
        if(scots[i].dateOfDeath !== "") fileteredScots.push(scots[i]);
      }
    }else if(doa === "alive"){
      for(let i = 0; i < scots.length; i++){
        if(scots[i].dateOfDeath === "") fileteredScots.push(scots[i]);
      }
    }

    return fileteredScots;
  }

}

export default FilterHelper;
