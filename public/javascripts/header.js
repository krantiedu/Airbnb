function menu(){
    var menu = document.querySelector(".ri-menu-line");
    var flag = 0;
    menu.addEventListener("click",function(){
      
      var popup = document.querySelector(".popup-login");
      if(flag === 0){
        popup.style.display = "block";
        flag = 1;
      }
      else{
        popup.style.display = "none";
        flag = 0;
      }
     
      
    })
   }
  menu();

  function search(){
    
    var search = document.querySelector(".ri-search-line");
    var btn = document.querySelector("#login-btn");
    search.addEventListener("click",function(){
      var popup = document.querySelector(".search");
      popup.style.display = "flex";
     })
     btn.addEventListener("click",function(){
      var popup = document.querySelector(".search");
      popup.style.display = "none";
     })

  }

  search();

  function login(){
    var login = document.querySelector("#popup-login");
    var icon = document.querySelector(".ri-close-line");
    login.addEventListener("click",function(){
      
      var popup = document.querySelector(".login-page");
      popup.style.display = "block";
      document.querySelector(".popup-login").style.display = "none";
      
     })
     icon.addEventListener("click",function(){
      
      var popup = document.querySelector(".login-page");
      popup.style.display = "none";
      
     })
  }
  login();

  function signup(){
    var signup = document.querySelector("#popup-signup");
    var icon = document.querySelector("#close-icon");
    signup.addEventListener("click",function(){
      
      var popup = document.querySelector(".signup-page");
      popup.style.display = "block";
      document.querySelector(".popup-login").style.display = "none";
      
     })
     icon.addEventListener("click",function(){
      
      var popup = document.querySelector(".signup-page");
      popup.style.display = "none";
      
     })
  }
  signup();