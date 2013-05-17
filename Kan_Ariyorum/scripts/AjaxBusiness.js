var urls= ["http://kanariyorum.azurewebsites.net/api/Donors"]

$.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };


function registerDonorSubmit (){
    var url = urls[0];
    jQuery.support.cors = true;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify($('#registerDonor').serializeObject()),
        success: function (incoming) {
            if(incoming.id!=null)
            {
                window.localStorage.setItem("DonorId",incoming.id);
                app.navigate(
                    'myinfo.html#secondview',
                    'slide:right'
                );
            }
        }
    });

    return false; 
    
    
}

function getDonorSettings(id)
{
    var url = urls[0] + "/" + id;
     $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function (data) {
            var nameSurname = data.Name + " " + data.Surname;
            var sex,rh;
            
            switch(data.Sex)
            {
                case true:
                    sex="Kadın";
                    break;
                case false:
                    sex="Erkek";
                    break;
            }
            switch(data.RHFactor)
            {
                case true:
                    rh="RH+";
                    break;
                case false:
                    rh="RH-";
                    break;
            }
            
            var birthYear = data.BirthYear;
            
            var bloodType = data.BloodType + " " + rh; 
            
            
            $('#lblNameSurname').text(nameSurname);
            $('#lblDogumYili').text(birthYear);
            $('#lblCinsiyet').text(sex);
            $('#lblKan').text(bloodType);
        }
    });
}