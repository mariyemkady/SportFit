const themeBtn =
document.getElementById("themeBtn");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "light"){
  document.body.classList.add("light");
}

themeBtn.addEventListener("click",()=>{

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){

    localStorage.setItem(
      "theme",
      "light"
    );

  }else{

    localStorage.setItem(
      "theme",
      "dark"
    );

  }

});