/*Nav Bar*/
const ActivePage = window.location.pathname;
console.log(ActivePage);

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href.includes(`${ActivePage}`)) {
            MyLinks.classList.add('Active');
        }
    }
)
/*Nav Bar*/


/*If the user chooses to use his current location, the possibility to enter values for country and city will be disable*/
function enableCreateUser() {
    if (document.getElementById("checkbox-id").checked) {
      document.getElementById("country").disabled = true;
      document.getElementById("city").disabled = true;
      document.getElementById("radius-input").disabled = false;
    }
    if (!document.getElementById("checkbox-id").checked) {
        document.getElementById("country").disabled = false;
        document.getElementById("city").disabled = false;
        document.getElementById("radius-input").disabled = true;
        document.getElementById("radius-input").value = "";
    }
}
/*If the user chooses to use his current location, the possibility to enter values for country and city will be disable*/


/*strong password*/
function check()
{
    var input = document.getElementById("password").value;

    input=input.trim();
    document.getElementById("password").value=input;
    document.getElementById("count").innerText="Length : " + input.length;
    if(input.length>=8)
    {
        document.getElementById("check0").style.color="green";
    }
    else
    {
       document.getElementById("check0").style.color="red"; 
    }

    if(input.length<=10)
    {
        document.getElementById("check1").style.color="green";
    }
    else
    {
       document.getElementById("check1").style.color="red"; 
    }

    if(input.match(/[0-9]/i))
    {
        document.getElementById("check2").style.color="green";
    }
    else
    {
       document.getElementById("check2").style.color="red"; 
    }

    if(input.match(/[^A-Za-z0-9-' ']/i))
    {
        document.getElementById("check3").style.color="green";
    }
    else
    {
       document.getElementById("check3").style.color="red"; 
    }

    if(input.match(' '))
    {
        document.getElementById("check4").style.color="red";
    }
    else
    {
       document.getElementById("check4").style.color="green"; 
    }

}

function see()
{
    var input = document.getElementById("password");
    var see = document.getElementById("see");

    if(is_visible)
    {
        input.type = 'password';
        is_visible = false; 
        see.style.color='gray';
    }
    else
    {
        input.type = 'text';
        is_visible = true; 
        see.style.color='#262626';
    }
}
/*strong password*/


/*check if : password = check password ?*/
function compare_password_and_check_password(){
    var password=document.getElementById('password').value;
    var check_Password=document.getElementById('check-Password').value;
    if(password!==check_Password){
       alert('"Password" and "Check password" fields must be the same');
    }
  }
/*check if : password = check password ?*/


/*Geo-Location*/ 
function GetLocation() {
    checkBox = document.getElementById('checkbox-id');
    if(checkBox.checked) {
        console.log(navigator.geolocation);
        if (navigator.geolocation) {
            console.log("in get location");
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            document.getElementById("latitude").value = "Geo location is not supported";
        }
    }
};

function showPosition(position) {
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longtitide').value = position.coords. longitude;
    /*var x = document.getElementById('current-location');
    var y = document.getElementById("checkbox-id");
    x.value = "Latitude: " + position.coords.latitude 
    + " longtitide: " + position.coords. longitude;*/
}
/*Geo-Location*/


/*city select chenge according to the country*/
function dynamic_city(){
    var country = document.getElementById("country").value;
    if (country == 'Israel'){
        var city_list = document.getElementById("city");
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);

        var opt0 = document.createElement('option');
        opt0.innerHTML = '-- Select City --';
        opt0.value = "";
        city_list.appendChild(opt0);

        var opt1 = document.createElement('option');
        opt1.innerHTML = 'Tel Aviv';
        city_list.appendChild(opt1);

        var opt2 = document.createElement('option');
        opt2.innerHTML = 'Eilat';
        city_list.appendChild(opt2);

        var opt3 = document.createElement('option');
        opt3.innerHTML = 'Haifa';
        city_list.appendChild(opt3);
    }
    if (country == 'Argentina'){
        var city_list = document.getElementById("city");
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);

        var opt0 = document.createElement('option');
        opt0.innerHTML = '-- Select City --';
        opt0.value = "";
        city_list.appendChild(opt0);

        var opt1 = document.createElement('option');
        opt1.innerHTML = 'Buenos Aires';
        city_list.appendChild(opt1);

        var opt2 = document.createElement('option');
        opt2.innerHTML = 'Bariloche';
        city_list.appendChild(opt2);

        var opt3 = document.createElement('option');
        opt3.innerHTML = 'Córdoba';
        city_list.appendChild(opt3);
    }
    if (country == 'Florida'){
        var city_list = document.getElementById("city");
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);
        city_list.remove(city_list.selectedIndex);

        var opt0 = document.createElement('option');
        opt0.innerHTML = '-- Select City --';
        opt0.value = "";
        city_list.appendChild(opt0);

        var opt1 = document.createElement('option');
        opt1.innerHTML = 'Miami';
        city_list.appendChild(opt1);

        var opt2 = document.createElement('option');
        opt2.innerHTML = 'Key West';
        city_list.appendChild(opt2);

        var opt3 = document.createElement('option');
        opt3.innerHTML = 'Orlando';
        city_list.appendChild(opt3);
    }
}
/*city select chenge according to the country*/